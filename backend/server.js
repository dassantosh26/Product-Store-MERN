/** @format */

import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoute from "./routes/productRoute.js";

const app = express();

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(express.json()); //middleware allow us to accept json data in the req.body

app.use("/api/products", productRoute);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server started at http://localhost:${PORT}`);
});
