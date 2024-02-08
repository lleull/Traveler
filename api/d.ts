import mongoose from "mongoose";

const DATABASE_URL =
  "mongodb+srv://leul:wizkhalifa@cluster0.d2qyviz.mongodb.net/?retryWrites=true&w=majority";

const connectmonogo = async () => {
  await mongoose
    .connect(DATABASE_URL, {})
    .then(() => console.log("Successful"))
    .catch((error: any) => console.log(error));
};
export default connectmonogo;