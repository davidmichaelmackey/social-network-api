const { User, Thought } = require('../models');

module.exports = {
  getUsers(req, res) {
    User.find()
      .then((users) => res.status(200).json(users))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  getSingleUser(req, res) {
    const { userId } = req.params;
    User.findOne({ _id: userId })
      .populate('thoughts')
      .populate('friends')
      .then((user) => {
        !user
          ? res.status(400).json({ message: 'No user found with this ID!' })
          : res.status(200).json(user);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  createUser(req, res) {
    console.log(req.body);
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((er) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  updateUser(req, res) {
    const { userId } = req.params;
    User.findByIdAndUpdate(
      userId,
      req.body,
      {
        new: true,
        runValidators: true
      })
      .populate('thoughts')
      .populate('friends')
      .then((user) => {
        !user
          ? res.status(400).json({ message: 'Found no user with this ID' })
          : res.json(user);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
      });
  },

  deleteUser(req, res) {
    const { userId } = req.params;
    User.findById(userId)
      .then((user) => {
        if (!user) {
          res.status(400).json({ message: 'Found no user with this ID' });
        }

        return User.findByIdAndDelete(userId);
      })
      .then((user) => {
        const username = user.username;
        Thought.deleteMany({ username });
        res.json({ message: `User ${username} and their associated thoughts were deleted successfully` });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: 'Server error' });
      });
  },


};