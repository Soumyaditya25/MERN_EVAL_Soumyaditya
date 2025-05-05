import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
	{
		Title: {
			type: String,
			required: true,
		},
		Ingredients: {
			type: String,
			required: true,
		},
		steps: {
			type: Number,
			required: true,
		},
		cookingTime: {
			type: String,
			required: true,
		}
	},
	{
		timestamps: true, 
	}
);

const Product = mongoose.model("Product", productSchema);

export default Product;
