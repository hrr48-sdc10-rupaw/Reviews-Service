var faker = require('faker');
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const fakeUsers = [];
    for (var i = 0; i < 100; i++) {
      var createdAt = faker.date.between('2009-01-01', '2020-09-05');
      var updatedAt = createdAt;
      var Username = faker.internet.userName();
      var avatar = faker.internet.avatar();
      var games_owned_count = Math.floor(Math.random() * 100);
      var reviews_count = Math.floor(Math.random() * 50);
      fakeUsers.push({Username, avatar, games_owned_count, reviews_count, createdAt, updatedAt });
    }

    await queryInterface.bulkInsert('Users', fakeUsers, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
