import mongoose from "mongoose";
const connetDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Databases is connected");
  } catch (error) {
    console.log(error);
  }
};
export default connetDB;
