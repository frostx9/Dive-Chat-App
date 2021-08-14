import { useEffect } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { firestore, auth } from "../Firebase";

const Sidebar = ({ user }) => {
  const [value, loading, error] = useCollection(firestore.collection("users"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
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
          {value?.docs.map((doc) => {
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
                    Some placeholder content in a paragraph below the heading
                    and date.
                  </div>
                </div>
              </a>
            ) : (
              ""
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
