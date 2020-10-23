var faker = require('faker');
'use strict';

var gameIdList = {};

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const fakeUserGames = [];
    await queryInterface.sequelize.query(`SELECT id, games_owned_count FROM Users`)
    .then((users) => {
      users[0].forEach((user) => {
          for (var i = 1; i <= 100; i++) {
            gameIdList[i] = true;
          };
          var UserId = user.id;
          fakeUserGames.push(randomDataGenerator(UserId, 1));
          for (var i = 1; i < user.games_owned_count + 1; i++) {
            fakeUserGames.push(randomDataGenerator(UserId))
          }
        })
      })
      await queryInterface.bulkInsert('User_games', fakeUserGames, {});
    },

    down: async (queryInterface, Sequelize) => {
      await queryInterface.bulkDelete('User_games', null, {});
    }
  };

  var deDupe = (GameId) => {
    while (!gameIdList[GameId]) {
      if (GameId++ > 100) {
        GameId = 1;
      }
    }
    gameIdList[GameId] = false;
    return GameId
  };

var randomDataGenerator = (UserId, GameId) => {
  if (!GameId) {
    var GameId = Math.floor(Math.random() * 100 + 1);
  }
  GameId = deDupe(GameId);
  var createdAt = faker.date.between('2009-01-01', '2020-09-05');
  var updatedAt = createdAt;
  var idString = '000' + GameId.toString();
  idString = idString.slice(-3);
  var id = UserId.toString() + idString;
  let time_played = Math.round(((Math.random() * 100) + Number.EPSILON) * 100) / 100;
  var purchase_type = (Math.random() > 0.5) ? 'Steam Purchase' : 'Non-Steam Purchase';
  return { id, UserId, GameId, time_played, purchase_type, createdAt, updatedAt };
}