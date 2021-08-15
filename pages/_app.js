import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import { auth, firestore } from "../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function MyApp({ Component, pageProps }) {
  const [user] = useAuthState(auth);

  return <Component user={user} {...pageProps} />;
}

export default MyApp;
