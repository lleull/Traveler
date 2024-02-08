import styles from "./Topbar.module.css";
import { Notifications, HeartBroken, LoginOutlined } from "@mui/icons-material";
import { useEffect } from "react";
import { useState } from "react";
import { backURL } from "../../App";
import { useUser } from "../../Context/UserContext";
import nouser from "./../download.png";
import img from "./../download.png";
import axios from "axios";
import Loader from "../ui/Loader";
const Topbar = () => {
  const { addUser, Userdata } = useUser();
  const [isloading, setisloading] = useState(false);
  const [notify, setnotify] = useState(false);

  console.log(Userdata);

  useEffect(() => {
    const Handleprofile = async () => {
      setisloading(true);
      const id = sessionStorage.getItem("userdata").toString();
      const res = await axios.get(`${backURL}/login/${id}`);
      if (res.data) {
        const newdata = [res.data];
        await addUser(newdata);
        // sessionStorage.setItem("data", newdata);
        setisloading(false);
      } else {
        console.log("No User FOUND");
      }
    };
    Handleprofile();
  }, []);

  const logout = () => {
    sessionStorage.removeItem("userdata");
    sessionStorage.removeItem("data");
    window.location.reload();
  };

  return (
    <>
      <div className={styles.topbarContainer}>
        <div className={styles.topbarLeft}>
          <a href="/">
            <span className={styles.logodata}>Traveler</span>
          </a>
        </div>
        <div className={styles.topbarCenter}>
          <input
            placeholder="Search For friends, places or group"
            className={styles.searchinput}
            type="text"
          />
        </div>
        <div className={styles.topbarRight}>
          <div className={styles.topbarLinks}>
            <Notifications onClick={() =>  setnotify(!notify)} className={styles.linkg} />

            {notify ? (
              <div className={styles.notify}>
                <h2 className={styles.nottext}>Notification</h2>

                <div className={styles.notnew}>
                  <img src={img} alt="as" className={styles.notimg} />

                  <div className={styles.notdescs}>
                    <span className={styles.notmain}>
                      A new user has followed You, you can check it
                    </span>
                    <span className={styles.notmain}>5s ago</span>
                  </div>

                  <div className={styles.circle}></div>
                </div>
              </div>
            ) : (
              ""
            )}
            {/* <HeartBroken className={styles.linkg} /> */}
            <LoginOutlined onClick={logout} className={styles.linkg} />
          </div>
          {Userdata?.map((user) => (
            <>
              <a href="/profile">
                <div className={styles.rightbar}>
                  <img
                    src={user.profile?.data ? user.profile.data : nouser}
                    alt="sd"
                    className={styles.topbarImg}
                  />
                </div>
              </a>
            </>
          ))}
        </div>
      </div>
      {isloading ? <Loader /> : ""}
    </>
  );
};

export default Topbar;
