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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const RegisterSchema_1 = __importDefault(require("../../Models/RegisterSchema"));
const router = express_1.default.Router();
const body_parser_1 = __importDefault(require("body-parser"));
router.use(body_parser_1.default.json({ limit: "50mb" }));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    console.log(username, password);
    try {
        const UserFound = yield RegisterSchema_1.default.find({
            username: username,
        });
        const hashedpassword = UserFound.map((user) => user.password).toString();
        console.log(hashedpassword);
        const id = UserFound.map((user) => user._id).toString();
        const hash = yield bcrypt_1.default.compare(password, hashedpassword);
        console.log(hash);
        if (hash) {
            res.status(200).json({ id: id });
        }
        else {
            res.status(404).json({
                Error: "No user founds",
            });
        }
    }
    catch (error) {
        res.status(504).json({
            Message: "No User has found",
        });
    }
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const userdata = yield RegisterSchema_1.default.findById(id);
        if (userdata) {
            res.status(200).send(userdata);
        }
        else {
            res.status(505).json({
                Messge: "No user has found",
            });
        }
    }
    catch (error) {
        res.status(404).json({
            Message: "ERROR",
        });
    }
}));
router.post("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = req.body;
    const Userdata = yield RegisterSchema_1.default.updateOne({ _id: id }, {
        $set: {
            profile: {
                data: data.image,
                imgType: data.type,
            },
            username: data.username,
            phone: data.phone,
            country: data.country,
            email: data.email,
            work: data.work,
            bio: data.bio,
        },
    });
    try {
        if (Userdata) {
            console.log(data);
            res.status(200).json({
                message: "Uploaded",
            });
        }
        else
            console.log("err");
    }
    catch (error) {
        res.status(505).json({
            error: error,
        });
    }
}));
exports.default = router;
