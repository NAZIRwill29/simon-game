// pattern of colour
var gamePattern = [];

// array contain 4 colour to be picked for button
var buttonColours = ["red", "blue", "green", "yellow"];

// pattern click by user
var userClickedPattern = [];

// the level of game
var level = 0;

// function to generate colour pattern
function nextSequence() {
  // empty the user pattern library
  userClickedPattern = [];

  // make random number 0-3
  var randomNumber = Math.round(Math.random() * 3); // 0-3

  // choose the color to be shown for user
  var randomChosenColour = buttonColours[randomNumber]; // "green"

  // add colour in the pattern
  gamePattern.push(randomChosenColour); // ["green"]

  // select the button with the same id as the randomChosenColour
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

  // play specific sound based on colour
  playSound(randomChosenColour);

  // add level
  level ++;
  // change title
  $("#level-title").text("Level " + level);
}

// detect any button clicked by user
$(".btn").click(function() {
  // store id click by user
  var userChosenColour = $(this).attr("id"); // green
  // add pattern in userClickedPattern
  userClickedPattern.push(userChosenColour); // ["green"]

  // play specific sound based on user click
  playSound(userChosenColour);

  // make btn animation
  animatePress(userChosenColour);

  //store the user answer index
  checkAnswer(userClickedPattern.length-1);
});

// function play sound
function playSound(name) {
  // assign the audio
  var audio = new Audio("sounds/" + name + ".mp3");
  // play sound
  audio.play();
}
//function animate btn when user clicked pressed
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  // delay before execute function
  setTimeout(function (){
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

// detect keyboard pressed to start game and only detect once only
$(document).keypress(function() {
  // check if level is 0
  if (level < 1) {
    // change title
    $("#level-title").text("Level " + level);
    nextSequence();
  }
})

// function check answer
function checkAnswer(currentLevel){
  // check is user last answer is correct
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("success");

    // check if user has finished answe
    if (gamePattern.length === userClickedPattern.length){

      // call nextSequence after 1000 ms
      setTimeout(function (){
        nextSequence();
      }, 1000);
    }
  }
  // if wrong answer
  else {
    console.log("wrong");
    // play sound wrong
    playSound("wrong");
    // create game over scene
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, You got Level " + level + ". Press Any Key to Restart");
    // remove game over scene after few sec
    setTimeout(function (){
      $("body").removeClass("game-over");
    }, 200);

    // to start over game
    $(document).keypress(function (){
      startOver();
    });
  }
}

// function to start over game
function startOver(){
  level = 0;
  gamePattern = [];
}
