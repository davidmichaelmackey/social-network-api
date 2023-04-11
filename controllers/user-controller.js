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


};