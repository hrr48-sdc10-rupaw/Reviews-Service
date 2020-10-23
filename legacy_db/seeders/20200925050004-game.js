var faker = require('faker');
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const fakeGames = [];
    fakeGames.push(randomDataGenerator('Hello Kitty and Sanrio Friends Racing'));
    for (var i = 0; i < 99; i++) {
      fakeGames.push( randomDataGenerator() );
    }
    await queryInterface.bulkInsert('Games', fakeGames, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Games', null, {});
  }
};

var randomDataGenerator = (title) => {
  if (!title) {
    var title = faker.commerce.productAdjective() + ' ' + faker.commerce.productName();
  }
  var createdAt = faker.date.between('2009-01-01', '2020-09-05');
  var updatedAt = createdAt;
  return { title, createdAt, updatedAt };
};