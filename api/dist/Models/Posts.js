"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Postmodel = new mongoose_1.Schema({
    Profile: {
        data: {
            type: String,
        },
        type: {
            type: String,
        },
    },
    Username: {
        type: String,
    },
    Image: {
        data: {
            type: String,
        },
        type: {
            type: String,
        },
    },
    Work: {
        type: String,
    },
    desc: {
        type: String,
    },
    comment: {
        userid: {
            type: String,
        },
        newcomment: {
            type: String,
        },
    },
    like: {
        default: 0,
        type: String,
    },
    liked: [
        {
            type: String,
        },
    ],
});
const PostSchema = (0, mongoose_1.model)("Postmodel", Postmodel);
exports.default = PostSchema;
