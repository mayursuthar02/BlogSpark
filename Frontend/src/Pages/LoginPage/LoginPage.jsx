import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from 'js-cookie'
import AuthContext from '../../ContextApi/AuthContext' 

const LoginPage = () => {
  const { setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const showSucessToast = (message) => {
    toast.success(`${message}`, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };
  const showErrorToast = (message) => {
    toast.error(`${message}`, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username == "" || password == "") {
      showErrorToast("Please enter your credentials");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.token, data.message)
        showSucessToast(data.message);
        Cookies.set("token", data.token, { secure: true });
        setIsLoggedIn(true);
        navigate(`/profile/${username}`);
      } else {
        showErrorToast(data.error);
      }

    }catch (error) {
      console.log("Error occurred during fetch request:", error);
      showErrorToast("An unexpected error occurred during login");
    }
    
  };

  return (
    <div className="login-signup-section">
      <div className="form-section">
        <div className="signup-title">
          <h3 className="title">Login to Your Account</h3>
          <p className="subtitle">Please enter your credentials</p>
        </div>

        <form className="form" onSubmit={handleSubmit}>
          <div className="input-field">
            <label htmlFor="">Username</label>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="input-field">
            <label htmlFor="">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="submitbtn">Login Now</button>
        </form>

        <p>
          Don't have an account? <Link to={"/register"}>Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
