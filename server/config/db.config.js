const Sequelize = require('sequelize');

// Please create a credential.json file with your username and password for your cloud DB.
// Look at sampleCredentials.json.
const creds = require('./credentials');

// creates database connection credentials needed to connect to DB via Sequelize
const dburl = `postgres://${creds.username}:${creds.password}@elmer.db.elephantsql.com:5432/lbzwvhrm`;

// database connection
const dbConnection = new Sequelize(dburl);

// testing connection
dbConnection
  .authenticate()
  .then(function () {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });

module.exports = dbConnection;

require('../api/reviews/reviews.model.js');
require('../api/users/users.model.js');
require('../api/poi/poi.model.js');
