import styles from "./Home.module.css";
import dummydata from "../../Dummyy/Dummy";
import my from "./my.jpg";
import { useState } from "react";
import { useUser } from "./../../Context/UserContext";
import ConvertBase from "../../Pages/Baseconverte";
import { PersonAddSharp, Camera } from "@mui/icons-material";
import axios from "axios";
import { backURL } from "../../App";
import Friend from "./Friends/Friend";
import { Feed } from "../Feed/Feed";
import nouser from "./../../Component/download.png";
import Recommend from "./Recommend/Recommend";
const Homeui = () => {
  const { Userdata } = useUser();
  const [desc, setdesc] = useState("");
  const [imgdata, setimgdata] = useState({ myfile: "" });
  const [type, settype] = useState({ mytype: "" });
  const [uploaddata, setuploaddata] = useState(false);
  const handlefileupload = async (e) => {
    e.preventDefault();
    const files = e.target.files[0];
    const Base64 = await ConvertBase(files);
    const Mimetypre = await files.type;
    settype({ mytype: Mimetypre });
    console.log(Base64);
    console.log(Mimetypre);
    setimgdata({ myfile: Base64 });
  };
  const Handlepost = async () => {
    try {
      const res = await axios.post(`${backURL}/post`, {
        image: imgdata.myfile,
        type: type.mytype,
        desc: desc,
        Username: Userdata.map((user) => user.username).toString(),
        Profile: Userdata?.map((user) => user.profile.data).toString(),
        typeimg: Userdata?.map((user) => user.profile.imgType).toString(),
        Work: Userdata?.map((user) => user.work).toString(),
      });
      setuploaddata(false);
      if (res.data) {
        console.log("Uploaded");
        setimagetype({ mytype: "" });
        setpostimage({ myfile: "" });
      } else {
        console.log("No User FOUND");
      }
    } catch (error) {
      console.log("er");
    }
  };


  return (
    <>
      {/* {isLoading ? <Loader /> : ""} */}
      <div className={styles.section}>
        <div className={styles.home}>
          <div className={styles.firstside}>
            <div className={styles.maingate}>
              <div className={styles.write}>
                {Userdata?.map((user) => (
                  <img
                    key={user._id}
                    src={user.profile?.data ? user.profile.data : nouser}
                    alt="as"
                    className={styles.proimg}
                  />
                ))}
                <input
                  type="text"
                  onChange={(e) => setdesc(e.target.value)}
                  placeholder="Write Something"
                  className={styles.writeinput}
                />
              </div>
              <div className={styles.postpart}>
                <label htmlFor="file-upload">
                  <span className={styles.postphoto}>
                    <Camera />
                    Photos
                  </span>
                </label>
                <div className={styles.images}>
                  <form
                    onSubmit={(e) => e.preventDefault()}
                    method="POST"
                    action="/upload"
                    encType="multipart/form-data"
                    className={styles.formimg}
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
                </div>
                <div className={styles.wrapbtn}>
                  <button
                    onClick={() => setuploaddata(true)}
                    className={styles.postbtn}
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>

            <Feed />
          </div>

          <div className={styles.secondside}>
            <Friend />
            <Recommend />
          </div>
        </div>
        {uploaddata ? (
          <div className={styles.uploadpage}>
            <div className={styles.uploadbox}>
              <h1
                className={styles.closer}
                onClick={() => setuploaddata(false)}
              >
                Close
              </h1>
              <img src={imgdata?.myfile} alt="s" className={styles.uploadimg} />

              <p className={styles.uploaddesc}>{desc}</p>
              <button onClick={Handlepost} className={styles.upload}>
                Upload
              </button>
            </div>
          </div>
        ) : (
          " "
        )}
      </div>
    </>
  );
};

export default Homeui;
