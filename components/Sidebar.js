import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { useList } from "react-firebase-hooks/database";
import { firestore, auth, firebase } from "../Firebase";

const Sidebar = ({ user, handler }) => {
  const [value] = useCollection(firestore.collection("users"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  const [snapshots] = useList(firebase.database().ref("/online"));
  const [presence, setPresence] = useState({});

  // Generating list of users using this webapp with their online status
  let list = value?.docs.map((doc) => {
    doc = doc.data();
    let status =
      presence[doc.uid] === "online"
        ? "online"
        : `Last seen at ${new Date(presence[doc.uid] * 1000)}`;
    return doc.uid !== auth.currentUser.uid ? (
      <div
        key={doc.uid}
        className="list-group-item list-group-item-action py-3 lh-tight"
        onClick={() =>
          handler({
            displayName: doc.displayName,
            uid: doc.uid,
            presence: status,
          })
        }
      >
        <div>
          <div className="d-flex w-100 align-items-center justify-content-between">
            <strong className="mb-1">{doc.displayName}</strong>
          </div>
          <div className="col-10 mb-1 small">{status}</div>
        </div>
      </div>
    ) : (
      ""
    );
  });

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(
        function () {
          console.log("Signed Out");
        },
        function (error) {
          console.error("Sign Out Error", error);
        }
      );
  };

  // This useEffect finds out who are online
  useEffect(() => {
    snapshots.map((v) => {
      if (v.val().online) setPresence((p) => ({ ...p, [v.key]: "online" }));
      else setPresence((p) => ({ ...p, [v.key]: v.val().time.seconds }));
    });
  }, [snapshots, value]);

  // This useEffect tracks if an user is online or not
  useEffect(() => {
    const userId = auth.currentUser.uid;

    const reference = firebase.database().ref(`/online/${userId}`);
    reference
      .set({ online: true })
      .then(() => console.log("Online presence set"));

    reference
      .onDisconnect()
      .set({ online: false, time: firebase.firestore.Timestamp.now() })
      .then(() => console.log("On disconnect function configured."));
  }, []);

  return (
    <div>
      <div
        className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white"
        // style={{ width: "380px" }}
      >
        <div className="d-flex justify-content-between align-items-center  p-4 link-dark text-decoration-none border-bottom">
          <span className="fs-5 fw-semibold">{user.displayName}</span>
          <button onClick={signOut}>Sign out</button>
        </div>
        <div className="list-group list-group-flush border-bottom scrollarea">
          {list}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
