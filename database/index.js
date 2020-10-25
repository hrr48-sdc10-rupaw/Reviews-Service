const { Pool } = require('pg');

const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
  host: process.env.HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: 'steam_reviews'
})



var getReviews = (gameId, callback) => {
  pool.connect((err, client, release) => {
    if (err) {
      callback(err.stack);
    }
    client.query(
      `select
      reviews.id,
      reviews.gameid,
      reviews.userid,
      reviews.recommended,
      reviews.body,
      reviews.helpful_count,
      reviews.funny_count,
      reviews.awards,
      reviews.reviewcreatedAt,
      reviews.reviewupdatedAt,
      json_build_object(
         'id', users.id,
         'Username', users.username,
         'avatar', users.avatar,
         'games_owned_count', users.games_owned_count,
         'reviews_count', users.reviews_count,
         'createdAt', users.userCreatedAt,
         'updatedAt', users.userUpdatedAt
      ) as "User",
      json_build_object(
        'id', games.id,
        'Title', games.title,
        'createdAt', games.gamecreatedAt,
        'updatedAt', games.gameupdatedat
      ) as "Game",
      json_build_object(
        'GameId', games.id,
        'UserId', users.id,
        'time_played', reviews.time_played,
        'purchase_type', reviews.purchase_type
      ) as "User_game"
    from reviews
    inner join users on (reviews.userid = users.id)
    inner join games on (reviews.gameid = games.id)
    where reviews.gameid = ${gameId};`
      , (err, result) => {
      release()
      if (err) {
        callback(err.stack);
      }
      callback(null, result.rows);
    })
  })
}
const allowedAwards = {
  'Deep Thoughts': true,
  'Extra Helpful': true,
  'Golden Unicorn': true,
  'Heartwarming': true,
  'Hilarious': true ,
  'Hot Take': true,
  'Mind Blown': true,
  'Poetry': true,
  'Treasure': true
};
var updateReview = async (id, dataToChange) => {
  const review = await models.Review.findOne({ where: { id } });
  if (dataToChange.key === 'awards') {
    if (allowedAwards[dataToChange.val]) {
      let parsedAwards = JSON.parse(review.awards);
      parsedAwards[dataToChange.val]++;
      review.awards = JSON.stringify(parsedAwards);
    }
  } else if (dataToChange.key === 'funny') {
    review.funny_count++
  } else if (dataToChange.key === 'helpful') {
    review.helpful_count++
  } else if (dataToChange.key === 'unhelpful') {
    review.helpful_count--
  }
  review.save();
  return review;
};
var createReview = async (reviewData, callback) => {
  pool.connect((err, client, release) => {
    var query = `
    INSERT INTO REVIEWS
      (recommended, body, helpful_count, funny_count, comments_count, awards, reviewcreatedAt, reviewupdatedAt, gameid, userid, time_played, purchase_type)
      VALUES (${reviewData.recommended}, '${reviewData.body}', 0, 0, 0, '{''Treasure'':1,''Mind Blown'':0,''Golden Unicorn'':0,''Deep Thoughts'':0,''Heartwarming'':0,''Hilarious'':0,''Hot Take'':0,''Poetry'':0,''Extra Helpful'':0}', '${reviewData.date}', '${reviewData.date}', ${reviewData.gameId}, ${reviewData.userId}, ${reviewData.time_played}, '${reviewData.purchase_type}');
    `;
    if (err) {
      callback(err.stack);
    }
    client.query(query, (err, result) => {
        release()
        if (err) {
          callback(err.stack);
        } else {
          callback(null, result);
        }
      }
    )
  })
};
var deleteReview = async (gameId, userId) => {
  const review = await models.Review.findOne({
    where: {
      GameId: gameId,
      UserId: userId
    }
  });
  review.destroy();
  return;
}
module.exports.getReviews = getReviews;
module.exports.updateReview = updateReview;
module.exports.createReview = createReview;
module.exports.deleteReview = deleteReview;