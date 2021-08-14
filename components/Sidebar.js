import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { useList } from "react-firebase-hooks/database";
import { firestore, auth, firebase } from "../Firebase";

const Sidebar = ({ user }) => {
  const [value] = useCollection(firestore.collection("users"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  const [snapshots] = useList(firebase.database().ref("/online"));

  const [online, setOnline] = useState([]);

  let list = value?.docs.map((doc) => {
    doc = doc.data();
    return doc.uid !== auth.currentUser.uid ? (
      <a
        key={doc.uid}
        href="#"
        className="list-group-item list-group-item-action py-3 lh-tight"
        aria-current="true"
      >
        <div>
          <div className="d-flex w-100 align-items-center justify-content-between">
            <strong className="mb-1">{doc.displayName}</strong>
          </div>
          <div className="col-10 mb-1 small">
            {online.includes(doc.uid) ? "online" : "offline"}
          </div>
        </div>
      </a>
    ) : (
      ""
    );
  });

  useEffect(() => {
    setOnline(snapshots.map((v) => v.key));
  }, [snapshots, value]);

  useEffect(() => {
    const userId = auth.currentUser.uid;

    const reference = firebase.database().ref(`/online/${userId}`);
    reference.set(true).then(() => console.log("Online presence set"));

    reference
      .onDisconnect()
      .remove()
      .then(() => console.log("On disconnect function configured."));
  }, []);
  return (
    <div>
      <div
        className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white"
        style={{ width: "380px" }}
      >
        <div className="d-flex align-items-center flex-shrink-0 p-3 link-dark text-decoration-none border-bottom">
          <span className="fs-5 fw-semibold">{user.displayName}</span>
        </div>
        <div className="list-group list-group-flush border-bottom scrollarea">
          {list}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
