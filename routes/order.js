const express = require("express");
const router = express.Router();

const { protect, admin } = require("../middleware/auth");
const {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
} = require("../controllers/order");

// when you placed (/:id) above the (/myorder), then you input the URL with /.../myorders, Route will consider myorders as an id, and it is not a type of ObjectId

router.post("/", protect, addOrderItems);
router.get("/", protect, admin,getOrders);
router.get("/myorders", protect, getMyOrders);
router.get("/:id", protect, getOrderById);
router.put("/:id/pay", protect, updateOrderToPaid);
router.put("/:id/deliver", protect, admin,updateOrderToDelivered);

module.exports = router;
