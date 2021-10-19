const { Thought, User } = require("../models");

const ThoughtController = {
  getAllThoughts(req, res) {
    Thought.find({})
      .select("-__v")
      .then((data) => res.json(data))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  getThoughtById({ params }, res) {
    Thought.findById({ _id: params.thoughtId })
      .select("-__v")
      .then((data) => res.json(data))
      .catch((err) => res.sendStatus(400));
  },

  addThought({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((data) => {
        if (!data) {
          res.status(404).json({ message: "No user found with this id" });
          return;
        }
        res.json(data);
      })
      .catch((err) => res.json(err));
  },

  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.thoughtId }, body, {
      new: true,
      runValidators: true,
    })
      .then((data) => {
        if (!data) {
          res.status(400).json({ message: "No found thought with this id" });
          return;
        }
        res.json(data);
      })
      .catch((err) => res.json(err));
  },

  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then((data) => res.json(data))
      .catch((err) => res.sendStatus(400));
  },
};

module.exports = ThoughtController;
