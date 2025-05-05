import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
	{
		Title: {
			type: String,
			required: true,
		},
		Ingredients: {
			type: Number,
			required: true,
		},
		steps: {
			type: String,
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
