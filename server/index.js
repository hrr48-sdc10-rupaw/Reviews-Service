const express = require('express');
const Timer = require('timer-node');
const serverDbConnection = require('./serverDbConnection.js');
require('newrelic');

const app = express();
const PORT = process.env.PORT || 3003;
const timer = new Timer('test-timer');

app.use('/', express.static('client/dist'));
app.use(express.json());

app.post('/moist-air/reviews', (req, res) => {
  serverDbConnection.createOperation(req.query, req.body, (err, result) => {
    if (err) {
      console.error(err);
      res.send(err);
    }
    res.send(result);
  })
});

app.get('/moist-air/reviews', (req, res) => {
  timer.start();
  serverDbConnection.readAllOperation(req.query.gameID, (err, result) => {
    if (err) {
      console.error(err);
      res.send(err);
    }
    timer.stop();
    console.log(timer.format());
    res.send(result)
  })
})

// app.get('/moist-air/reviews', (req, res) => {
//   serverDbConnection.readAllOperation(req.query.gameID)
//     .catch((err) => {
//       if (err) console.error(err);
//       res.send(err)
//     .then((data) => {
//       res.send(data);
//     })
//     })
// })

app.patch('/moist-air/reviews', (req, res) => {
  serverDbConnection.updateOperation(req.query, (err, result) => {
    if (err) {
      console.error(err);
      res.send(err);
    }
    res.send(result);
  })
})

app.delete('/moist-air/reviews', (req, res) => {
  console.log('receiving delete request');
  serverDbConnection.deleteOperation(req.query.gameID, req.body.userId, (err, result) => {
    if (err) {
      console.error(err);
      res.send(err);
    }
    res.send('Review was deleted');
  })
})

app.listen(PORT, () => {
  console.log(`Reviews service is listening at http://localhost:${PORT}`);
})