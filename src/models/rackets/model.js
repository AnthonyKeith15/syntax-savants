'use strict';

const racketModel = (sequelize, DataTypes) => sequelize.define('Rackets', {
  player_id: { type: DataTypes.INTEGER , required: true },
  stringer_id: { type: DataTypes.INTEGER, required: false },
  racket_name: { type: DataTypes.STRING, require: true },
  status: { type: DataTypes.ENUM('Received', 'In Progress', 'Completed'), required: false }
});

module.exports = racketModel;
