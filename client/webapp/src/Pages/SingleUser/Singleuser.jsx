import styles from "./Singleuser.module.css";
import cover from "./../../assets/post/8.jpeg";
import { PersonAddSharp } from "@mui/icons-material";
import my from "./../../Dummyy/Img/10.jpeg";
import { useEffect, useState } from "react";

import { backURL } from "../../App";
import axios from "axios";
import img from "./../../Component/download.png";
import { Feed } from "../../Component/Feed/Feed";
import { useParams } from "react-router-dom";
const SingleUser = () => {
  const [User, setUser] = useState([]);
  const { username } = useParams();
  console.log(User)

  useEffect(() => {
    const getdata = async () => {
      const res = await axios.get(`${backURL}/register/single/${username}`);

      if (res.data) {
        const data = [res.data._doc]
        setUser(data);
      } else {
        console.log("Error while getting Data");
      }
    };
    getdata();
  }, []);

  return (
    <div className={styles.profile}>
      <div className={styles.profileRight}>
        {User?.map((user) => (
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
              <h4 className={styles.profileInfoName}>{user.username} </h4>
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

        <div className={styles.feed}>
          <Feed />
        </div>
      <div className={styles.aboutme}>
        <div className={styles.aboutdatas}>
          <div className={styles.follow}>
            <h2 className={styles.followhead}>Who to Follow</h2>
{/* 
            {User?.slice(0, 3).map((users) => (
              <div className={styles.followpro}>
                <img
                  src={users.profile ? users.profile.data : my}
                  alt="as"
                  className={styles.propic}
                />
                <div className={styles.prodetail}>
                  <h4 className={styles.followname}>{users.username}</h4>
                  <span className={styles.followwork}>{users.work}</span>
                </div>
                <PersonAddSharp
                  onClick={unFollowUser(users._id)}
                  className={styles.adder}
                />
              </div>
            ))} */}

            <button className={styles.morebtn}>Show More</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleUser;
