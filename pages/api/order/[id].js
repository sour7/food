import dbConnect from "../../../lib/dbConnect.js";
import Order from "../../../models/Order.js";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;
  dbConnect();

  if (method === "GET") {
    try {
      try {
        const order = await Order.findById(id);
        res.status(200).json(order);
      } catch (er) {
        res.status(500).json(er);
      }
    } catch (er) {
      res.status(500).json(er);
    }
  }

  if (method === "PUT") {
    try {
      const order = await Order.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(order);
    } catch (er) {
      res.status(500).json(er);
    }
  }

  if (method === "DELETE") {
    try {
    } catch (er) {
      res.status(500).json(er);
    }
  }
}
