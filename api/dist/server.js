"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
const cors_1 = __importDefault(require("cors"));
const path = require("path");
const body_parser_1 = __importDefault(require("body-parser"));
const d_1 = __importDefault(require("./d"));
const RegisterRoute_1 = __importDefault(require("./Routes/Register/RegisterRoute"));
const UsersRoute_1 = __importDefault(require("./Routes/Users/UsersRoute"));
const Postroute_1 = __importDefault(require("./Routes/Posts/Postroute"));
const multer = require("multer");
const PORT = 4000;
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});
//MULTER
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "../Images");
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, file, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage: storage });
app.post("/upload", upload.single("image"), (req, res) => {
    res.send("Image has been Sent");
});
//middlewarre
app.use("/register", RegisterRoute_1.default);
app.use("/login", UsersRoute_1.default);
app.use("/post", Postroute_1.default);
app.use(body_parser_1.default.json({ limit: '50mb' }));
app.options("*", (0, cors_1.default)());
//HTTPREQUESTS
app.get("/", (req, res) => {
    console.log(req.body);
    res.json({
        message: `Hello From Server ${PORT}`,
    });
});
app.listen(PORT, () => {
    console.log(` Server started Successfuly  ${PORT}`);
    (0, d_1.default)();
});
