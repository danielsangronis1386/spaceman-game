const wordList = [
  { word: "MOON", hint: "A satellite of Earth" },
  { word: "PLANET", hint: "Orbits a star" },
  { word: "ROCKET", hint: "Used to launch into space" },
  { word: "GALAXY", hint: "Massive system of stars" },
  { word: "ASTRONAUT", hint: "Person trained to travel in space" }
]
let secretWordObj = {};
let secretWord = "";
let correctGuesses = [];
let wrongGuesses = [];
const maxWrongGuesses = 6;

const wordDiv = document.getElementById('word');
const guessedDiv = document.getElementById('guessed-letters');
const messageDiv = document.getElementById('message');
const hintDiv = document.getElementById('hint');

function startGame() {
    secretWordObj = wordList[Math.floor(Math.random() * wordList.length)];
    secretWord = secretWordObj.word;
    correctGuesses = [];
    wrongGuesses = [];
    messageDiv.textContent = "";
    hintDiv.textContent = "Hint: " + secretWordObj.hint;
    updateDisplay();
}

function updateDisplay() {
    let displayWord = ""
    for (let letter of secretWord) {
        displayWord += correctGuesses.includes(letter) ? letter + " " : "_ "
    }
    wordDiv.textContent = displayWord.trim();
    guessedDiv.textContent = "Wrong guesses: " + wrongGuesses.join(", ")
}

function updateDisplay() {
    let displayWord = "";
    for (let letter of secretWord) {
        displayWord += correctGuesses.includes(letter) ? letter + " " : "_ ";
    }
    wordDiv.textContent = displayWord.trim();
    guessedDiv.textContent = "Wrong guesses: " + wrongGuesses.join(", ");
}
function checkGameOver() {
    if (secretWord.split('').every(letter => correctGuesses.includes(letter))) {
        messageDiv.textContent = "🎉 YOU WIN!";
        document.removeEventListener('keydown', handleKey);
    } else if (wrongGuesses.length >= maxWrongGuesses) {
        messageDiv.textContent = `💀 YOU LOSE! The word was: ${secretWord}`;
        document.removeEventListener('keydown', handleKey);
    }
}
function handleKey(event) {
    const letter = event.key.toUpperCase();
    if (!/^[A-Z]$/.test(letter)) return;

    if (correctGuesses.includes(letter) || wrongGuesses.includes(letter)) {
        messageDiv.textContent = "You already guessed that letter!";
        return;
    }

    if (secretWord.includes(letter)) {
        correctGuesses.push(letter);
    } else {
        wrongGuesses.push(letter);
    }

    updateDisplay();
    checkGameOver();
}

function restartGame() {
    document.addEventListener('keydown', handleKey);
    startGame();
}

restartGame();