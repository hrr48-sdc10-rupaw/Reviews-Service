'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_game extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User_game.belongsTo(models.User, {foreignKey: 'UserId'});
      User_game.belongsTo(models.Game, {foreignKey: 'GameId'});
      User_game.hasOne(models.Review, {foreignKey: 'id'});
    }
  };
  User_game.init({
    GameId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    time_played: DataTypes.INTEGER,
    purchase_type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User_game',
  });
  return User_game;
};