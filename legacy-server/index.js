const express = require('express');
const db = require('../database');
const moment = require('moment');

const app = express();
const port = 3003;

app.use('/', express.static('client/dist'));
app.use(express.json());

app.post('/moist-air/reviews', (req, res) => {
  let gameId = req.query.gameId;
  let userId = req.body.userId;
  let body = req.body.body;
  let recommended = req.body.recommended;
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
  console.log('receiving a post request');
  console.log(reviewData);
  db.createReview(reviewData)
    .then((data) => {
      res.status(200).send('Review has been posted');
    })
    .catch((err) => {
      res.send(err);
    })
})

app.get('/moist-air/reviews', (req, res, next) => {
  let gameId = req.query.gameID;
  console.log(req.query);
  if (gameId === '') { // default to hello kitty
    gameId = 1;
  }
  db.getReviews(gameId)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.patch('/moist-air/reviews', (req, res, next) => {
  var dataToChange = { key: req.query.key, val: req.query.value };
  console.log(req.query.reviewID);
  db.updateReview(req.query.reviewID, dataToChange)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.delete('/moist-air/reviews', (req, res) => {
  var gameId = req.query.gameID;
  var userId = req.body.userId;
  db.deleteReview(gameId, userId)
    .then(() => {
      res.send('Review was deleted');
    })
    .catch((err) => {
      res.send(err);
    })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});