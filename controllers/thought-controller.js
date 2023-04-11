const { User, Thought } = require('../models');

module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: 'Server Error! :/' });
      });
  },

  getSingleThought(req, res) {
    const { thoughtId } = req.params;
    Thought.findOne({ _id: thoughtId })
      .then((thought) => {
        !thought
          ? res.status(400).json({ message: 'No user found with this id!' })
          : res.status(200).json(thought);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: 'Server Error! :/' });
      });
  },

  createThought(req, res) {
    const { thoughtText, username, userId } = req.body;
    if (!userId) {
      res.status(400).json({ message: 'No user found with this id!' });
    }

    Thought.create({ thoughtText, username })
      .then((thought) => {
        const thoughtId = thought._id;

        return User.findByIdAndUpdate(
          userId,
          { $push: { thoughts: thoughtId } },
          { new: true });
      })
      .then((user) => {
        !user
          ? res.status(400).json({ message: 'No user found with this id!' })
          : res.status(200).json(user);
      })
      .catch((er) => {
        console.log(err);
        res.status(500).json({ message: 'Server Error! :/' });
      });
  },

  updateThought(req, res) {
    const { thoughtText } = req.body;
    const { thoughtId } = req.params;
    Thought.findByIdAndUpdate(
      thoughtId,
      { thoughtText },
      {
        new: true,
        runValidators: true
      }
    )
      .then((thought) => {
        !thought
          ? res.status(400).json({ message: 'No thought found with this id!' })
          : res.status(201).json(thought);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: 'Server Error! :/' });
      });
  },

  deleteThought(req, res) {
    const { thoughtId } = req.params;
    Thought.findById(thoughtId)
      .then((thought) => {
        if (!thought) {
          res.status(400).json({ message: 'No thought found with this ID!' });
        }
        return Thought.findByIdAndDelete(thoughtId);
      })
      .then((thought) => {
        const username = thought.username;
        return User.findOneAndUpdate(
          { username: username },
          { $pull: { thoughts: thoughtId } },
          { new: true }
        )
          .then((user) => {
            !user
              ? res.status(400).json({ message: 'No user found with this ID!' })
              : res.json({ message: 'Thought and associated user data have been deleted.' });
          });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ message: 'Server Error! :/' });
      });
  },


};


// const thoughtController = {
//   // /api/thoughts
//   // get all thoughts
//   getAllThought(req, res) {
//     Thought.find({})
//       .populate({ path: 'reactions', select: '-__v' })
//       .select('-__v')
//       .sort({ _id: -1 })
//       .then(dbThoughtData => res.json(dbThoughtData))
//       .catch(err => {
//         console.log(err);
//         res.sendStatus(400);
//       });
//   },

//   // get one thoughts by id
//   getThoughtById({ params }, res) {
//     Thought.findOne({ _id: params.id })
//       .populate({ path: 'reactions', select: '-__v' })
//       .select('-__v')
//       .sort({ _id: -1 })
//       .then(dbThoughtData => {
//         if (!dbThoughtData) {
//           res.status(404).json({ message: 'No thoughts found with that id!' });
//           return;
//         }
//         res.json(dbThoughtData);
//       })
//       .catch(err => {
//         console.log(err);
//         res.sendStatus(400);
//       });
//   },

//   createThought({ body }, res) {
//     Thought.create(body)
//       .then(({ _id }) => {
//         return User.findOneAndUpdate({ _id: body.userId }, { $push: { thoughts: _id } }, { new: true });
//       })
//       .then(dbThoughtData => {
//         if (!dbThoughtData) {
//           res.status(404).json({ message: 'No user found with this id!' });
//           return;
//         }
//         res.json(dbThoughtData);
//       })
//       .catch(err => res.json(err));
//   },

//   // update Thought by id
//   updateThought({ params, body }, res) {
//     Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
//       .then(dbThoughtData => {
//         if (!dbThoughtData) {
//           res.status(404).json({ message: 'No thoughts found with that id!' });
//           return;
//         }
//         res.json(dbThoughtData);
//       })
//       .catch(err => res.json(err));
//   },

//   // delete thought by ID
//   deleteThought({ params }, res) {
//     Thought.findOneAndDelete({ _id: params.id })
//       .then(dbThoughtData => {
//         if (!dbThoughtData) {
//           res.status(404).json({ message: 'No thoughts found with that id!' });
//           return;
//         }
//         return User.findOneAndUpdate({ _id: parmas.userId }, { $pull: { thoughts: params.Id } }, { new: true });
//       })
//       .then(dbUserData => {
//         if (!dbUserData) {
//           res.status(404).json({ message: 'No User found with this id!' });
//           return;
//         }
//         res.json(dbUserData);
//       })
//       .catch(err => res.json(err));
//   },

//   createReaction({ params, body }, res) {
//     Thought.findOneAndUpdate({ _id: params.thoughtId }, { $push: { reactions: body } }, { new: true, runValidators: true })
//       .populate({ path: 'reactions', select: '-__v' })
//       .select('-__v')
//       .then(dbThoughtData => {
//         if (!dbThoughtData) {
//           res.status(404).json({ message: 'No thoughts with this ID.' });
//           return;
//         }
//         res.json(dbThoughtData);
//       })
//       .catch(err => res.status(400).json(err));
//   },

//   deleteReaction({ params }, res) {
//     Thought.findOneAndUpdate({ _id: params.thoughtId }, { $pull: { reactions: { reactionId: params.reactionId } } }, { new: true })
//       .then(dbThoughtData => {
//         if (!dbThoughtData) {
//           res.status(404).json({ message: 'Nope!' });
//           return;
//         }
//         res.json(dbThoughtData);
//       })
//       .catch(err => res.json(err));
//   }
// };

// module.exports = thoughtController;