const dotenv = require('dotenv');
const moment = require('moment');
const db = require('../database');
dotenv.config();

const createOperation = (query, main, callback) => {
  let gameId = query.gameId;
  let userId = main.userId;
  let body = main.body;
  let recommended = main.recommended;
  var date = moment().format();
  let time_played = main.time_played;
  let purchase_type = main.purchase_type === true ? 'Steam Purchase' : 'Non-Steam Purchase';
  var reviewData = {
    gameId,
    userId,
    body,
    recommended,
    date,
    time_played,
    purchase_type
  }
  db.createReview(reviewData, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  })
};

// const readAllOperation = (gameId, callback) => {
//   if (gameId === undefined) {
//     gameId = 1;
//   }
//   db.getReviews(gameId, (err, result) => {
//     if (err) {
//       callback(err);
//     } else {
//       callback(null, result);
//     }
//   })
// }
const readAllOperation = (gameId, callback) => {
  if (gameId === undefined) {
    gameId = 1;
  }

  db.getReviews(gameId, (err, result) => {
    if (err) callback(err);
    else {
      callback(null, result);
    }
  })
};


const updateOperation = (query, callback) => {
  const dataToChange = {
    key: query.key,
    val: query.value
  };
  db.updateReview(query.reviewID, dataToChange, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  })

}

const deleteOperation = (gameId, userId, callback) => {
  db.deleteReview(gameId, userId, (err, result) => {
    if (err) {
      callback (err);
    } else {
      callback(null, result);
    }
  })

}

module.exports.createOperation = createOperation;
module.exports.readAllOperation = readAllOperation;
module.exports.updateOperation = updateOperation;
module.exports.deleteOperation = deleteOperation;