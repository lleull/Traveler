import React from "react";
import styles from "./Feed.module.css";
import { useState, useEffect } from "react";
import { backURL } from "../../App";
import { MoreHoriz, Comment, } from "@mui/icons-material";
import Loader from "../ui/Loader";
import like from "./../Homepage/icons8-heart-50.png";
import likedimg from "./../Homepage/icons8-heart-48.png";
import axios from "axios";
import { useUser } from "../../Context/UserContext";
import { useNavigate } from "react-router-dom";
export const Feed = () => {
  const [Posts, setPosts] = useState([]);
  const { Userdata } = useUser();
  const [isLoading, setisLoading] = useState(false);
  console.log(Posts);
  useEffect(() => {
    const getpost = async () => {
      setisLoading(true);
      const res = await axios.get(`${backURL}/post`);
      if (res.data) {
        setisLoading(false);
        setPosts(res.data);
      } else {
        console.log("No data Found");
      }
    };
    getpost();
  }, []);

  const HandleSignle = (username) => {
    window.location.replace(`/single/${username}`);
  };

  const handleLike = async (postid) => {
    try {
      const res = await axios.post(`${backURL}/liked`, {
        postid: postid,
        userid: sessionStorage.getItem("userdata"),
      });
      if(res.data) {
        console.log("Liked")
      }
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <>
      {isLoading ? <Loader /> : ""}
      {Posts?.map((post) => (
        <div key={post._id} className={styles.postdata}>
          <div className={styles.profile}>
            <img
              onClick={() => HandleSignle(post.Username)}
              src={post.Profile?.data}
              className={styles.pro}
              alt="as"
            />

            <div className={styles.prodesc}>
              <div className={styles.spy}>
                <h2 className={styles.proname}>{post?.Username}</h2>
                <h2 className={styles.pronames}>{post?.Work}</h2>
              </div>
              <MoreHoriz />
            </div>
          </div>
          <p className={styles.desc}>{post.desc}</p>
          <img src={post.Image.data} alt="asd" className={styles.img} />
          <div className={styles.interact}>
            <div className={styles.liked}>
            {post?.liked?.length}
              <img
                src={like}
                alt="as"
                onClick={() => handleLike(post._id)}
                className={styles.logos}
              />
            </div>
            <div className={styles.comment}>
              <Comment className={styles.logos} style={{ color: "black" }} />
            </div>
          </div>
          <div className={styles.comment}></div>
        </div>
      ))}
    </>
  );
};
