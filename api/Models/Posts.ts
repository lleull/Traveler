import { Schema, model } from "mongoose";

const Postmodel = new Schema({
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
const PostSchema = model("Postmodel", Postmodel);
export default PostSchema;
