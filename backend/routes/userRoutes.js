const express = require("express");

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} = require("../controllers/userController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();


// Only admin can access these routes

router.get("/", authMiddleware, roleMiddleware("admin"), getUsers);

router.get("/:id", authMiddleware, roleMiddleware("admin"), getUserById);

router.post("/", authMiddleware, roleMiddleware("admin"), createUser);

router.patch("/:id", authMiddleware, roleMiddleware("admin"), updateUser);

router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteUser);


module.exports = router;