import express from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../Controller/product.controller.js";
const router = express.Router();

// ---------- Routes ----------
router.get("/", getProducts);
//
//
//
router.post("/", createProduct);
//
//
router.put("/:id", updateProduct);
//
//
router.delete("/:id", deleteProduct);
//
//

export default router;
