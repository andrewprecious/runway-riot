import Sidebar from "../../components/sidebar/Sidebar";
import "./user.css";
import Navbar from "../../components/navbar/Navbar";

const User = () => {
  return (
    <div className="User">
      <Sidebar />
      <div className="right">
        <Navbar />
        main page content for users
      </div>
    </div>
  );
};

export default User;
