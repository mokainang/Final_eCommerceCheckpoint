import mongoose from "mongoose";

async function CONNECT_DATABASE() {
  try {
    await mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING);
    console.log("Database Connected Succesfully");
  } catch (error) {
    console.log(error);
  }
}

export { CONNECT_DATABASE };
