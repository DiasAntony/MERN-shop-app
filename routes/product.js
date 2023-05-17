const express = require("express");
const {
  getAllProducts,
  getProduct,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
} = require("../controllers/product");
const { protect, admin } = require("../middleware/auth");
const router = express.Router();

router.get("/", getAllProducts);
router.post("/", protect, admin, createProduct);
router.get("/top", getTopProducts);
router.get("/:id", getProduct);
router.post("/:id/reviews", protect, createProductReview);
router.delete("/:id", protect, admin, deleteProduct);
router.put("/:id", protect, admin, updateProduct);

module.exports = router;
