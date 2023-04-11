const { Schema, model } = require('mongoose');

const reactionsSchema = require('./Reaction');

const thoughtSchema = new Schema(
  {
    thoughtText:
    {
      type: String,
      required: true,
      minLength: 1,
      maxLength: [ 280, 'Must be less than 280 characters' ]
    },
    createdAt:
    {
      type: Date,
      default: Date.now,
      get: function(timestamp) {
        return new Date(timestamp).toLocaleDateString();
      }
    },
    username:
    {
      type: String,
      required: true
    },
    reactions: [ reactionsSchema ]
  },
  {
    toJSON:
    {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

thoughtSchema
  .virtual('reactionCount')
  .get(function() {
    return this.reactions.length;
  });

const Thought = model('thought', thoughtSchema);

module.exports = Thought;