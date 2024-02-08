"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcrypt = require("bcrypt");
const RegisterSchema_1 = __importDefault(require("../../Models/RegisterSchema"));
const router = express_1.default.Router();
const bodyParser = require("body-parser");
router.use(bodyParser());
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userDatas = req.body;
        console.log(userDatas);
        const password = userDatas.password;
        const salt = bcrypt.genSaltSync(10);
        const hashedpassowrd = yield bcrypt.hash(password, salt);
        const UserFound = new RegisterSchema_1.default({
            email: userDatas.email,
            country: userDatas.country,
            password: hashedpassowrd,
            phone: userDatas.phone,
            username: userDatas.username,
        });
        const Adduser = yield UserFound.save();
        if (Adduser) {
            res.status(200).json(Adduser);
        }
        else {
            res.status(404).json({ Error: "Registration has falled" });
        }
    }
    catch (error) {
        res.status(505).json({
            error: "Error while creating the Register App",
        });
        console.log(error);
    }
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield RegisterSchema_1.default.find();
    try {
        res.status(200).json(data);
    }
    catch (error) {
        res.status(404);
    }
}));
router.post("/follow/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const Username = req.body.username;
    const userid = req.body.userid;
    try {
        const findbyuser = yield RegisterSchema_1.default.updateOne({ username: Username }, { $addToSet: { Following: id } });
        const follower = yield RegisterSchema_1.default.updateOne({ _id: id }, {
            $addToSet: {
                Followers: userid,
            },
        });
        if (findbyuser && follower) {
            res.status(200).json({
                Message: "Followe Succefully",
            });
        }
    }
    catch (error) {
        res.status(505).json({
            Error,
        });
        console.log(error);
    }
}));
router.get("/friends/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const Theuser = yield RegisterSchema_1.default.findById(id);
        if (Theuser) {
            const ids = Theuser;
        }
    }
    catch (error) { }
}));
router.get("/single/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.params.id;
    console.log(username);
    try {
        const Finduser = yield RegisterSchema_1.default.findOne({
            username: username
        });
        if (Finduser) {
            const user = Finduser;
            const { password } = user, otherdata = __rest(user, ["password"]);
            res.status(200).send(otherdata);
        }
        else {
            res.status(500).json("No data has Found");
        }
    }
    catch (error) { }
}));
exports.default = router;
