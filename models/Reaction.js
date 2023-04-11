const { Schema, default: mongoose } = require('mongoose');

const reactionsSchema = new Schema(
  {
    reactionId: {
      type: mongoose.Types.ObjectId,
      default: () => new mongoose.Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: [ 280, 'Must be less than 280 characters!' ]
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: function(timestamp) {
        return new Date(timestamp).toLocaleDateString();
      }
    }
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = reactionsSchema;