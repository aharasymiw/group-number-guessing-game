let guessHistory = {
    rounds: 0,
    playerOne: [],
    playerTwo: [],
    playerThree: [],
};

function getGuessHistory() {
    let copyOfGuestHistory = guessHistory;
    return copyOfGuestHistory;
}

function selectNumberToGuess() {
    return randomNumber(1, 25);
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (1 + max - min) + min);
}

function formatGussesAsNumbers(guessesAsStrings) {
    // guessesAsStrings looks like {
    //  playerOne: '6',
    //  playerTwo: '13',
    //  playerThree: '26'
    // }
    let guessesAsNumbers = {
        playerOne: Number(guessesAsStrings.playerOne),
        playerTwo: Number(guessesAsStrings.playerTwo),
        playerThree: Number(guessesAsStrings.playerThree),
    }

    return guessesAsNumbers;
}

function updateGuessHistory(guesses, numberToGuess) {
    // guesses looks like {
    //  playerOne: 6,
    //  playerTwo: 13,
    //  playerThree: 26
    // }
    guessHistory.rounds++;

    let playerOneGuessDirection = calculatePlayerGuessDirection(guesses.playerOne, numberToGuess);
    guessHistory.playerOne.push({ guess: guesses.playerOne, direction: playerOneGuessDirection })

    let playerTwoGuessDirection = calculatePlayerGuessDirection(guesses.playerTwo, numberToGuess);
    guessHistory.playerTwo.push({ guess: guesses.playerTwo, direction: playerTwoGuessDirection })

    let playerThreeGuessDirection = calculatePlayerGuessDirection(guesses.playerThree, numberToGuess);
    guessHistory.playerThree.push({ guess: guesses.playerThree, direction: playerThreeGuessDirection })
}

function calculatePlayerGuessDirection(guess, numberToGuess) {
    // Note, Always check for a winner before this is called.
    // That way, we don't need to check for guess === numberToGuess
    if (guess < numberToGuess) {
        return 'class="blue-text"'
    } else if (guess > numberToGuess) {
        return 'class="red-text"'
    } else {
        return 'class="green-text"'
    }
}

function checkForWinner(guesses, numberToGuess) {

    console.log('module gusses:', guesses);
    console.log('module numberToGuess:', numberToGuess);

    let winner = "";

    if (guesses.playerOne === numberToGuess) {
        winner = 'playerOne';
    } else if (guesses.playerTwo === numberToGuess) {
        winner = 'playerTwo';
    } else if (guesses.playerThree === numberToGuess) {
        winner = 'playerThree';
    }

    return winner;
}

function resetGuessHistory() {
    guessHistory = {
        rounds: 0,
        playerOne: [],
        playerTwo: [],
        playerThree: [],
    };
}

exports.getGuessHistory = getGuessHistory;
exports.selectNumberToGuess = selectNumberToGuess;
exports.formatGussesAsNumbers = formatGussesAsNumbers;
exports.updateGuessHistory = updateGuessHistory;
exports.resetGuessHistory = resetGuessHistory;
