import Link from "next/link";
const Credit = () => {
  return (
    <div className="container pt-4">
      <p>This short project would not be possible without - </p>
      <ul>
        <li>
          <Link href="https://www.youtube.com/channel/UCsBjURrPoezykLs9EqgamOA">
            <a>Fireship</a>
          </Link>{" "}
          - Their regular youtube content on Firebase and Firestore.
        </li>
        <li>
          <Link href="https://www.youtube.com/channel/UCqrILQNl5Ed9Dz6CGMyvMTQ">
            <a>Clever Programmer</a>
          </Link>{" "}
          - Their Whatsapp clone tutorial.
        </li>
        <li>
          <Link href="https://rnfirebase.io/">
            <a>React Native Firebase</a>
          </Link>{" "}
          - Their article on Presence detection using Realtime Database.
        </li>
        <li>
          <Link href="https://ngengesenior.medium.com/">
            <a>Ngenge Senior</a>
          </Link>{" "}
          - Their article on One to One Chat app architecture.
        </li>
      </ul>
    </div>
  );
};

export default Credit;
