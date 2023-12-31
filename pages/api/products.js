import { Product } from "ecommerce-shared/models/Product";
import { mongooseConnect } from "ecommerce-shared/mongoDB/mongoose";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Only POST requests allowed" });
    return;
  }
  await mongooseConnect();
  try {
    const updatedProducts = await Product.find({});
    res.status(200).json(updatedProducts);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
