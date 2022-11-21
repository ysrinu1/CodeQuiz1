// Variables
var highScore = document.querySelector("#highScore");
var clear = document.querySelector("#resetScores");
var startOver = document.querySelector("#startOver");
 
// Event Listener to clear the end user's local storage
clear.addEventListener("click", function () {
    localStorage.clear();
    location.reload();
});

// variable containing all high scores in local storage
var allScores = localStorage.getItem("allScores");

allScores = JSON.parse(allScores);

// Gathers and displays the list of highscores (if not cleared)
if (allScores !== null) {
    for (var i = 0; i < allScores.length; i++) {
        var createLi = document.createElement("li");
        createLi.textContent = allScores[i].initials + " " + allScores[i].score;
        highScore.appendChild(createLi);
    }
}

startOver.addEventListener("click", function () {
    window.location.replace("./index.html");
});