'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Review.belongsTo(models.User, {foreignKey: 'UserId'});
      Review.belongsTo(models.Game, {foreignKey: 'GameId'});
      Review.belongsTo(models.User_game, {foreignKey: 'UserGameId'});
    }
  };
  Review.init({
    GameId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    UserGameId: DataTypes.INTEGER,
    recommended: DataTypes.BOOLEAN,
    body: DataTypes.TEXT,
    helpful_count: DataTypes.INTEGER,
    funny_count: DataTypes.INTEGER,
    comments_count: DataTypes.INTEGER,
    awards: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};