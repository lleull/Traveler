"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Registermodel = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
    },
    profile: {
        data: {
            type: String,
        },
        imgType: {
            type: String,
        },
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        require: true,
    },
    Following: [{
            type: String,
        }],
    Followers: [{
            type: String
        }],
    country: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
    },
    work: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});
const RegisterSchema = (0, mongoose_1.model)("Register", Registermodel);
exports.default = RegisterSchema;
