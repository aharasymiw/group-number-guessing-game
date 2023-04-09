$(document).ready(onReady);

function onReady() {
  $('#reset-button').addClass('hidden');

  refreshGuestHistory()

  $('#guess-button').on('click', postNewGuess);

  $('#reset-button').on('click', resetEverything);
}

function refreshGuestHistory() {

  $.ajax({
    method: 'GET',
    url: '/guesses',
  }).then(
    function (response) {
      console.log('GET /guesses response:', response);
      updateDomWithGuessHistory(response)
    }
  ).catch(
    function (error) {
      console.log('GET /guesses error:', error);
    }
  )
}

function updateDomWithGuessHistory(guessHistory) {
  // guessHistory looks like {
  //   rounds: 2,
  //   playerOne: [
  //     { guess: 1, direction: 'class="blue-text"' }, <- too low
  //   ],
  //   playerTwo: [
  //     { guess: 17, direction: 'class="red-text"' }, <- too high
  //   ],
  //   playerThree: [
  //     { guess: 6, direction: 'class="green-text"' }, <- winner!
  //   ],
  // };

  $('#rounds').text(`${guessHistory.rounds}`);
  $('#guess-history').empty();

  for (let round = 1; round <= guessHistory.rounds; round++) {
    let playerOneGuess = guessHistory.playerOne[round - 1].guess;
    let playerOneDirection = guessHistory.playerOne[round - 1].direction;
    if (playerOneDirection === 'class="green-text"') {
      alert("Player 1 is a winner!!!!");
      $('#reset-button').removeClass('hidden');
    }

    let playerTwoGuess = guessHistory.playerTwo[round - 1].guess;
    let playerTwoDirection = guessHistory.playerTwo[round - 1].direction;
    if (playerTwoDirection === 'class="green-text"') {
      alert("Player 2 is a winner!!!!");
      $('#reset-button').removeClass('hidden');
    }

    let playerThreeGuess = guessHistory.playerThree[round - 1].guess;
    let playerThreeDirection = guessHistory.playerThree[round - 1].direction;
    if (playerThreeDirection === 'class="green-text"') {
      alert("Player 3 is a winner!!!!");
      $('#reset-button').removeClass('hidden');
    }

    $('#guess-history').append(`
      <tr>
        <td>${round}</td>
        <td ${playerOneDirection}>${playerOneGuess}</td>
        <td ${playerTwoDirection}>${playerTwoGuess}</td>
        <td ${playerThreeDirection}>${playerThreeGuess}</td>
      </tr>
    `);
  }
}

function postNewGuess(event) {
  event.preventDefault();

  let newGuesses = {
    playerOne: $('#player-one-guess').val(),
    playerTwo: $('#player-two-guess').val(),
    playerThree: $('#player-three-guess').val()
  };

  $('#player-one-guess').val('');
  $('#player-two-guess').val('');
  $('#player-three-guess').val('');

  $.ajax({
    method: 'POST',
    data: newGuesses,
    url: '/guesses',
  }).then(
    function (response) {
      console.log('POST /guesses response:', response);
      refreshGuestHistory()
    }
  ).catch(
    function (error) {
      console.log('POST /guesses error:', error);
    }
  )
}

function resetEverything() {
  $('#reset-button').addClass('hidden');

  $.ajax({
    method: 'DELETE',
    url: '/guesses',
  }).then(
    function (response) {
      console.log('DELETE /guesses response:', response);
      refreshGuestHistory()
    }
  ).catch(
    function (error) {
      console.log('DELETE /guesses error:', error);
    }
  )
}
