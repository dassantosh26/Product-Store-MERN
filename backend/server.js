/** @format */

import express from "express";
import { connectDB } from "./config/db.js";
import Product from "./models/productModel.js";
import mongoose from "mongoose";

const app = express();

app.use(express.json()); //middleware allow us to accept json data in the req.body

//GET

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error(`Error in creating product: ${error.message}`);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

//POST
app.post("/api/products", async (req, res) => {
  const product = req.body; // user will send this data

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const newProduct = new Product(product);
  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error(`Error in creating product:${error.message} `);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

//DELETE

app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  // console.log(id)
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product Deleted" });
  } catch (error) {
    console.error(`Error in deleting product: ${error.message}`);
    res.status(404).json({ success: false, message: "Product not found" });
  }
});

//PUT
app.put("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  // console.log(id)
  const product = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
  return res.status(404).json({success:false,message:"Invalid Product Id"})
}

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(201).json({success:true,data:updatedProduct})
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

app.listen(5000, () => {
  connectDB();
  console.log(`Server started at http://localhost:5000`);
});
