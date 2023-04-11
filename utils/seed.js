const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { userData, thoughtData } = require('./data');

console.time('seeding');

connection.once('open', async () => {
  try {
    await User.deleteMany({});
    await Thought.deleteMany({});

    const createdUsers = await User.create(userData);

    for (const thought of thoughtData) {
      const { _id } = createdUsers.find(({ username }) => username === thought.username);
      const createdThought = await Thought.create({ ...thought, userId: _id });
      await User.findOneAndUpdate({ _id }, { $push: { thoughts: createdThought._id } });
    }

    console.log('Database seeded!');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
});