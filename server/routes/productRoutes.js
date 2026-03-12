import express from "express";
import multer from "multer";
import {
  createProduct,
  getProducts,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("image"), createProduct);
router.get("/", getProducts);
router.delete("/:id", deleteProduct);

export default router;
