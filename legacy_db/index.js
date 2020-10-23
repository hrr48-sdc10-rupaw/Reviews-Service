const Sequelize = require('sequelize');
const dotenv = require('dotenv');
const models = require('./models');
dotenv.config();

const sequelize = new Sequelize('reviews', process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql'
});

var getReviews = async (GameId) => {
  console.log('inside of get reviews', GameId);
  const reviews = await models.Review.findAll({
    include: [{
      model: models.User,
    }, {
      model: models.Game,
    }, {
      model: models.User_game,
    }],
    where: { GameId },
  });
  return reviews;
};

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
  const review = await models.Review.create({
    GameId: reviewData.gameId,
    UserId: reviewData.userId,
    UserGameId: reviewData.userGameId,
    body: reviewData.body,
    recommended: reviewData.recommended,
    helpful_count: 0,
    funny_count: 0,
    comments_count: 0,
    awards: "{\"Treasure\":0,\"Mind Blown\":0,\"Golden Unicorn\":0,\"Deep Thoughts\":0,\"Heartwarming\":0,\"Hilarious\":0,\"Hot Take\":0,\"Poetry\":0,\"Extra Helpful\":0}",
    createdAt: reviewData.date,
    updatedAt: reviewData.date
  })
  return review;
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