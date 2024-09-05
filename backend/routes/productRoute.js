/** @format */

import express from "express";
import mongoose from "mongoose";
import Product from "../models/productModel.js";

const router = express.Router();

//GET

router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.error(`Error in creating product: ${error.message}`);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

//POST
router.post("/", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
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
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  // console.log(id)
  const product = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product Id" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(201).json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

export default router;
