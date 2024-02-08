import express from "express";
import { Request, Response } from "express";
const bcrypt = require("bcrypt");
import RegisterSchema from "../../Models/RegisterSchema";
const router = express.Router();
import { Userdoc } from "../../Models/RegisterSchema";
import bodyParser = require("body-parser");

router.use(bodyParser());
interface Userdata {
  username: String;
  password: String;
}

router.post("/", async (req: Request, res: Response) => {
  try {
    const userDatas = req.body;
    console.log(userDatas);
    const password = userDatas.password;
    const salt = bcrypt.genSaltSync(10);
    const hashedpassowrd = await bcrypt.hash(password, salt);

    const UserFound = new RegisterSchema({
      email: userDatas.email,
      country: userDatas.country,
      password: hashedpassowrd,
      phone: userDatas.phone,
      username: userDatas.username,
    });

    const Adduser = await UserFound.save();

    if (Adduser) {
      res.status(200).json(Adduser);
    } else {
      res.status(404).json({ Error: "Registration has falled" });
    }
  } catch (error) {
    res.status(505).json({
      error: "Error while creating the Register App",
    });
    console.log(error);
  }
});

router.get("/", async <Userdoc>(req: Request, res: Response) => {
  const data = await RegisterSchema.find();

  try {
    res.status(200).json(data);
  } catch (error) {
    res.status(404);
  }
});

router.post("/follow/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  const Username = req.body.username;
  const userid = req.body.userid;

  try {
    const findbyuser = await RegisterSchema.updateOne(
      { username: Username },
      { $addToSet: { Following: id } }
    );
    const follower = await RegisterSchema.updateOne(
      { _id: id },
      {
        $addToSet: {
          Followers: userid,
        },
      }
    );
    if (findbyuser && follower) {
      res.status(200).json({
        Message: "Followe Succefully",
      });
    }
  } catch (error) {
    res.status(505).json({
      Error,
    });
    console.log(error);
  }
});

router.get("/friends/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const Theuser = await RegisterSchema.findById(id);
    if (Theuser) {
      const ids = Theuser;
    }
  } catch (error) {}
});

router.get("/single/:id", async (req: Request, res: Response) => {
  const username = req.params.id;
  console.log(username)

  try {
    const Finduser = await RegisterSchema.findOne({
      username: username
    });
    if (Finduser) {
      const user: Userdata = Finduser;
      const { password, ...otherdata } = user;
      res.status(200).send(otherdata);
    } else {
      res.status(500).json("No data has Found");
    }
  } catch (error) {}
});

export default router;
