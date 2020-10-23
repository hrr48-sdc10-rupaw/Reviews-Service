'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.belongsToMany(models.Game, { through: 'User_game' })
      User.hasMany(models.User_game, {foreignKey: 'id'});
    }
  };
  User.init({
    Username: DataTypes.STRING,
    avatar: DataTypes.STRING,
    games_owned_count: DataTypes.INTEGER,
    reviews_count: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};