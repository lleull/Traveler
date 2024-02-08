import { Schema, model } from "mongoose";

export interface Userdoc extends Document {
  username: string;
  hashedpassword: string;
  password: string;
  _id: string;
}

const Registermodel = new Schema({
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
  work:{
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
const RegisterSchema = model<Userdoc>("Register", Registermodel);
export default RegisterSchema;
