// reviews schema/model
const Sequelize = require('sequelize');
const dbConnection = require('../../config/db.config.js');
const POI = require('../poi/poi.model.js');
const User = require('../users/users.model.js');

const Review = dbConnection.define('review', {
  review_type: {
    type: Sequelize.STRING
  },
  review_content: {
    type: Sequelize.TEXT,
    defaultValue: 'No review provided.'
  },
  rating: {
    type: Sequelize.INTEGER
  },
  general_rating: {
    type: Sequelize.INTEGER
  },
  reviewer_name: {
    type: Sequelize.STRING,
    defaultValue: 'Anonymous'
  },
  experience_content: {
    type: Sequelize.TEXT,
    defaultValue: ''
  },
  facebookId: {
    type: Sequelize.STRING
  }
})

Review.belongsTo(User)
Review.belongsTo(POI)
User.hasMany(Review)
POI.hasMany(Review)

// will only create table once; use {force: true} to override table
Review.sync().then(function () {
})

module.exports = Review
