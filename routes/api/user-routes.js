const router = require("express").Router();

const {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/user-controller");

// api/users
router.route("/").get(getAllUsers).post(addUser);

// /api/users/:id
router.route("/:userId").get(getUserById).put(updateUser).delete(deleteUser);

// Add and Remove friend under User
router.route("/:userId/friends/:friendId").post(addFriend);
router.route("/:userId/friends/:friendId").delete(deleteFriend);
module.exports = router;
