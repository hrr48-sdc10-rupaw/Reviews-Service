const fs = require('fs');
const faker = require('faker');
const moment = require('moment');
const stringify = require('csv-stringify');

var date = moment().format();

const gameGen = () => {
  var counter = 1;
  console.log('starting games.csv generation at', moment().format('MMMM Do YYYY, h:mm:ss a'))
  var stringifier = stringify({
    header: true,
    columns: {
      id: 'id',
      Title: 'Title',
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  })
  stringifier.pipe(fs.createWriteStream('games.csv'));
  var i = 10000000
  write();
  function write() {
    var ok = true;
    do {
      i-=1;
      if ( i === 0 ) {
        stringifier.write({
          id: counter++,
          Title: faker.commerce.productName(),
          createdAt: date,
          updatedAt: date
        })
        console.log(`created ${counter} records for games.csv at`, moment().format('MMMM Do YYYY, h:mm:ss a'));
      } else {
        ok = stringifier.write({
          id: counter++,
          Title: faker.commerce.productName(),
          createdAt: date,
          updatedAt: date
        });
      }
    } while (i > 0 && ok);
    if (i > 0) {
      stringifier.once('drain', write);
    }
  }
}

const userGen = () => {
  var counter = 1;
  console.log('starting users.csv generation at', moment().format('MMMM Do YYYY, h:mm:ss a'))
  var stringifier = stringify({
    header: true,
    columns: {
      id: 'id',
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
      Username: 'Username',
      avatar: 'avatar',
      games_owned_count: 'games_owned_count',
      reviews_count: 'reviews_count'
    }
  })
  stringifier.pipe(fs.createWriteStream('users.csv'));
  var i = 10000000
  write();
  function write() {
    var ok = true;
    do {
      i-=1;
      if ( i === 0 ) {
        stringifier.write({
          id: counter++,
          createdAt: date,
          updatedAt: date,
          Username: faker.internet.userName(),
          avatar: faker.internet.avatar(),
          games_owned_count: Math.floor(Math.random() * 100),
          reviews_count: Math.floor(Math.random() * 50),
        })
        console.log(`created ${counter} records for users.csv at`, moment().format('MMMM Do YYYY, h:mm:ss a'));
      } else {
        ok = stringifier.write({
          id: counter++,
          createdAt: date,
          updatedAt: date,
          Username: faker.internet.userName(),
          avatar: faker.internet.avatar(),
          games_owned_count: Math.floor(Math.random() * 100),
          reviews_count: Math.floor(Math.random() * 50),
        });
      }
    } while (i > 0 && ok);
    if (i > 0) {
      stringifier.once('drain', write);
    }
  }
}

const userGameGen = () => {
  var counter = 1;
  console.log('starting userGames.csv generation at', moment().format('MMMM Do YYYY, h:mm:ss a') )
  var stringifier = stringify({
    header: true,
    columns: {
      id: 'id',
      GameId: 'GameId',
      UserId: 'UserId',
      time_played: 'time_played',
      purchase_type: 'purchase_type',
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  })
  stringifier.pipe(fs.createWriteStream('userGames.csv'));
  var i = 100000000
  write();
  function write() {
    var ok = true;
    do {
      i-=1;
      if ( i === 0 ) {
        stringifier.write({
          id: counter++,
          GameId: Math.floor(Math.random() * 10000000),
          UserId: Math.floor(Math.random() * 10000000),
          time_played: Math.floor(Math.random() * 200),
          purchase_type: (Math.random() > 0.5) ? 'Steam Purchase' : 'Non-Steam Purchase',
          createdAt: date,
          updatedAt: date,
        })
        console.log(`created ${counter} records for userGames.csv at`, moment().format('MMMM Do YYYY, h:mm:ss a'));
      } else {
        ok = stringifier.write({
          id: counter++,
          GameId: Math.floor(Math.random() * 10000000),
          UserId: Math.floor(Math.random() * 10000000),
          time_played: Math.floor(Math.random() * 200),
          purchase_type: (Math.random() > 0.5) ? 'Steam Purchase' : 'Non-Steam Purchase',
          createdAt: date,
          updatedAt: date,
        });
      }
    } while (i > 0 && ok);
    if (i > 0) {
      stringifier.once('drain', write);
    }
  }
}

const reviewsGen = () => {
  var counter = 1;
  var body = faker.lorem.paragraph();
  console.log('starting reviews.csv generation at', moment().format('MMMM Do YYYY, h:mm:ss a'))
  var stringifier = stringify({
    header: true,
    columns: {
      id: 'id',
      userGameId: 'userGameId',
      recommended: 'recommended',
      body: 'body',
      helpful_count: 'helpful_count',
      funny_count: 'funny_count',
      comments_count: 'comments_count',
      awards: 'awards',
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    }
  })
  stringifier.pipe(fs.createWriteStream('reviews.csv'));
  var i = 100000000
  write();
  function write() {
    var ok = true;
    do {
      i-=1;
      if ( i === 0 ) {
        stringifier.write({
          id: counter++,
          userGameId: counter - 1,
          recommended: (Math.random() > 0.5) ? true : false,
          body: body,
          helpful_count: Math.floor(Math.random() * 50),
          funny_count: Math.floor(Math.random() * 10),
          comments_count: Math.floor(Math.random() * 10),
          awards: "{\"Treasure\":1,\"Mind Blown\":0,\"Golden Unicorn\":0,\"Deep Thoughts\":0,\"Heartwarming\":2,\"Hilarious\":3,\"Hot Take\":3,\"Poetry\":2,\"Extra Helpful\":1}",
          createdAt: date,
          updatedAt: date
        })
        console.log(`created ${counter} records for reviews.csv at`, moment().format('MMMM Do YYYY, h:mm:ss a'));
      } else {
        ok = stringifier.write({
          id: counter++,
          userGameId: counter - 1,
          recommended: (Math.random() > 0.5) ? true : false,
          body: body,
          helpful_count: Math.floor(Math.random() * 50),
          funny_count: Math.floor(Math.random() * 10),
          comments_count: Math.floor(Math.random() * 10),
          awards: "{\"Treasure\":1,\"Mind Blown\":0,\"Golden Unicorn\":0,\"Deep Thoughts\":0,\"Heartwarming\":2,\"Hilarious\":3,\"Hot Take\":3,\"Poetry\":2,\"Extra Helpful\":1}",
          createdAt: date,
          updatedAt: date
        });
      }
    } while (i > 0 && ok);
    if (i > 0) {
      stringifier.once('drain', write);
    }
  }
}

async function generateAll() {
  await gameGen()
  await userGen();
  await userGameGen();
  await reviewsGen();
}

generateAll();