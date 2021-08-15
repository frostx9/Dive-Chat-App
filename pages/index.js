import { useEffect, useState } from "react";
import { auth } from "../Firebase";
import SignIn from "../components/SignIn";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import changeStatus from "../utils/changeStatus";

const Home = ({ user }) => {
  const [info, setInfo] = useState(null);
  const [room, setRoom] = useState(null);

  // Setting up room information to render a chat between two users
  const handler = (obj) => {
    if (obj?.uid != undefined && auth.currentUser?.uid != undefined) {
      if (obj?.uid < auth.currentUser?.uid)
        setRoom(obj?.uid + auth.currentUser?.uid);
      else setRoom(auth.currentUser?.uid + obj?.uid);
    }
    setInfo(obj);
  };

  useEffect(() => {
    changeStatus();
  });
  return (
    <div>
      {user ? (
        <div>
          <style global jsx>{`
            html,
            body,
            body > div:first-child,
            div#__next,
            div#__next > div {
              height: 100%;
            }
          `}</style>
          <div className="d-flex">
            <Sidebar user={user} handler={handler} className="p-2" />
            <Chat className="p-2 flex-grow-1" data={info} room={room} />
          </div>
        </div>
      ) : (
        <SignIn />
      )}
    </div>
  );
};

export default Home;
