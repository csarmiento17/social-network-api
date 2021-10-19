const { User } = require("../models");

const UserController = {
  //get all user
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .select("-__v")
      .then((data) => res.json(data))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  addUser({ body }, res) {
    User.create(body)
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  },

  getUserById({ params }, res) {
    User.findById({
      _id: params.userId,
    })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .select("-__v")
      .then((data) => res.json(data))
      .catch((err) => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  updateUser({ params, body }, res) {
    User.findOneAndUpdate(
      {
        _id: params.userId,
      },
      body,
      { new: true, runValidators: true }
    )
      .then((data) => {
        if (!data) {
          res.status(404).json({ message: "No user found with this id" });
          return;
        }
        res.json(data);
      })
      .catch((err) => res.json(err));
  },

  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.userId })
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  },

  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: params.friendId } },
      { new: true, runValidators: true }
    )
      .then((data) => {
        if (!data) {
          res.send(404).json({ message: "No user found with this id" });
          return;
        }
        return res.json(data);
      })
      .catch((err) => res.json(err));
  },

  deleteFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  },
};

module.exports = UserController;
