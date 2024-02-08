const express = require("express");
const app = express();
import { NextFunction, Request, Response } from "express";
import cors from "cors";
const path = require("path");
import bodyParser from "body-parser";
import connectmonogo from "./d";
import Register from "./Routes/Register/RegisterRoute";
import UserRoute from "./Routes/Users/UsersRoute";
import PostRoute from "./Routes/Posts/Postroute";
const multer = require("multer");
const PORT = 4000;
app.use(function (req: Request, res: Response, next: NextFunction) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});
//MULTER
const storage = multer.diskStorage({
  destination: (req: Request, file: any, cb: any) => {
    cb(null, "../Images");
  },
  filename: (req: Request, file: any, cb: any) => {
    console.log(file);
    cb(null, file, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("image"), (req: Request, res: Response) => {
  res.send("Image has been Sent");
});
//middlewarre
app.use("/register", Register);
app.use("/login", UserRoute);
app.use("/post", PostRoute);
app.use(bodyParser.json({limit: '50mb'}));
app.options("*", cors());

//HTTPREQUESTS

app.get("/", (req: Request, res: Response) => {
  console.log(req.body)
  res.json({
    message: `Hello From Server ${PORT}`,
  });
});

app.listen(PORT, () => {
  console.log(` Server started Successfuly  ${PORT}`);
  connectmonogo();
});
