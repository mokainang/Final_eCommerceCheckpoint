import express from "express";
import cors from "cors";
import { createNewOrder } from "./controllers/ordersController/createOrder.js";

//import { dotenv } from "dotenv"; // to allow you access the .env file
import dotenv from "dotenv";
import { CONNECT_DATABASE } from "./config/database.js";

dotenv.config(); // this is to execute the dotenv
const app = express();
const PORT = process.env.PORT || 3001;
// the following is an application level middleware that allows application to communicate with our backend
// it must come before any request
app.use(cors());

app.use(express.json()); // This middleware allows us to access records coming from the frontend
app.get("/", async (req, res) => {
  res.status(200).json({ message: "Hello World" });
});

app.post("/api/v1/order/create", createNewOrder);

app.listen(PORT, async () => {
  await CONNECT_DATABASE();
  console.log("Server listening on port:", +PORT);
});
