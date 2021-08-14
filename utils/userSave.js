import { auth, firestore } from "../Firebase";

const userSave = () => {
  let displayName = auth.currentUser?.displayName;
  let uid = auth.currentUser?.uid;
  console.log("user - ", displayName);

  firestore
    .collection("users")
    .doc(uid)
    .set({
      uid,
      displayName,
    })
    .then(() => {
      console.log("Document successfully written!");
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
};

export default userSave;
