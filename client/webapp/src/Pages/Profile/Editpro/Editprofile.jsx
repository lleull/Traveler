import React from "react";
import { useUser } from "../../../Context/UserContext";
import { useState } from "react";
import { backURL } from "../../../App";
import ConvertBase from "../../Baseconverte";

import axios from "axios";
import styles from "./Edit.module.css";
const Editprofile = () => {
  const [postimage, setpostimage] = useState({ myfile: "" });
  const [imgtype, setimagetype] = useState({ mytype: "" });
  const [username, setusername] = useState("");
  const [phone, setphone] = useState("");
  const [country, setcountry] = useState("");
  const [email, setemail] = useState("");
  const [work, setwork] = useState("");
  const [bio, setbio] = useState("");
  const { Userdata } = useUser();

  const handlefileupload = async (e) => {
    e.preventDefault();
    const files = e.target.files[0];
    const Base64 = await ConvertBase(files);
    const Mimetypre = await files.type;

    setpostimage({ myfile: Base64 });
    setimagetype({ mytype: Mimetypre });

    console.log(Base64);
  };
  const Handleprofile = async ({ editer }) => {
    const id = sessionStorage.getItem("userdata").toString();

    const res = await axios.post(`${backURL}/login/${id}`, {
      image: postimage.myfile,
      type: imgtype.mytype,

      username: username,
      email: email,
      work: work,
      bio: bio,
      phone: phone,
      country: country,
    });
    if (res.data) {
      console.log("Uploaded");
      setimagetype({ mytype: "" });
      setpostimage({ myfile: "" });
      editer();
    } else {
      console.log("No User FOUND");
    }
  };

  return (
    <div className={styles.editer}>
      {Userdata?.map((user) => (
        <div className={styles.editbox}>
          <label htmlFor="file-upload">
            <img
              src={postimage.myfile ? postimage.myfile : user?.profile?.data}
              alt="as"
              className={styles.profileUserImg}
            />
          </label>

          <form
            onSubmit={(e) => e.preventDefault()}
            method="POST"
            action="/upload"
            encType="multipart/form-data"
          >
            <input
              type="file"
              name="myFile"
              label="Image"
              id="file-upload"
              accept=".jpg, .jpeg, .png"
              style={{ display: "none" }}
              onChange={(e) => handlefileupload(e)}
            />
          </form>

          <div className={styles.formdata}>
            <label className={styles.labels}>Username</label>
            <input
              onChange={(e) => {
                e.target.value.trim() === ""
                  ? setusername(user.username)
                  : setusername(e.target.value);
                console.log(e.target.value);
              }}
              type="text"
              placeholder={user.username}
              className={styles.userinput}
            />
            <label className={styles.labels}>Email</label>
            <input
              onChange={(e) => {
                e.target.value.trim() === ""
                  ? setemail(user.email)
                  : setemail(e.target.value);
                console.log(e.target.value);
              }}
              type="email"
              placeholder={user.email}
              className={styles.userinput}
            />
            <label className={styles.labels}>Country</label>
            <input
              onChange={(e) => {
                e.target.value.trim() === ""
                  ? setcountry(user.country)
                  : setcountry(e.target.value);
                console.log(e.target.value);
              }}
              type="text"
              placeholder={user.country}
              className={styles.userinput}
            />
            <label className={styles.labels}>Phone</label>
            <input
              onChange={(e) => {
                e.target.value.trim() === ""
                  ? setphone(user.phone)
                  : setphone(e.target.value);
                console.log(e.target.value);
              }}
              type="text"
              placeholder={user.phone}
              className={styles.userinput}
            />
            <label className={styles.labels}>Work</label>
            <input
              onChange={(e) => {
                e.target.value.trim() === ""
                  ? setwork(user.work)
                  : setwork(e.target.value);
                console.log(e.target.value);
              }}
              type="text"
              placeholder={user.work}
              className={styles.userinput}
            />
            <label className={styles.labels}>bio</label>
            <input
              onChange={(e) => {
                e.target.value.trim() === ""
                  ? setbio(user.bio)
                  : setbio(e.target.value);
                console.log(e.target.value);
              }}
              type="text"
              placeholder={user.bio}
              className={styles.userinput}
            />
          </div>
          <button onClick={Handleprofile} className={styles.update}>
            Update Profile
          </button>
        </div>
      ))}
    </div>
  );
};

export default Editprofile;
