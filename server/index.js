const express = require('express');
const abstraction = require('./abstraction.js');

const app = express();
const PORT = process.env.PORT || 3003;

app.use('/', express.static('client/dist'));
app.use(express.json());

app.post('/moist-air/reviews', (req, res) => {
  abstraction.createOperation(req.query, req.body, (err, result) => {
    if (err) {
      console.error(err);
      res.send(err);
    }
    res.send(result);
  })
});

app.get('/moist-air/reviews', (req, res) => {
  abstraction.readAllOperation(req.query.gameID, (err, result) => {
    if (err) {
      console.error(err);
      res.send(err);
    }
    res.send(result)
  })
})

app.patch('/moist-air/reviews', (req, res) => {
  abstraction.updateOperation(req.query, (err, result) => {
    if (err) {
      console.error(err);
      res.send(err);
    }
    res.send(result);
  })
})

app.delete('/moist-air/reviews', (req, res) => {
  console.log('receiving delete request');
  abstraction.deleteOperation(req.query, req.body, (err, result) => {
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