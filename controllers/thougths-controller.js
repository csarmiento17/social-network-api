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

  // deleteThought({ params }, res) {
  //   Thought.findOneAndDelete({ _id: params.thoughtId })
  //     .then((data) => {
  //       if(!data){
  //         res.status(404).json({message:"No thought was found with this id"})
  //         return
  //       }
  //       User.findOneAndUpdate({})
  //     })
  //     .catch((err) => res.sendStatus(400));
  // },

  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then((data) => {
        if (!data) {
          return res
            .status(404)
            .json({ message: "No thought was found with this id" });
        }
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { thoughts: params.thoughtId } },
          { new: true, runValidators: true }
        );
      })
      .then((data) => {
        if (!data) {
          return res
            .status(404)
            .json({ message: "No user found with this id!" });
        }
        res.json(data);
      })
      .catch((err) => res.json(err));
  },

  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true }
    )
      .then((data) => res.json(data))
      .catch((err) => res.sendStatus(400));
  },

  deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true, runValidators: true }
    )
      .then((data) => res.json(data))
      .catch((err) => res.sendStatus(400));
  },
};

module.exports = ThoughtController;
