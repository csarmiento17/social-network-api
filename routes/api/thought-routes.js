const router = require("express").Router();
const {
  getAllThoughts,
  getThoughtById,
  addThought,
  updateThought,
  deleteThought,
} = require("../../controllers/thougths-controller");

router.route("/").get(getAllThoughts);
router
  .route("/:thoughtId")
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);
router.route("/:userId").post(addThought);
module.exports = router;
