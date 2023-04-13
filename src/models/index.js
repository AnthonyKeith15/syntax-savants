'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const racketsModel = require('./rackets/model.js');
const userModel = require('../auth/models/users.js');
const Collection = require('./data-collection.js');


const DATABASE_URL = process.env.DATABASE_URL || 'sqlite:memory:';

const sequelize = new Sequelize(DATABASE_URL);
const rackets = racketsModel(sequelize, DataTypes);
const user = userModel(sequelize, DataTypes);

module.exports = {
  db: sequelize,
  food: new Collection(food),
  rackets: new Collection(rackets),
  user: new Collection(user)
};
