//JSON Data
var data = '{ "q1": { "question": "Who teaches Harry how to play Wizard’s chess?", "choices": [ "A) Hagrid", "B) Hermione", "C) Ron", "D) Dudley" ], "answer": "2" }, "q2": { "question": "When is Harry Potter’s birthday?", "choices": [ "A) December 31", "B) June 31", "C) July 31", "D) August 31" ], "answer": "2" }, "q3": { "question": "Who teaches History of Magic at Hogwarts?", "choices": [ "A) Professor Flitwick", "B) Professor Sprout", "C) Professor Vector", "D) Professor Binns" ], "answer": "3" }, "q4": { "question": "Who was not at the Dursley’s the night Harry’s parents died?", "choices": [ "A) Albus Dumbledore", "B) Sirius Black", "C) Rubeus Hagrid", "D) Minerva McGonagall" ], "answer": "1" }, "q5": { "question": "Who said this?: I am good looking enough for both of us.", "choices": [ "A) Draco Malfoy", "B) Ron Weasley", "C) Ginny Weasley", "D) Fleur Delacour" ], "answer": "3" }, "q6": { "question": "Which of these spells is an Unforgivable Curse?", "choices": [ "A) Sectumsempra", "B) Crucio", "C) Expecto Patronum", "D) Stupefy" ], "answer": "1" }, "q7": { "question": "Who said this?: It’s Levi - o - sa, not Levio - sa.", "choices": [ "A) Harry Potter", "B) Gilderoy Lockhart", "C) Petunia Dursley", "D) Hermione Granger" ], "answer": "3" }, "q8": { "question": "Which of the following is not a trait of Slytherin house?", "choices": [ "A) Determination", "B) Cunning", "C) Ambition", "D) Wit" ], "answer": "3" }, "q9": { "question": "Which animal does Hermione become when she takes Polyjuice Potion in Chamber of Secrets?", "choices": [ "A) A toad", "B) A cat", "C) A rat", "D) An owl" ], "answer": "1" }, "q10": { "question": "Which of these spells will summon an object to you?", "choices": [ "A) Expelliarmus", "B) Wingardium Leviosa", "C) Accio", "D) Lumos" ], "answer": "2" } }';
//HTML variables
var qBox, qQuestion, qChoices, timerText;
//JS variables
var wrongGiphy = ["https://media.giphy.com/media/JAbAmpu1TshlS/giphy.gif", "https://thumbs.gfycat.com/ImportantDisgustingJanenschia-max-1mb.gif", "https://i.makeagif.com/media/3-28-2015/jScr_Q.gif"];
var correctGiphy = ["https://media1.tenor.com/images/5e35fe87910ea9d4ec7140489d9cc70a/tenor.gif?itemid=4669304", "https://media0.giphy.com/media/qLHzYjlA2FW8g/giphy.gif", "https://66.media.tumblr.com/71f6a90971c389778b2c7f98c5f6692b/tumblr_oiojaowPTW1w0nutjo1_500.gif"];
var timeoutGiphy = ["https://media1.tenor.com/images/c450cde5fd4f2f21a338644388930439/tenor.gif?itemid=7285683", "https://media1.tenor.com/images/446fa599b8838be122719c655d845c10/tenor.gif?itemid=12099879", "https://media1.tenor.com/images/b3c2ee5348733ba9f517576b9764e323/tenor.gif?itemid=3974762"];
var questionArr, intervalId;
var correctAnswers = wrongAnswers = missedAnswers = 0;
var questionKeys = [];
var time = 15;
var qInProgress = false;
var intermission = false;
var currQuestion = 0;
var phrase = "";

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

//==========================
// Timer related functions
//==========================
function start() {
    console.log("Intermission is next:", intermission);
    console.log("question in progress:", intermission);
    if (!qInProgress && !intermission) {
        console.log("Start countdown");
        intervalId = setInterval(countDown, 1000);
        qInProgress = true;
        intermission = true;
    }else if(!qInProgress && intermission) {
        console.log("Start intermission");
        timerText.text(phrase + "(" + time + ")");
        intervalId = setInterval(coolDown, 1000);
        qInProgress = true;
        intermission = false;
    }
}

function stop() {
    console.log("Stop");
    clearInterval(intervalId);
    qInProgress = false;
    timerText.text("Time Remaining: " + timeConverter(time));
}

function countDown() {
    time--;
    timerText.text("Time Remaining: " + timeConverter(time));
    if (time == 0) {
        stop();
        submitAnswer("");
    }
}

function coolDown(){
    time--;
    console.log(time);
    timerText.text(phrase + "(" + time + ")");
    if (time == 0) {
        time = 15;
        stop();
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
    console.log("Next Question");
    emptyHTML();
    if (currQuestion == 9) {
        gameOver();
    } else {
        currQuestion++;
        displayQuestion();
        start();
    }
}

function displayQuestion() {
    console.log("Dispalying Question");
    var qObject = questionArr[questionKeys[currQuestion]];
    emptyHTML();
    qQuestion.text(qObject.question);
    qObject.choices.forEach((element, index) => {
        var tempBtn = $("<button>");
        tempBtn.attr("id", index);
        tempBtn.addClass("choices");
        tempBtn.text(element);
        tempBtn.click(function () {
            console.log("clicked", this);
            submitAnswer($(this).attr("id"));
        });
        qChoices.append(tempBtn);
    });

}

function submitAnswer(choice) {
    console.log("Submitting answer");
    stop();
    var answer = questionArr[questionKeys[currQuestion]].answer;
    if (choice == answer) {
        correctAnswers++;
        
        console.log("Correct Answer: " + correctAnswers);
        displayIntermission("correct");
    } else if (choice != ""){
        wrongAnswers++;
        console.log("Wrong Answer: " + wrongAnswers);
        displayIntermission("wrong");
    }else{
        missedAnswers++;
        console.log("Wrong Answer: " + wrongAnswers);
        displayIntermission("timeout");
    }
}

function displayIntermission(type) {
    console.log("Intermission");
    emptyHTML();
    time = 5;
    switch (type) {
        case "correct":
            phrase = "10 points to... whatever house you're in!";
            randomGiphy(correctGiphy);
            break;
        case "wrong":
            phrase = "Did you even read the books?? *Scoff*";
            randomGiphy(wrongGiphy);
            break;
        case "timeout":
            phrase = "Hello? Anyone there? Spacing out?";
            randomGiphy(timeoutGiphy);
            break;
        default:
            console.log("Nothing?");
    }
    start();
}


//============================
// HTML DOM related functions
//============================
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
        timerText.text("Time Remaining: " + timeConverter(time));
        start();
        displayQuestion();
        $(this).remove();
    });
    $(".container").append(startBtn);
}

function emptyHTML() {
    qQuestion.empty();
    qChoices.empty();
}

function reset() {
    correctAnswers = wrongAnswers = missedAnswers = currQuestion = 0;
}

function gameOver() {
    var endPage = "<h1>Results:</h1><h3>Correct Answers: <h3>" + correctAnswers + "<br>" +
        "<h3>Wrong Answers: <h3>" + wrongAnswers + "<br>" +
        "<h3>Missed Answers: <h3>" + missedAnswers + "<br>";
    emptyHTML();
    qQuestion.html(endPage);
    reset();
    initialize("restart");
}

function randomGiphy(arr) {
    console.log("Grab GIPHY");
    var choice = Math.floor(Math.random() * arr.length);
    var tempImg = $("<img src=" + arr[choice] + ">");
    qQuestion.append(tempImg);
}