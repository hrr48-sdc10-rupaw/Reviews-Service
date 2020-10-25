const { Pool } = require('pg');
const moment = require('moment');

const pool = new Pool({
  user: 'chancenguyen',
  password: '',
  // database: 'steam_reviews_test',
  host: 'localhost',
});

;(async () => {
  const client = await pool.connect();
  await client.query(
    `DROP DATABASE IF EXISTS steam_reviews_test;

    CREATE DATABASE steam_reviews_test;`
    )
    client.release();
})()

;(async () => {
  const pool = new Pool({
    user: 'chancenguyen',
    password: '',
    database: 'steam_reviews_test',
    host: 'localhost',
  });
  const client = await pool.connect()
  try {
    console.log(`Seeding csv files into Postgres at`, moment().format('MMMM Do YYYY, h:mm:ss a'));
    let res = await client.query(
      `DROP DATABASE IF EXISTS steam_reviews_test;

      CREATE DATABASE steam_reviews_test;

      \\\\c steam_reviews_test

      CREATE TABLE games(
        id integer primary key,
        Title varchar(255),
        createdAt TIMESTAMP,
        updatedAt TIMESTAMP
      );

      CREATE TABLE users(
        id integer primary key,
        createdAt TIMESTAMP,
        updatedAt TIMESTAMP,
        Username varchar(100),
        avatar varchar(255),
        games_owned_count integer,
        reviews_count integer
      );

      CREATE TABLE user_games(
        id integer primary key,
        GameId integer,
        UserId integer,
        time_played integer,
        purchase_type varchar(100),
        createdAt TIMESTAMP,
        updatedAt TIMESTAMP
      );

      CREATE TABLE reviews(
        id integer primary key,
        userGameId integer,
        recommended boolean,
        body varchar(1000),
        helpful_count integer,
        funny_count integer,
        comments_count integer,
        awards varchar(255),
        createdAt TIMESTAMP,
        updatedAt TIMESTAMP
      );

      COPY games
      FROM '/Users/chancenguyen/Hack-Reactor/SDC/Reviews-Service/database/generated/gamesTest.csv'
      CSV HEADER;

      COPY users
      FROM '/Users/chancenguyen/Hack-Reactor/SDC/Reviews-Service/database/generated/usersTest.csv'
      CSV HEADER;

      COPY user_games
      FROM '/Users/chancenguyen/Hack-Reactor/SDC/Reviews-Service/database/generated/userGamesTest.csv'
      CSV HEADER;

      COPY reviews
      FROM '/Users/chancenguyen/Hack-Reactor/SDC/Reviews-Service/database/generated/reviewsTest.csv'
      CSV HEADER;`
    );
    console.log(res);
    // res = await client.query('CREATE DATABASE test');
    // console.log(res);
    // console.log('creating database test');
    // res = await client.query('CREATE TABLE testTable(id int, name varchar)');
    // console.log(res);
    // console.log('created table test');
  } finally {
    client.release();
  }
})().catch(err => console.log(err.stack))