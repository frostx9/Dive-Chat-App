import SignIn from "../components/SignIn";
import Sidebar from "../components/Sidebar";

const Home = ({ user }) => {
  return (
    <div>
      {user ? (
        <div>
          <Sidebar user={user} />
        </div>
      ) : (
        <SignIn />
      )}
    </div>
  );
};

export default Home;
