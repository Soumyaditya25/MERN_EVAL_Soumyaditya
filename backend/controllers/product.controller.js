import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
	try {
		const products = await Product.find({});
		res.status(200).json({ success: true, data: products });
	} catch (error) {
		console.log("error in fetching Recipe:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const createProduct = async (req, res) => {
	const product = req.body; 

	if (!product.Title || !product.Ingredients || !product.steps || !product.cookingTime) {
		return res.status(400).json({ success: false, message: "Please provide all fields" });
	}

	const newProduct = new Product(product);
	try {
		await newProduct.save();
		res.status(201).json({ success: true, data: newProduct });
	} catch (error) {
		console.error("Error in Create Recipe:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const updateProduct = async (req, res) => {
	const { id } = req.params;
	const product = req.body;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid Recipe Id" });
	}

	try {
		const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
		res.status(200).json({ success: true, data: updatedProduct });
	} catch (error) {
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const deleteProduct = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid Recipe Id" });
	}

	try {
		await Product.findByIdAndDelete(id);
		res.status(200).json({ success: true, message: "Recipe deleted" });
	} catch (error) {
		console.log("error in deleting Recipe:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};
