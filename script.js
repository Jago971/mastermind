const btn = document.getElementById("submit");
let round = 1;
let answer = [];
getNewAnswer(4);

function getRandomInt(max) {
    return Math.floor((Math.random() * max) + 1);
}

function getNewAnswer(max) {
    for (let i = 0; i < max; i++) {
        answer.push(getRandomInt(max))
    }
}

function getGuess() {
    let pins = [...document.getElementsByClassName("round")];
    let pinValues = [];
    pins.forEach((pin) => {
        pinValues.push(Number(pin.value));
    });
    if(!pinValues.includes("")) {
        return pinValues;
    }
}

function numberColorSwap(number) {
    let colours = {
        1: 'Red',
        2: 'Yellow',
        3: 'Green',
        4: 'Blue'
    }
    return colours[number]
}

function submit() {
    let guess = getGuess();
    let guessesWithNames = guess.map(numberColorSwap)
    if(guess == undefined) {
        return
    } else {
        let answers = combineAnswers(checkWrongPosition(answer, guess), checkRightPosition(answer, guess))
        if(answers == "------YOU WON------") {
            console.log(answers)
            btn.removeEventListener("click", submit)
        } else {
            console.log(`ROUND: ${round}`)
            console.log(`YOUR GUESS: ${guessesWithNames}`)
            console.log(`Correct guesses:`)
            console.log(`WRONG position: ${answers[0]}`)
            console.log(`RIGHT position: ${answers[1]}`)
            console.log("////////////////////////////////////////")
        }
    
    }
    round++;
    if(round == 11) {
        console.log("------YOU LOST------");
        btn.removeEventListener("click", submit)
    }
}

function checkWrongPosition(answer, guess) {
    let score = 0
    guessCopy = guess.slice()

    answer.forEach((answerItem) => {
        if(guessCopy.includes(answerItem)) {
            index = guessCopy.indexOf(answerItem)
            guessCopy.splice(index, 1)
            score++
        }
    })
    return score
}

function checkRightPosition(answer, guess) {    
    let score = 0;
    for(let i = 0; i < answer.length; i++) {
        if(answer[i] == guess[i]) {
            score++;
        }
    }
    return score;
}

function combineAnswers(checkWrongPosition, checkRightPosition) {
    let WP = checkWrongPosition;
    let RP = checkRightPosition;
    if(RP == 4) {
        return "------YOU WON------";
    } else {
        return [(WP-RP), RP]
    }
}

btn.addEventListener("click", submit)

console.log("Welcome to MasterMind - console.log Edition")
console.log("-------------------------------------------")
console.log("How to play:")
console.log("1. Choose 4 different colored pins from the dropdowns.")
console.log("2. Hit the submit button.")
console.log("3. Receive your score:")
console.log("   -- How many pins in the WRONG place but right color.")
console.log("   -- How many pins in the RIGHT place AND right color.")
console.log("-------------------------------------------------------")
console.log("Get ALL 4 pins of the RIGHT color in the RIGHT position within 10 ROUNDs to win.")
console.log("")
console.log("")
console.log(answer)