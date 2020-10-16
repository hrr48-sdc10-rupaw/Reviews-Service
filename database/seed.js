const fs = require('fs');
const csvWriter = require('csv-write-stream');
const writer = csvWriter();
const faker = require('faker');
const moment = require('moment');

var date = moment().format();

const gameGen = () => {
  var counter = 1;
  writer.pipe(fs.createWriteStream('games.csv'));
  for (var i = 0; i < 10000000; i++) {
    writer.write({
      id: counter++,
      Title: faker.commerce.productName(),
      createdAt: date,
      updatedAt: date
    })
  }
  console.log('created games.csv');
}

const userGen = () => {
  var counter = 1;
  writer.pipe(fs.createWriteStream('users.csv'));
  for (var i = 0; i < 1000000; i++) {
    writer.write({
      id: counter++,
      createdAt: date,
      updatedAt: date,
      Username: faker.internet.userName(),
      avatar: faker.internet.avatar(),
      games_owned_count: Math.floor(Math.random() * 100),
      reviews_count: Math.floor(Math.random() * 50),
    })
  }
  console.log('created users.csv');
}

const userGameGen = () => {
  var counter = 1;
  writer.pipe(fs.createWriteStream('userGames.csv'));
  for (var i = 0; i < 10000000; i++) {
    writer.write({
      id: counter++,
      GameId: Math.floor(Math.random() * 10000000),
      UserId: Math.floor(Math.random() * 1000000),
      time_played: Math.floor(Math.random() * 200),
      purchase_type: (Math.random() > 0.5) ? 'Steam Purchase' : 'Non-Steam Purchase',
      createdAt: date,
      updatedAt: date,
    })
  }
  console.log('created userGames.csv');
}

const reviewsGen = () => {
  var counter = 1;
  var body = faker.lorem.paragraph()

  writer.pipe(fs.createWriteStream('reviews.csv'));
  for (var i = 0; i < 100; i++) {
    writer.write({
      id: counter++,
      userGameId: Math.floor(Math.random() * 10000000),
      recommended: (Math.random() > 0.5) ? true : false,
      body: body,
      helpful_count: Math.floor(Math.random() * 50),
      funny_count: Math.floor(Math.random() * 10),
      comments_count: Math.floor(Math.random() * 10),
      awards: "{\"Treasure\":1,\"Mind Blown\":0,\"Golden Unicorn\":0,\"Deep Thoughts\":0,\"Heartwarming\":2,\"Hilarious\":3,\"Hot Take\":3,\"Poetry\":2,\"Extra Helpful\":1}",
      createdAt: date,
      updatedAt: date
    })
  }
  console.log('created reviews.csv');
}

async function generateAll() {
  await gameGen();
  await userGen();
  await userGameGen();
  await reviewsGen();
  writer.end();
}

generateAll();