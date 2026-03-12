import express from "express";
import {
  addToCart,
  getUserCart,
  removeCartItem,
} from "../controllers/cartController.js";

const router = express.Router();

router.post("/", addToCart);
router.get("/:userId", getUserCart);
router.delete("/:id", removeCartItem);

export default router;
