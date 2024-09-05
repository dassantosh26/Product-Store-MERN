/** @format */

import express from "express";
import { connectDB } from "./config/db.js";
import productRoute from "./routes/productRoute.js"

const app = express();

app.use(express.json()); //middleware allow us to accept json data in the req.body

app.use("/api/products",productRoute)

app.listen(5000, () => {
  connectDB();
  console.log(`Server started at http://localhost:5000`);
});
