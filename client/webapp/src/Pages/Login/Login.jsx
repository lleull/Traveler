import styles from "./Login.module.css";
import { backURL } from "../../App";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../../Component/ui/Loader";
export default function Login() {
  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [password, setpassword] = useState("");
  const [erroruser, seterroruser] = useState(false);
  const handleLogin = async (e) => {
    setisLoading(true)
    e.preventDefault();
    const data = {
      username: username,
      password: password,
    };
    try {
    const res = await axios.post(`${backURL}/login`, data, {
      headers: {
        "Content-Type": "Application/json",
      },
    });
    if(res.data) {

      
      sessionStorage.setItem("userdata", res.data.id);
      navigate("/");
      setisLoading(false);
    }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log(error.response.status);
        seterroruser(true);
        setisLoading(false);
      } else {
        seterroruser(false);
      }
    }
  };

  return (
    <div className={styles.login}>
      {isLoading ? <Loader /> : ""}
      <div className={styles.loginWrapper}>
        <div className={styles.loginLeft}>
          <h3 className={styles.loginLogo}>Traveler</h3>
          <span className={styles.loginDesc}>
            Connect with friends and the world around you on Etsocial.
          </span>
        </div>
        <div className={styles.loginRight}>
          <form onSubmit={handleLogin} className={styles.loginBox}>
            <input
              onChange={(e) => setusername(e.target.value)}
              placeholder="username"
              className={styles.loginInput}
            />
            <input
              onChange={(e) => setpassword(e.target.value)}
              placeholder="Password"
              className={styles.loginInput}
            />
            <button type="submit" className={styles.loginButton}>
              Log In
            </button>
            {erroruser ? (
              <span className={styles.err}> No user Crendtials</span>
            ) : (
              ""
            )}
            <span className={styles.loginForgot}>Forgot Password?</span>
            <button className={styles.loginRegisterButton}>
              <a className={styles.abbr} href="/register">
                Create a New Account
              </a>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
