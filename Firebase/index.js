import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/database";
import "firebase/auth";
import "firebase/analytics";

// import { useCollectionData } from "react-firebase-hooks/firestore";

!firebase.apps.length
  ? firebase.initializeApp({
      apiKey: "AIzaSyDBbq4FbI29_vLin15mz4LSPFxYv4opngM",
      authDomain: "divechat-ce397.firebaseapp.com",
      projectId: "divechat-ce397",
      storageBucket: "divechat-ce397.appspot.com",
      messagingSenderId: "541842225098",
      appId: "1:541842225098:web:6bd95d74cb151d09160133",
      measurementId: "G-5BFJ5NTSBE",
      databaseURL:
        "https://divechat-ce397-default-rtdb.asia-southeast1.firebasedatabase.app/",
    })
  : firebase.app();

const auth = firebase.auth();
const firestore = firebase.firestore();
// const analytics = firebase.analytics();

export { firebase, auth, firestore };
