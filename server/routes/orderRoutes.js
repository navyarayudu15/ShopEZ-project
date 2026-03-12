import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import {
  placeOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/", placeOrder);
router.get("/user/:userId", protect, getUserOrders);
router.get("/", protect, adminOnly, getAllOrders);
router.put("/:id", protect, adminOnly, updateOrderStatus);

export default router;
