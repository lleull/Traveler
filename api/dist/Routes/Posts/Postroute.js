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
const body_parser_1 = __importDefault(require("body-parser"));
const Posts_1 = __importDefault(require("../../Models/Posts"));
const RegisterSchema_1 = __importDefault(require("../../Models/RegisterSchema"));
const router = express_1.default.Router();
router.use(body_parser_1.default.json({ limit: "50mb" }));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const postSaved = new Posts_1.default({
            desc: data.desc,
            Image: {
                data: data.image,
                type: data.type,
            },
            Profile: {
                data: data.Profile,
                type: data.typeimg,
            },
            Username: data.Username,
            Work: data.Work,
        });
        const Addpost = yield postSaved.save();
        console.log(Addpost);
        if (Addpost) {
            res.status(200).json(Addpost);
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
    try {
        const Posts = yield Posts_1.default.find();
        if (Posts) {
            res.status(200).json(Posts);
        }
        else {
            res.status(404).json({
                Error: "Error while getting all the posts",
            });
        }
    }
    catch (error) {
        res.status(505).json({
            Error: "No connection found with Database",
        });
    }
}));
router.get("/userpost", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.body;
        const UsersPost = yield Posts_1.default.find({
            userId: id,
        });
        if (UsersPost) {
            res.status(200).json(UsersPost);
        }
        else {
            res.status(404).json({
                Message: "ERROR WHILE GETTING POSTS",
            });
        }
    }
    catch (error) { }
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const Findpost = yield Posts_1.default.findByIdAndUpdate(id);
        if (Findpost) {
            res.status(200).json({
                Message: "Post Updated",
            });
        }
    }
    catch (error) { }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const DeletePost = yield Posts_1.default.findByIdAndDelete(id);
        if (DeletePost) {
            res.status(200).json({
                Message: "Post Has been Deleted",
            });
        }
        else {
            res.status(404).json("Error in deleting the post");
        }
    }
    catch (error) {
        res.status(500).json("Error");
    }
}));
router.post("/liked", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.postid;
    const UpdateLiked = req.body.userid;
    try {
        const UpdateLike = yield RegisterSchema_1.default.updateOne({ _id: id }, {
            $set: {
                liked: {
                    UpdateLiked,
                },
            },
        });
        if (UpdateLike) {
            res.status(200).json({ liked: "true" });
        }
        else {
            res.status(500).json({
                Error: 'Error while sending data'
            });
        }
    }
    catch (error) {
        res.status(404).json({
            error
        });
    }
}));
exports.default = router;
