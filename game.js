var wordInProgress = [];
var secondsLeft = 0;
var rotationClasses = [
  '',
  'rot90',
  'rot180',
  'rot270'
]

var lastClickedSpan = null;
var timerTimeout = null;

/**
 * This function resets the timer, calls createBoard() to generate
 * the board, clears the wordList, resets all the grid spans to be
 * clickable again (removes the 'disabled' class), and clears
 * the current word span.  It also should disable the add word button
 */
function startGame(){

}

/**
 * This function generates a set of letters and puts them in the
 * grid spans
 */
function createBoard(){

}

/**
 * This function handles being clicked by one of the grid spans.
 * It accepts the grid piece index as a parameter, it should call
 * canClickLetter() to see if this is a valid move, and if so it
 * should add its letter(s) to the current word span, and disable
 * the clicked grid span.  Finally, it should set the clicked
 * element to the lastClickedSpan variable.
 * 
 * If the current word has at least three letters, it should
 * enable the add word button - otherwise it should disable it.
 */
function handleLetterClick(index){

}

/**
 * This function checks to see if the given grid span is a valid
 * move.  It should check that span for the disabled class, as
 * well as check for adjacency to the lastClickedSpan.
 */
function canClickLetter(index){
  
}

/**
 * This function puts the maximum number of seconds into the
 * secondsLeft variable, and then sets a timeout for the
 * updateTimer function to be called in 1 second.
 * 
 * It should save the returned timeout variable to the
 * timerTimeout variable.
 */
function startTimer(){

}

/**
 * This function should add our current word (from the currentWord
 * span) to the wordsFound <ul>, change all the gridpiece spans
 * to not be disabled, and set the lastClickedSpan variable
 * back to null.
 * 
 * Additionally, this function should disable the add word button.
 */
function addWordToList(){

}

/**
 * This function is called if the user clicks our "end game" button,
 * or if the timer reaches 0.
 * 
 * It should use clearTimeout on the timerTimeout variable (in
 * case we ended early - we don't want to get called twice),
 * check each word for whether or not they are valid, and
 * once all words have been checked it should compute a score
 * compute and display a score.
 */
function gameEnd(){

}

/**
 * This function is triggered by our timeout every second.
 * It should decrement secondsLeft by 1, update the timer
 * display span, and then set another timeout for it to be
 * called in 1 second.
 * 
 * If the secondsLeft variable gets to 0, this function
 * should not set a timeout, but should instead call
 * gameEnd().
 * 
 * (Just like the startTimer function, this should save the
 * returned timeout into the timerTimeout variable)
 */
function updateTimer(){

}

/**
 * This function returns a promise that resolves with a
 * boolean value for whether or not the given word is valid.
 */
function checkWord(word){

}

function rotate(direction){
  // Get the board element
  var boardElement = document.getElementById('board');

  // Get the index of our current rotation class
  var currentRotation = rotationClasses.indexOf(boardElement.className);

  // Increment/decrement index
  switch(direction){
    case 'clockwise':
      currentRotation++;
      break;
    case 'counterclockwise':
      currentRotation--;
      break;
    default: break;
  }

  // Handle overflow/underflow
  if(currentRotation < 0)
    currentRotation = rotationClasses.length - 1;
  if(currentRotation >= rotationClasses.length)
    currentRotation = 0;

  // Assign new rotation class
  boardElement.className = rotationClasses[currentRotation];
}

// Check for Promise support
if(! window.Promise){
  alert("Browser unsupported: No Promise constructor!");
} else {
  document.getElementById('startGame').addEventListener('click', startGame);
  document.getElementById('rotateClock').addEventListener('click', function(){rotate('clockwise')});
  document.getElementById('rotateCounter').addEventListener('click', function(){rotate('counterclockwise')});
}
