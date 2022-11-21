// String of questions and answers
var questions = [
    {
        question: "What shortcut can be used, to start an HTML file with a default template?",
        answers: ["An excalamation point", "Ctrl+Shift+/", "Alt+F4", "Space+Eject"],
        correctAnswer: "An excalamation point"
    },
    {
        question: "What does the word 'repo' mean, within git?",
        answers: ["Reposessed", "Repolorization", "Repository", "Repopulate"],
        correctAnswer: "Repository"
    },
    {
        question: "How do you return the 3rd item in an array?",
        answers: ["Ask it nicely", "With the number 2", "With the number 3", "all of the above"],
        correctAnswer: "With the number 2"
    },
    {
        question: "What are the 3 standard file types that make up a basic web page?",
        answers: [".exe, .csv and .mp4 files", "manilla, x and personal files", ".xlsx, .doc and .ppi files", ".html, .css and .js files"],
        correctAnswer: ".html, .css and .js files"
    },
    {
        question: "What type of device works best for coding?",
        answers: ["Windows PC", "Apple Computer", "Linux Computer", "All of the above"],
        correctAnswer: "All of the above"
    },
];

// Set variables for when the quiz is started by the end user
var score = 0;
var questionIndex = 0;
var startTimer = document.querySelector("#timer");
var startQuiz = document.querySelector("#quizStart");
var questionsDiv = document.querySelector("#questionsDiv");
var entirePage = document.querySelector("#quizArea");
var secondsLeft = 60;
var holdInterval = 0;
var penalty = 10;
var ulCreate = document.createElement("ul");

// Action to start the timer and kick off the quiz, via the "Start Quiz" button
startQuiz.addEventListener("click", function () {
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            startTimer.textContent = "Countdown Timer: " + secondsLeft;

            // Ends the quiz if timer reaches 0
            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                allDone();
                startTimer.textContent = "Time is up, try again!";
            }
        
        // Sets interval for each tick of the countown timer (1000 milliseconds)
        }, 1000);
    }
    render(questionIndex);
});

// Function used, to display quiz questions and allow interaction with them, for the end user
function render(questionIndex) {
    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";
    for (var i = 0; i < questions.length; i++) {
        var userQuestion = questions[questionIndex].question;
        var userChoices = questions[questionIndex].answers;
        questionsDiv.textContent = userQuestion;
    }
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}

// Displays the result (correct or incorrect) of the answer that the end user chooses, for each question
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        if (element.textContent == questions[questionIndex].correctAnswer) {
            score++;
            createDiv.textContent = "Correct! The answer is:  " + questions[questionIndex].correctAnswer;
        } else {
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "I'm sorry but the correct answer is:  " + questions[questionIndex].correctAnswer;
        }
    }
    questionIndex++;
    if (questionIndex >= questions.length) {
        allDone();
        createDiv.textContent = "Greate! You answered  " + score + "/" + questions.length + " questions correctly!";
    } else {
        render(questionIndex);
    }
    questionsDiv.appendChild(createDiv);

}

// Function to display the end-of-quiz buttons and field (to enter initials)
function allDone() {
    questionsDiv.innerHTML = "";
    startTimer.innerHTML = "";

    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    // Message displayed to end user
    createH1.textContent = "Great Job!"
    questionsDiv.appendChild(createH1);
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionsDiv.appendChild(createP);

    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        // Displays quiz score to end user
        createP.textContent = "You scored " + timeRemaining + " poins!";

        questionsDiv.appendChild(createP2);
    }

    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Please enter your initials:";

    questionsDiv.appendChild(createLabel);

    // Field for end user to enter initials
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";
    questionsDiv.appendChild(createInput);
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";
    questionsDiv.appendChild(createSubmit);
    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;
        var emptyInitials = "N/A"
        
        // Validation if statement, ensuring the end user enters something within the initials field
        if (initials === null) {
            // My (failed) attempt at setting the initials to "N/A" if nothing is entered
            localStorage.setItem(initials,emptyInitials);

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            window.location.replace("./results.html");
        }
    });

}


