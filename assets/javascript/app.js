//JSON Data
var data = '{ "q1": { "question": "Who teaches Harry how to play Wizard’s chess?", "choices": [ "A) Hagrid", "B) Hermione", "C) Ron", "D) Dudley" ], "answer": "2" }, "q2": { "question": "When is Harry Potter’s birthday?", "choices": [ "A) December 31", "B) June 31", "C) July 31", "D) August 31" ], "answer": "2" }, "q3": { "question": "Who teaches History of Magic at Hogwarts?", "choices": [ "A) Professor Flitwick", "B) Professor Sprout", "C) Professor Vector", "D) Professor Binns" ], "answer": "3" }, "q4": { "question": "Who was not at the Dursley’s the night Harry’s parents died?", "choices": [ "A) Albus Dumbledore", "B) Sirius Black", "C) Rubeus Hagrid", "D) Minerva McGonagall" ], "answer": "1" }, "q5": { "question": "Who said this?: I am good looking enough for both of us.", "choices": [ "A) Draco Malfoy", "B) Ron Weasley", "C) Ginny Weasley", "D) Fleur Delacour" ], "answer": "3" }, "q6": { "question": "Which of these spells is an Unforgivable Curse?", "choices": [ "A) Sectumsempra", "B) Crucio", "C) Expecto Patronum", "D) Stupefy" ], "answer": "1" }, "q7": { "question": "Who said this?: It’s Levi - o - sa, not Levio - sa.", "choices": [ "A) Harry Potter", "B) Gilderoy Lockhart", "C) Petunia Dursley", "D) Hermione Granger" ], "answer": "3" }, "q8": { "question": "Which of the following is not a trait of Slytherin house?", "choices": [ "A) Determination", "B) Cunning", "C) Ambition", "D) Wit" ], "answer": "3" }, "q9": { "question": "Which animal does Hermione become when she takes Polyjuice Potion in Chamber of Secrets?", "choices": [ "A) A toad", "B) A cat", "C) A rat", "D) An owl" ], "answer": "1" }, "q10": { "question": "Which of these spells will summon an object to you?", "choices": [ "A) Expelliarmus", "B) Wingardium Leviosa", "C) Accio", "D) Lumos" ], "answer": "2" } }';
//HTML variables
var qBox, qQuestion, qChoices, timerText;
//JS variables
var questionArr, intervalId;
var correctAnswers = wrongAnswers = missedAnswers = 0;
var questionKeys = [];
var time = 15;
var qInProgress = false;
var currQuestion = 0;

$(document).ready(function () {
    qBox = $("#question-box");
    qQuestion = $("#question");
    qChoices = $("#choices");
    timerText = $("#timer");
    questionArr = JSON.parse(data);
    for (var key in questionArr) {
        if (questionArr.hasOwnProperty(key)) {
            questionKeys.push(key);
        }
    }
    console.log('Question Objs', questionArr);
    initialize();
});


function initialize(restart) {
    //Works with most modern browsers EXCEPT chrome {security reasons?}
    // $.getJSON("trivia.json", function(json) {
    //     console.log(json); // this will show the info it in firebug console
    // });

    var startBtn = $("<button>");
    if (restart !== undefined) {
        startBtn.attr("id", "restart");
        startBtn.text("Try Again?");
    } else {
        startBtn.attr("id", "start");
        startBtn.text("Start Game!");
    }
    startBtn.click(function () {
        timerText.text(timeConverter(time));
        start();
        displayQuestion();
        $(this).remove();
    });
    $(".container").append(startBtn);
}



//==========================
// Timer related functions
//==========================
function start() {
    if (!qInProgress) {
        intervalId = setInterval(countDown, 1000);
        qInProgress = true;
    }
}

function stop() {
    clearInterval(intervalId);
    qInProgress = false;
    time = 15;
    timerText.text(timeConverter(time));
}

function countDown() {
    time--;
    timerText.text(timeConverter(time));
    if (time == 0) {
        missedAnswers++;
        stop();
        tookToLong();
        nextQuestion();
    }
}

function timeConverter(t) {

    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    if (minutes === 0) {
        minutes = "00";
    }
    else if (minutes < 10) {
        minutes = "0" + minutes;
    }

    return minutes + ":" + seconds;
}

//=============================
// Question related functions
//=============================
function nextQuestion() {
    if (currQuestion == 9) {
        gameOver();
    } else {
        currQuestion++;
        displayQuestion();
        start();
    }
}

function displayQuestion() {
    var qObject = questionArr[questionKeys[currQuestion]];
    emptyHTML();
    qQuestion.text(qObject.question);
    qObject.choices.forEach((element, index) => {
        var tempBtn = $("<button>");
        tempBtn.attr("id", index);
        tempBtn.addClass("choices");
        tempBtn.text(element);
        tempBtn.click(function () {
            submitAnswer($(this).attr("id"));
            console.log("clicked", this);
        });
        qChoices.append(tempBtn);
    });

}

function submitAnswer(choice) {
    var answer = questionArr[questionKeys[currQuestion]].answer;
    if (choice == answer) {
        correctAnswers++;
        stop();
        console.log("Correct Answer: " + correctAnswers);
        nextQuestion();
    } else {
        wrongAnswers++;
        stop();
        console.log("Wrong Answer: " + wrongAnswers);
        nextQuestion();
    }
}

function emptyHTML() {
    qQuestion.empty();
    qChoices.empty();
}


function gameOver() {
    var endPage = "<h1>Results:</h1><h3>Correct Answers: <h3>" + correctAnswers + "<br>" +
        "<h3>Wrong Answers: <h3>" + wrongAnswers + "<br>" +
        "<h3>Missed Answers: <h3>" + missedAnswers + "<br>";
    emptyHTML();
    qQuestion.html(endPage);
    initialize("restart");
};
