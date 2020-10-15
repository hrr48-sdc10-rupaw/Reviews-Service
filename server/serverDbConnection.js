const dotenv = require('dotenv');
const moment = require('moment');
const db = require('../database');
dotenv.config();

const createOperation = (query, main, callback) => {
  let gameId = query.gameId;
  let userId = main.userId;
  let body = main.body;
  let recommended = main.recommended;
  var idString = '000' + gameId.toString();
  idString = idString.slice(-3);
  var userGameId = userId.toString() + idString;
  var date = moment().format();
  var reviewData = {
    gameId,
    userId,
    body,
    recommended,
    userGameId,
    date,
  }
  db.createReview(reviewData)
    .catch((err) => {
      callback(err);
    })
    .then((data) => {
      callback(null, data);
    })
};

const readAllOperation = (gameId, callback) => {
  if (gameId === undefined) {
    gameId = 1;
  }
  db.getReviews(gameId)
    .catch((err) => {
      callback(err);
    })
    .then((data) => {
      callback(null, data);
    })
};

const updateOperation = (query, callback) => {
  const dataToChange = {
    key: query.key,
    val: query.value
  };
  db.updateReview(query.reviewID, dataToChange)
    .catch((err) => {
      callback(err);
    })
    .then((data) => {
      callback(null, data);
    })
}

const deleteOperation = (gameId, userId, callback) => {
  db.deleteReview(gameId, userId)
    .catch((err) => {
      callback(err)
    })
    .then((data) => {
      callback(null, data)
    })
}

module.exports.createOperation = createOperation;
module.exports.readAllOperation = readAllOperation;
module.exports.updateOperation = updateOperation;
module.exports.deleteOperation = deleteOperation;