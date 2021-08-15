import { useRef, useEffect, useState } from "react";
import { useList } from "react-firebase-hooks/database";
import { auth, firestore, firebase } from "../Firebase";

const Chat = ({ data, room }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [snapshots] = useList(firebase.database().ref(`/online/${data?.uid}`));
  const [presence, setPresence] = useState();

  useEffect(() => {
    if (room) {
      firestore
        .collection("chats")
        .doc(room)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [room]);

  useEffect(() => {
    snapshots.map((v) => {
      if (v.val()?.seconds)
        setPresence((p) => `Last seen at ${new Date(v.val()?.seconds * 1000)}`);
      else setPresence((p) => "online");
    });
  }, [snapshots]);

  const sendMessage = (e) => {
    e.preventDefault();
    firestore.collection("chats").doc(room).collection("messages").add({
      message: input,
      senderId: auth.currentUser?.uid,
      send: auth.currentUser?.displayName,
      receiverId: data?.uid,
      receiver: data?.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };

  return data === null ? (
    ""
  ) : (
    <div className="col-md-8">
      <div className="container d-flex flex-column">
        {" "}
        <div className="row pt-2">
          <h3>{data?.displayName}</h3>
          <span className="text-muted">{presence}</span>
        </div>
        <br />
        <div
          className="row p-3 justify-content-around"
          style={{ overflowY: "scroll", height: "85vh" }}
        >
          {messages.map((message) => {
            let classname =
              message.senderId == auth.currentUser.uid
                ? "col-md-3 offset-md-9 border p-2"
                : "col-md-3 border p-2";
            let hour = new Date(message.timestamp?.seconds * 1000).getHours();
            let minute = new Date(
              message.timestamp?.seconds * 1000
            ).getMinutes();
            return (
              <div className="row" key={message.timestamp?.seconds}>
                <div className={classname}>
                  <div className="text-primary">{message.message}</div>
                  <span className="text-muted">
                    {hour}:{minute}
                  </span>
                </div>
              </div>
            );
          })}
          <div
            className="row p-2 "
            style={{
              position: "absolute",
              bottom: "0",
              width: "60%",
            }}
          >
            <input
              type="text "
              className="col-8"
              placeholder="Type your message here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" onClick={sendMessage} className="col">
              submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
