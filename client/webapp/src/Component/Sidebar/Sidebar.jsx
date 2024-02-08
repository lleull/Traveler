import styles from "./Side.module.css";
// import img from "../Homepage/my.jpg";
// import { useState } from "react";
import cover from "./../../Dummyy/Img/1.jpeg"
import nouser from "./../download.png"

import {
  Home,
  Explore,
  Group,
  FavoriteBorderRounded,
  Settings,
} from "@mui/icons-material";
import { useUser } from "../../Context/UserContext";

const Sidebar = () => {
  const { Userdata } = useUser();

  return (
    <div className={styles.section}>
      <div className={styles.sidebar}>
        <div className={styles.sidepro}>
          <img src={cover} alt="as" className={styles.cover} />
          {Userdata?.map((user) => (
            <div key={user.username} className={styles.pro}>
              <img src={user.profile?.data? user.profile.data : nouser} alt="as" className={styles.profilepic}/>
              <h4 className={styles.username}>{user.username}</h4>
              <span className={styles.work}>{user.work}</span>

              <span className={styles.desc}>{user.bio}</span>

              <div className={styles.detail}>
                    <div className={styles.single}>
                      <h2 className={styles.value}>25</h2>
                      <h2 className={styles.type}>Post</h2>
                      </div>
                    <div className={styles.single}>
                      <h2 className={styles.value}>{user.Followers.length}</h2>
                      <h2 className={styles.type}>Followers</h2>
                      </div>
                    <div className={styles.single}>
                      <h2 className={styles.value}>{user.Following.length}</h2>
                      <h2 className={styles.type}>Following</h2>
                      </div>
            </div>;
        </div>
          ))}
          </div>
        <ul className={styles.unorder}>
          <li className={styles.list}>
            <Home style={{ color: "red" }} />
            Feed
          </li>
          <li className={styles.list}>
            <Explore style={{ color: "gray" }} />
            Explore{" "}
          </li>
          <li className={styles.list}>
            <Group style={{ color: "green" }} />
            Group
          </li>
          <li className={styles.list}>
            <FavoriteBorderRounded style={{ color: "blue" }} />
            My favourite
          </li>
          {/* <li className={styles.list}>
            <Settings style={{ color: "black" }} />
            Setting
          </li> */}
        </ul>
      <button className={styles.view}>View Profile</button>
        
      
    </div>
    </div>
  );
};

export default Sidebar;
