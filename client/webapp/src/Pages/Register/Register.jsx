import styles from "./Register.module.css";
import { useState } from "react";
import axios from "axios";
import { backURL } from "../../App";
import { useNavigate } from "react-router-dom";
export default function Register() {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [phone, setphone] = useState("");
  const [country, setcountry] = useState("");
  const [err, seterr] = useState(false);
  const navigate = useNavigate();
  const handleregister = async (e) => {
    e.preventDefault();

    if (
      username === "" ||
      email === "" ||
      password === "" ||
      country === "" ||
      phone === ""
    ) {
      seterr(true);
    } else {
      seterr(false);
    }
    const registerdata = {
      username: username,
      email: email,
      password: password,
      phone: phone,
      country: country,
    };

    const res = await axios.post(`${backURL}/register`, registerdata, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.data) {
      navigate("/login");
    } else {
      console.log("Error while registering");
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.loginWrapper}>
        <div className={styles.loginLeft}>
          <h3 className={styles.loginLogo}>Traveler</h3>
          <span className={styles.loginDesc}>
            Connect with friends and the world around you on Etsocial.
          </span>
        </div>
        <div className={styles.loginRight}>
          <form onSubmit={handleregister} className={styles.loginBox}>
            <input
              onChange={(e) => setusername(e.target.value)}
              placeholder="Username"
              className={styles.loginInput}
            />
            <input
              onChange={(e) => setemail(e.target.value)}
              placeholder="Email"
              className={styles.loginInput}
            />
            <input
              onChange={(e) => setpassword(e.target.value)}
              placeholder="Password"
              className={styles.loginInput}
            />
            <input
              type="text"
              placeholder="Ghana"
              onChange={(e) => setcountry(e.target.value)}
              className={styles.loginInput}
            />
            <input
              type="text"
              placeholder="+251(927321)"
              onChange={(e) => setphone(e.target.value)}
              className={styles.loginInput}
            />
            <button type="submit" className={styles.loginButton}>
              Sign Up
            </button>
            <button className={styles.loginRegisterButton}>
              <a className={styles.abbr} href="/login">
                Login Exisiting account
              </a>
            </button>
          </form>
          {err ? (
              <span className={styles.err}>Am Empty Input has Found</span>
            ) : (
              ""
            )}        </div>
      </div>
    </div>
  );
}
