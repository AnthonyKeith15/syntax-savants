'use strict';

const racketsModel = (sequelize, DataTypes) => sequelize.define('Rackets', {
  player_id: { type: DataTypes.INTEGER , required: true },
  stringer_id: { type: DataTypes.INTEGER, required: false },
  status: { type: DataTypes.ENUM('Received', 'In Progress', 'Completed'), required: true }
});

module.exports = racketsModel;
