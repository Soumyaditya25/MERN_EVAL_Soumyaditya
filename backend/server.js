import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); 
app.use("/api/products", productRoutes);

const dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(dirname, "/frontend/dist")));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(dirname, "frontend", "dist", "index.html"));
	});
}

app.listen(PORT, () => {
	connectDB();
	console.log("Server started at http://localhost:" + PORT);
});
