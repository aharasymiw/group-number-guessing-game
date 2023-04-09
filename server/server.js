let guessStuff = require('./modules/guess_data.js');

const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;

let numberToGuess = guessStuff.selectNumberToGuess();
console.log('numberToGuess:', numberToGuess);

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/guesses', (req, res) => {
  let guessHistory = guessStuff.getGuessHistory();
  res.send(guessHistory);
})

app.post('/guesses', (req, res) => {

  let guessesAsStrings = req.body;
  // guessesAsStrings looks like {
  //  playerOne: '6',
  //  playerTwo: '13',
  //  playerThree: '26'
  // }
  let guesses = guessStuff.formatGussesAsNumbers(guessesAsStrings);
  // guesses looks like {
  //  playerOne: 6,
  //  playerTwo: 13,
  //  playerThree: 26
  // }
  guessStuff.updateGuessHistory(guesses, numberToGuess)

  res.sendStatus(201);
})

app.delete('/guesses', (req, res) => {
  guessStuff.resetGuessHistory();
  numberToGuess = guessStuff.selectNumberToGuess();
  console.log('numberToGuess:', numberToGuess);
  res.sendStatus(204);
})

app.listen(PORT, () => {
  console.log('Server is running on port', PORT)
})
