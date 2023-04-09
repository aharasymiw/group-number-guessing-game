// This is where we store our 'state'.
// We aren't exporting this directly.
// Instead, we will create special 'getter' and 'setter' functions, and export those.
// Other javascript files can use those getter and setter functions to interact with the state.
let guessHistory = {
    rounds: 0,
    playerOne: [],
    playerTwo: [],
    playerThree: [],
};

// Think of it as a 'getter' for the server side of things.
// It allows us to read the state from server.js, but not change it.
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

// This is a 'setter' for the server side of things.
// We export this funciton, so server.js has a way to update the state.
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

// This is a little hacky, but works well.  I'm storing the 'guess direction' (high or low) as the class I'll add to the guess on the front end.
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

// This is a 'setter' for the server side of things.
// We export this funciton, so server.js has a way to reset the state.
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
