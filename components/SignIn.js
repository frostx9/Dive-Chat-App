import { firebase, auth } from "../Firebase";
import userSave from "../utils/userSave";

const SignIn = () => {
  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await auth.signInWithPopup(provider);
    userSave();
  };

  return (
    <div>
      <button className="sign-in" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
    </div>
  );
};

export default SignIn;
