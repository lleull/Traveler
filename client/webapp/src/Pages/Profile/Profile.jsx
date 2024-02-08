import styles from "./Profile.module.css";
import cover from "./../../assets/post/8.jpeg";
import { useUser } from "../../Context/UserContext";
import { PersonAddSharp } from "@mui/icons-material";
import my from "./../../Dummyy/Img/10.jpeg";
import { useEffect, useState } from "react";

import { backURL } from "../../App";
import axios from "axios";
import img from "./../../Component/download.png";
import { Camera, EditOutlined } from "@mui/icons-material";
import Loader from "../../Component/ui/Loader";
import { Feed } from "../../Component/Feed/Feed";
import Editprofile from "./Editpro/Editprofile";
import Friend from "../../Component/Homepage/Friends/Friend";
const Profile = () => {
  const { Userdata } = useUser();

  const [isloading, setisloading] = useState(false);
  const [Edituser, setEdituser] = useState(false);

  const [User, setUser] = useState([]);
  console.log(User);

  useEffect(() => {
    const getdata = async () => {
      setisloading(true);
      const res = await axios.get(`${backURL}/register`);

      if (res.data) {
        setUser(res.data);
        setisloading(false);
      } else {
        console.log("Error while getting Data");
      }
    };
    getdata();
  }, []);

  const unFollowUser = async (userid) => {
    const res = await axios.post(`${backURL}/register/follow/${userid}`, {
      username: Userdata.map((user) => user.username).toString(),
      userid: sessionStorage.getItem("userdata"),
    });
    res();
  };

  return (
    <div className={styles.profile}>
      {isloading ? <Loader /> : ""}
      {Edituser ? <Editprofile editer={() => setEdituser(!Edituser)} /> : ""}
      <div className={styles.profileRight}>
        {Userdata?.map((user) => (
          <div className={styles.profileRightTop}>
            <div className={styles.profileCover}>
              <img src={cover} alt="as" className={styles.profileCoverImg} />
              <div className={styles.proimg}>
                <label htmlFor="file-upload">
                  <img
                    src={user.profile?.data ? user.profile?.data : img}
                    alt="as"
                    className={styles.profileUserImg}
                  />
                </label>
              </div>
            </div>
            <div className={styles.profileInfo}>
              <h4 className={styles.profileInfoName}>
                {user.username}{" "}
                <EditOutlined
                  onClick={() => setEdituser(true)}
                  className={styles.edit}
                />
              </h4>
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
              </div>
              <h4 className={styles.profileInfoDesc}> BIO : {user.bio}</h4>

              <h4 className={styles.profileInfoDes}>WORK: {user.work}</h4>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.aboutme}>
        <div className={styles.feed}>
          <Feed />
        </div>
        <div className={styles.aboutdatas}>
          <div className={styles.follow}>
            <Friend />

          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
