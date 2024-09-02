import { useEffect, useState } from "react";
import appStyles from "../../App.module.css";
import registerStyles from "./register.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { URL } from "../../App";
// import Navbar from "../../components/navbar/Navbar";
// import Footer from "../../components/footer/Footer";

const Register = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [cpasswordVisible, setCpasswordVisible] = useState(false);

  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
    cPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, email, password, cPassword } = registerData;

    if (!username || !email || !password || !cPassword) {
      setError("All fields are required.");
      return;
    }

    if (password !== cPassword) {
      setError("The confirmation password must match the original password.");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(`${URL}/account/register`, {
        username,
        email,
        password,
      });
      setSuccess("You're Now Registered");
      setError("");
      // navigate("/login");
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message); // Display backend error message
      } else {
        setError(
          "Oops! Something Went Wrong with Your Registration. Please Retry"
        );
      }
      setSuccess(""); // Clear success message if there's an error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "Runway Riot | Register Page";

    // cleanup function to remove className when page unmounts
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleCpasswordVisibility = () => {
    setCpasswordVisible(!cpasswordVisible);
  };
  return (
    <div className={`${registerStyles.bkgImg}`}>
      <section className={`${registerStyles.registerPage}`}>
        <h1>Get In Touch</h1>
        <form
          className={`${registerStyles.formContainer}`}
          onSubmit={handleSubmit}
        >
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Enter Your Fullname"
            name="username"
            value={registerData.username}
            onChange={handleChange}
          />
          <label htmlFor="email">Email</label>
          <input
            type="text"
            placeholder="Enter Your Email"
            name="email"
            value={registerData.email}
            onChange={handleChange}
          />
          <div className={`${registerStyles.passwordWrapper}`}>
            <label htmlFor="password">Password</label>
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Enter Your password"
              name="password"
              value={registerData.password}
              onChange={handleChange}
            />
            <i
              onClick={togglePasswordVisibility}
              className={`${"fa fa-eye"} ${registerStyles.eye} ${
                passwordVisible ? registerStyles.striked : ""
              } ${registerStyles.togglePassword}`}
              aria-hidden="true"
            ></i>
            {/* confirm password */}

            <div className={`${registerStyles.passwordWrapper}`}>
              <label htmlFor="cpassword">Repeat Password</label>
              <input
                type={cpasswordVisible ? "text" : "password"}
                placeholder="Enter Your password"
                name="cPassword"
                value={registerData.cPassword}
                onChange={handleChange}
              />
            </div>
            <i
              onClick={toggleCpasswordVisibility}
              className={`${"fa fa-eye"} ${registerStyles.eye} ${
                cpasswordVisible ? registerStyles.striked : ""
              } ${registerStyles.togglePassword}`}
              aria-hidden="true"
            ></i>
          </div>
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}

          {/* btn */}
          <div className={`${registerStyles.btnDiv}`}>
            <button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Register"}
            </button>
            {/* <Link to="/">go back home</Link> */}
            <Link to="/login">Login</Link>
          </div>
        </form>
      </section>

      {/* <Footer /> */}
    </div>
  );
};

export default Register;
