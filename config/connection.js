const { connect, connection } = require('mongoose');

const connectionString = process.env.MONGODB_URI || 'mongodb+srv://davidmackey:reno911@social-network-api.3nqm2oo.mongodb.net/?retryWrites=true&w=majority';

connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;