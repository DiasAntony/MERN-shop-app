const express = require("express");
const {
  loginUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getAllUsersProfile,
  deleteUser,
  getUserById,
  updateUser,
} = require("../controllers/user");
const { protect, admin } = require("../middleware/auth");
const router = express.Router();

router.post("/", registerUser);
router.get("/", protect, admin, getAllUsersProfile);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);
router.delete("/:id", protect, admin, deleteUser);
router.get("/:id", protect, admin, getUserById);
router.put("/:id", protect, admin, updateUser);

module.exports = router;
