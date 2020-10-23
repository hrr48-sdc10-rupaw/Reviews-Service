const { Pool } = require('pg');
const moment = require('moment');

const pool = new Pool({
  user: 'chancenguyen',
  password: '',
  database: 'steam_reviews_test',
  host: 'localhost',
});

function getReviews (gameId, callback) {
  var response
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack)
    }
    client.query(
      `SELECT *
      FROM reviews
      INNER JOIN user_games ON (reviews.usergameid = user_games.id)
      INNER JOIN users ON (user_games.userid = users.id)
      INNER JOIN games ON (user_games.userid = games.id)
      where games.id = ${gameId};` , (err, result) => {
        release()
        if (err) {
          callback(err);
        } else {
          callback(null, result.rows);
        }
      }
    )
  })
}

module.exports.getReviews = getReviews;