var timerElement = document.querySelector(".time-counter");
var startButton = document.querySelector(".start-button");
var questionElement = document.querySelector(".question");
var viewHighScoreButton = document.querySelector(".viewHighScore");

var timer = 100;
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
        "question": "What does css stand for",
        "options": [
            "cascading style sheet",
            "cataclysmic sonic sounds",
            "clarifying syntax sheet",
            "clear system style"
        ],
        "answer": "cascading style sheet"
    },

    {
        "question": "Which of the following is FALSE about arrays?",
        "options": [
            "arrays can hold mutilpe data types",
            "arrays are a list",
            "arrays can be changed after they are created",
            "arrays only hold one data type"
        ],
        "answer": "arrays only hold one data type"
    },

    {
        "question": "what does OOP stand for?",
        "options": [
            "only open pilot",
            "opperations on point",
            "object oriented programming",
            "object only programs"
        ],
        "answer": "object oriented programming"
    },


]

function startQuiz() {
    $(".hide").hide();
    $(".answers").show();
    timeCounter = 100;
    displayQuestions();
    startTimer();

}

function displayQuestions() {
    // set question
    questionElement.textContent = questions[questionNumber]["question"];

    questions[questionNumber]["options"].forEach((e) => {
        console.log(e)
        $(".options").append("<button style='background-color: aqua;' class='option' data-value=" + JSON.stringify(e) + ">" + e + "</button>");
    });

}


function checkAnswer() {
    console.log($(this).data("value"))
    if (questions[questionNumber]["answer"] === $(this).data("value")) {
        console.log("THAT IS THE CORRECT ANSWER");
        $(".result").text("CORRECT")
        // Implement correct answer and reset timer
        if (questionNumber < questions.length - 1) {

            console.log("end")

        }

    } else {
        console.log("WROOOOONNGGGG YOU SUCK");
        $(".result").text("INCORRECT")
        // implement wrong answer and take away 10 seconds
        timeCounter -= 10;


    }

    // TODO: clear question and options
    if (questionNumber < questions.length - 1) {

// Added result page
        questionNumber++;
        $(".options").empty();
            displayQuestions();
        setTimeout(() => {
            $(".result").text("")
            
        }, "1000");


    }
    else {
        console.log("end")

        setTimeout(() => {
            $(".answers").hide();
            $(".end-page").show();
        }, "1000");
       clearInterval(timer)
    }
}

// When the submit button is clicked, save the initials and score to local storage
// When the submit button is clicked, hide the end page and show the high scores page
// When the submit button is clicked, display the high scores page
function submitHighScore() {
    console.log("SUBMITTING HIGH SCORE");
    $(".end-page").hide();
    $(".highscore-page").show();
    var initialsString = $("#initials-value").val();
    var newScore = {
        "initials": initialsString,
        "score": timeCounter,
    };
    console.log(newScore);
    // localStorage.setItem("highScores", newScore);
    
    highScores = JSON.parse(localStorage.getItem("highScores") || "[]");
    highScores.push(newScore);
    localStorage.setItem("highScores", JSON.stringify(highScores));
    highScores.forEach((e) => {
        console.log(e);
        $("#scores").append("<tr><td>"+ e["initials"] + "</td><td>"+ e["score"] + "</td></tr>");
    });

}

function clearHighScore() {
    localStorage.removeItem("highScores");
    // clear high scores history
    $("#scores").empty();

}


function viewHighScores() {
    clearInterval(timer)
    $(".hide").hide();
    $(".answers").hide();
    $(".end-page").hide();
    $(".highscore-page").show();
     highScores = JSON.parse(localStorage.getItem("highScores") || "[]");
    localStorage.setItem("highScores", JSON.stringify(highScores));
    highScores.forEach((e) => {
        console.log(e);
        $("#scores").append("<tr><td>"+ e["initials"] + "</td><td>"+ e["score"] + "</td></tr>");
    });
    
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

function goBack() {
    location.reload();
}

$(document).on("click", ".option", checkAnswer);
$(document).on("click", "#submit", submitHighScore);
$(document).on("click", "#clear-highscore", clearHighScore);
$(document).on("click", "#go-back", goBack);

startButton.addEventListener("click", startQuiz);
viewHighScoreButton.addEventListener("click", viewHighScores);
