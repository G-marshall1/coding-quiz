var timerElement = document.querySelector(".time-counter");
var startButton = document.querySelector(".start-button");
var questionElement = document.querySelector(".question");
var options = document.querySelector(".options");

var timeCounter;
var questionNumber = 0;

var questions = [
    {

        "question": "What is does html stand for",
        "options": [
            "hot toes make love",
            "HyperText Markup Language",
            "HyperTexture Makes Language",
            "Heavy Technology Magic Language"
        ],
        "answer": "HyperText Markup Language"
    },

    {
        "question": "What is does css stand for",
        "options": [
            "cascading style sheet",
            "cataclysmic sonic sounds",
            "clarifying syntax sheet",
            "clear system style"
        ],
        "answer": "cascading style sheet"
    },

]

function startQuiz() {
    $(".hide").hide();
    $(".answers").show();
    timeCounter = 10;
    displayQuestions();
    startTimer();

}

function displayQuestions() {
    // set question
    questionElement.textContent = questions[questionNumber]["question"];
    
    questions[questionNumber]["options"].forEach((e) => {
        console.log(e)
        $(".options").append("<button class='option' data-value="+ JSON.stringify(e) + ">"+ e +"</button>");
    });
   
}


function checkAnswer() {
    console.log($(this).data("value"))
    if(questions[questionNumber]["answer"] === $(this).data("value")){
        console.log("THAT IS THE CORRECT ANSWER");
        // TODO: Implement correct answer and reset timer
    } else {
        console.log("WROOOOONNGGGG YOU SUCK");
        // TODO: implement wrong answer and take away 10 seconds off the clock
    }

    // TODO: Clear questions and show the next questions;

}

function startTimer() {
    // Sets timer
    timer = setInterval(function () {
        timeCounter--;
        timerElement.textContent = timeCounter;
        if (timeCounter >= 0) {
            // Tests if win condition is met
        }
        // Tests if time has run out
        if (timeCounter === 0) {
            // Clears interval
            clearInterval(timer)
        }
    }, 1000);
}
$(document).on("click", ".option", checkAnswer)
// options.addEventListener("click", checkAnswer)
startButton.addEventListener("click", startQuiz);
