const router = require("express").Router();

const {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
} = require("../../controllers/user-controller");

// api/users
router.route("/").get(getAllUsers).post(addUser);

// /api/users/:id
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

module.exports = router;
