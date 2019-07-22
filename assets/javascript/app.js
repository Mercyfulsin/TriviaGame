//JSON Data
var data = '{ "q1": { "question": "Who teaches Harry how to play Wizard’s chess?", "choices": [ "A) Hagrid", "B) Hermione", "C) Ron", "D) Dudley" ], "answer": "2" }, "q2": { "question": "When is Harry Potter’s birthday?", "choices": [ "A) December 31", "B) June 31", "C) July 31", "D) August 31" ], "answer": "2" }, "q3": { "question": "Who teaches History of Magic at Hogwarts?", "choices": [ "A) Professor Flitwick", "B) Professor Sprout", "C) Professor Vector", "D) Professor Binns" ], "answer": "3" }, "q4": { "question": "Who was not at the Dursley’s the night Harry’s parents died?", "choices": [ "A) Albus Dumbledore", "B) Sirius Black", "C) Rubeus Hagrid", "D) Minerva McGonagall" ], "answer": "1" }, "q5": { "question": "Who said this?: I am good looking enough for both of us.", "choices": [ "A) Draco Malfoy", "B) Ron Weasley", "C) Ginny Weasley", "D) Fleur Delacour" ], "answer": "3" }, "q6": { "question": "Which of these spells is an Unforgivable Curse?", "choices": [ "A) Sectumsempra", "B) Crucio", "C) Expecto Patronum", "D) Stupefy" ], "answer": "1" }, "q7": { "question": "Who said this?: It’s Levi - o - sa, not Levio - sa.", "choices": [ "A) Harry Potter", "B) Gilderoy Lockhart", "C) Petunia Dursley", "D) Hermione Granger" ], "answer": "3" }, "q8": { "question": "Which of the following is not a trait of Slytherin house?", "choices": [ "A) Determination", "B) Cunning", "C) Ambition", "D) Wit" ], "answer": "3" }, "q9": { "question": "Which animal does Hermione become when she takes Polyjuice Potion in Chamber of Secrets?", "choices": [ "A) A toad", "B) A cat", "C) A rat", "D) An owl" ], "answer": "1" }, "q10": { "question": "Which of these spells will summon an object to you?", "choices": [ "A) Expelliarmus", "B) Wingardium Leviosa", "C) Accio", "D) Lumos" ], "answer": "2" } }';
//HTML variables
var qBox, qQuestion, qChoices, timerText;
//JS variables
var questionArr, correctAnswers, intervalId;
var questionKeys = [];
var time = 15;
var qInProgress = false;
var currQuestion = 1;

$(document).ready(function () {
    qBox = $("#question-box");
    qQuestion = $("#question");
    qChoices = $("#answer");
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


function initialize() {
    var startBtn = $("<button>");
    startBtn.text("Start Game!");
    startBtn.attr("id", "start");
    startBtn.click(function () {
        timerText.text(timeConverter(time));
        start();
        displayQuestion(currQuestion);
        $(this).remove();
    });
    $(".container").append(startBtn);
}

function clearHTML() {

}
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
}
function countDown() {
    time--;
    timerText.text(timeConverter(time));
    if (time == 0) {
        stop();
        tookToLong();
        if (currQuestion == 10) {
            gameOver();
        } else {
            currQuestion++;
            displayQuestion(currQuestion);
            start();
        }
    }
}

function gameOver() { };

function displayQuestion(index) {
    qQuestion.text(questionArr[questionKeys[index]].question);
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