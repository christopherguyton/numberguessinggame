/*
GAME FUNCTION:
- Player must guess number between min and max
- Player gets a certain amount of guesses
- Notify PLayer of guesses reamining
- Notify the player of correct answer if the player loses
- Let Player choose to play again
*/

//Values

let min = 1;
    max = 25,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

//UI Elements
const game = document.querySelector('#game'),
     minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');


//Assign UI min and Max
minNum.textContent = min;
maxNum.textContent = max;

// Play Again Event Listener
game.addEventListener('mousedown', function (e) {
    if (e.target.className === 'play-again') {
        window.location.reload();
    }
});

//Listen for guess

guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red')
    } else {

    // Check if won
    if (guess === winningNum) {
     gameOver(true, `Great guess! The number was ${winningNum}! YOU WIN!`)
        //
    }else{
        //Wrong Number
        guessesLeft -= 1;
        if (guessesLeft === 0) {
          gameOver(false, `You're out of guesses! Also the number was ${winningNum}`)
        } else {
            guessInput.value = '';
            guessInput.style.borderColor = 'red'
            setMessage(`Nope, sorry! You have ${guessesLeft} guesses left...`, 'red')
        }
    }
}
});

//Game Over
function gameOver(won, msg) {
    let color;
    won === true ? color = 'green' : color = 'red';

    guessInput.disabled = true;
    guessInput.style.borderColor = color;
    setMessage(msg, color);

    //Play Again

    guessBtn.value = 'Play Again'
    guessBtn.className += 'play-again';
}

function setMessage(msg, color){
    guessInput.style.borderColor = color;
    message.style.color = color;
    message.textContent = msg;
}

function getRandomNum(min, max) {
     return Math.floor(Math.random()* (max-min+1)+min);
}

