import dbConnect from "../../../lib/dbConnect.js";
import Product from "../../../models/Products.js";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;
  dbConnect();

  if (method === "GET") {
    try {
      const getProduct = await Product.findById(id);
      res.status(200).json(getProduct);
    } catch (er) {
      res.status(500).json(er);
    }
  }

  if (method === "PUT") {
    try {
      const product = await Product.create(req.body);
      res.status(201).json(product);
    } catch (er) {
      res.status(500).json(er);
    }
  }

  if (method === "DELETE") {
    try {
      await Product.findByIdAndDelete(id);
      res.status(200).json("deleted successfully");
    } catch (er) {
      res.status(500).json(er);
    }
  }
}
