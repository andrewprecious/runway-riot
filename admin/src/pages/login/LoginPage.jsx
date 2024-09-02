import React, { useState, useEffect } from "react";
import { useAdminAuth } from "../../context/AdminAuthContext";
import { Link, useNavigate } from "react-router-dom";
import loginStyles from "./loginPage.module.css";
import appStyles from "../../app.module.css";
const LoginPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = registerData;
    await login(email, password);
  };

  const { adminUser, loading, error, login } = useAdminAuth();
  return (
    <div className={loginStyles.bkgImg}>
      <section className={`${loginStyles.loginPage} ${loginStyles.flex}`}>
        <h1 className={loginStyles.h1}>Welcome to the website</h1>
        <p className={loginStyles.p}>
          Sign in to access your account and enjoy personalized features. If
          you’re new here, you can create an account to get started.
        </p>
        <p className={`${loginStyles.pp} ${loginStyles.none}`}>
          Ready to explore? Log in and dive in!
        </p>
        <Link to="/register" className={loginStyles.link}>
          Create Account
        </Link>
        <form className={loginStyles.formContainer} onSubmit={handleSubmit}>
          <div className={loginStyles.img}>
            <img
              src="https://rb.gy/xqximh"
              alt="moon"
              className={loginStyles.responsiveImage}
            />
          </div>
          <h1>USER LOGIN</h1>
          <div className={loginStyles.formInput}>
            <i className="fa fa-user" aria-hidden="true"></i>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={registerData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className={loginStyles.formInput}>
            <i className="fa fa-lock" aria-hidden="true"></i>
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={registerData.password}
              onChange={handleChange}
              required
            />
            <i
              onClick={togglePasswordVisibility}
              className={`fa fa-eye ${
                passwordVisible ? loginStyles.striked : ""
              } ${loginStyles.togglePassword}`}
              aria-hidden="true"
            ></i>
          </div>
          {error && <p className={loginStyles.error}>{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          <Link
            to="/request-reset"
            className={`${loginStyles.Forgotten} ${appStyles.robotoRegular}`}
          >
            Forgotten password?
          </Link>
        </form>
      </section>
    </div>
  );
};

export default LoginPage;
