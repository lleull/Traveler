import styles from "./Friend.module.css";
import { PersonAddSharp, ArrowRight } from "@mui/icons-material";
import my from "./../../../Dummyy/Img/1.jpeg";
import { useEffect, useState } from "react";
import { backURL } from "../../../App";
import axios from "axios";
import Loader from "../../ui/Loader";
import { useUser } from "../../../Context/UserContext";
const Friend = () => {
  const { Userdata } = useUser();
  const [User, setUser] = useState([]);
  const [isloading, setisloading] = useState(false);

  const [slices, setslices] = useState(3);

  const showmorefriend = () => {
    setmore(!more);
    if (more) {
      setslices(User.length - 1);
    } else {
      setslices(3);
    }
  };
  console.log(User);

  useEffect(() => {
    const getdata = async () => {
      setisloading(true);
      try {
        
        const res = await axios.get(`${backURL}/register`);
  
        if (res.data) {
          setUser(res.data);
          setisloading(false);
        } else {
          console.log("Error while getting Data");
        }
      } catch (error) {
        console.log(error)
      }
    };
    getdata();
  }, []);

  const FollowUser = async (userid) => {
    const res = await axios.post(`${backURL}/register/follow/${userid}`, {
      username: Userdata.map((user) => user.username).toString(),
      userid: sessionStorage.getItem("userdata"),
    });
    res();
  };
  return (
    <div className={styles.follow}>
      {isloading ? <Loader /> : ""}
      <h2 className={styles.followhead}>Who to Follow</h2>

      {User?.slice(0, 4).map((users) => (
        <div className={styles.followpro}>
          <div className={styles.sing}>
          <img
            src={users.profile ? users.profile.data : my}
            alt="as"
            className={styles.propic}
            />
          <div className={styles.prodetail}>
            <h4 className={styles.followname}>{users.username}</h4>
            <span className={styles.followwork}>{users.work}</span>
          </div>
            </div>
          <PersonAddSharp
            onClick={FollowUser(users._id)}
            className={styles.adder}
          />
        </div>
      ))}
      
    </div>
  );
};

export default Friend;
