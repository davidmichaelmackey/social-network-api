const userData = [
  {
    username: 'dollyparton',
    email: 'dollyparton@example.com',
    thoughts: []
  },
  {
    username: 'waylonjennings',
    email: 'waylonjennings@example.com',
    thoughts: []
  },
  {
    username: 'georgejones',
    email: 'georgejones@example.com',
    thoughts: []
  },
  {
    username: 'tammywynette',
    email: 'tammywynette@example.com',
    thoughts: []
  }
];

const thoughtData = [
  {
    thoughtText: "The way I see it, if you want the rainbow, you gotta put up with the rain.",
    username: 'dollyparton',
    reactions: [
      {
        reactionBody: '🌧',
        username: 'georgejones'
      },
      {
        reactionBody: '🫠',
        username: 'waylonjennings'
      }
    ]
  },
  {
    thoughtText: "I'm not a star. I'm a legend.",
    username: 'waylonjennings',
    reactions: [
      {
        reactionBody: '😍',
        username: 'dollyparton'
      },
      {
        reactionBody: '🤠',
        username: 'georgejones'
      }
    ]
  },
  {
    thoughtText: "I've had so much plastic surgery, when I die they will donate my body to Tupperware.",
    username: 'georgejones',
    reactions: [
      {
        reactionBody: '😂',
        username: 'dollyparton'
      },
      {
        reactionBody: '🥸',
        username: 'waylonjennings'
      },
      {
        reactionBody: '💖',
        username: 'tammywynette'
      }
    ]
  },
  {
    thoughtText: "Stand by your man. Give him two arms to cling to and something warm to come home to.",
    username: 'tammywynette',
    reactions: [
      {
        reactionBody: '🥰',
        username: 'dollyparton'
      },
      {
        reactionBody: '💘',
        username: 'georgejones'
      }
    ]
  }
];


module.exports = {
  userData,
  thoughtData
};