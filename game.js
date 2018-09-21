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
    startTimer();
  createBoard();
  document.getElementById('wordsFound').innerHTML = '';
}

/**
 * This function generates a set of letters and puts them in the
 * grid spans
 */
function createBoard(){
  // This is written in the dice.js file (so this file isn't cluttered
  // with rng and all that)
  var letters = getLetterList();

  for(var i = 0; i < letters.length; i++){
    var element = document.getElementById('piece_' + i);
    element.innerHTML = letters[i];
  }

  console.log('Generated board ' + letters._seed);
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
function handleLetterClick(index) {
    
  var span = document.getElementById("piece_" + index);
  var letter = span.innerHTML;

  if( canClickLetter(index) ) {
   
   wordInProgress.push(index);
   var currentWord = document.getElementById("currentWord");
   currentWord.innerHTML += letter;

   //disable the clicked grid span
   span.classList.add("disabled");

   //update last clicked span
   lastClickedSpan = index; 
  }
}

/**
 * This function checks to see if the given grid span is a valid
 * move.  It should check that span for the disabled class, as
 * well as check for adjacency to the lastClickedSpan.
 */
function canClickLetter(index){

  var span = document.getElementById("piece_" + index);

  if (isAdjacent(index) && span.className != "disabled" ) {
    return true;
  }
  else { return false; }
}

/**
 * This function checks whether the 
 * index is adjacent to the index of the 
 * last clicked span. Returns true if so, 
 * false otherwise
 */
function isAdjacent (index) {

    if(lastClickedSpan == null) {
      return true;
    }
    else {
      var down = 4;
      var up = -4;
      var right = 1;
      var left = -1;
      var downRight = 5;
      var downLeft = 3;
      var upRight = -3;
      var upLeft = -5;
      var difference = lastClickedSpan - index;

      if(difference == down
        || difference == up
        || difference == right
        || difference == left
        || difference == downRight
        || difference == downLeft
        || difference == upRight
        || difference == upLeft  ) {

          return true;
      }
      else { return false; }
  }
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
    secondsLeft = 180;
    timerTimout = setTimeout(updateTimer, 1000);
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
  
  var currentWord = document.getElementById("currentWord").innerHTML;

  if(currentWord.length >= 3) {
    
    //add word to list
    var wordList = document.getElementById("wordList");
    var wordToAdd = "<li>" + currentWord + "</li>";
    wordList.innerHTML += wordToAdd;

    //re-enable squares
    lastClickedSpan = null;

    for (var i = 0; i < wordInProgress.length; i++) {
      var span = document.getElementById("piece_" + wordInProgress[i]);
      span.classList.remove("disabled");
    }

    wordInProgress = [];
  }
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
const getScoreForWord = word=>[0,0,0,1,1,2,3,4,11,11,11,11,11,11,11,11,11,11,11][word.length]
function gameEnd(){
  // Clean up a bit
  clearTimeout(timerTimeout);
  document.getElementById('timer').className = '';

  let words =
    // Convert NodeList to element array
    [].slice.call(document.querySelectorAll('#wordsFound li'))
    // Convert element array to string array
    .map(elem=>elem.innerHTML)
    .map(word=>({
      word: word,
      score: checkWord(word)?getScoreForWord(word):0
    }))

  let total = words.map(word=>word.score).reduce((p,c)=>(p+c), 0);

  // Create score fullscreen card
  let div = document.createElement('div')
  div.id = 'fullscreenCard';
  div.innerHTML = '<h1>Score: ' + total + '</h1>'

  // List each word + score
  let table = document.createElement('table');
  for(let word of words){
    let tr = document.createElement('tr')
    tr.innerHTML = '<td' + (!word.score?' class="invalid"':'') + '>' + word.word + '</td><td>' + word.score + '</td>'
    table.appendChild(tr);
  }
  if(words.length > 0)
    div.appendChild(table);
  else{
    let p = document.createElement('p');
    p.innerHTML = 'No words found';
    div.appendChild(p);
  }
  
  // Create button
  let button = document.createElement('button')
  button.innerHTML = 'New Game';
  button.addEventListener('click', ()=>{
    // When clicked, remove card
    document.getElementById('fullscreenCard').remove();
    startGame();
  })

  // Add button to div
  div.appendChild(button);

  // Add div to page (first element because CSS rules)
  document.body.insertBefore(
    div,
    document.body.firstChild
  );
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
 
  if(secondsLeft == 0){
    gameEnd();
  }
  else{
    secondsLeft = secondsLeft-1;

    var minutes = Math.floor(secondsLeft/60)
    var seconds = secondsLeft % 60;

    if(minutes < 10)
      minutes = '0' + minutes;

    if(seconds < 10)
      seconds = '0' + seconds;

    if(minutes < 1)
      document.getElementById('timer').className = 'warning';

    document.getElementById('timerMinutes').innerHTML = minutes;
    document.getElementById('timerSeconds').innerHTML = seconds;

    timerTimeout = setTimeout(updateTimer, 1000);
  }
}

/**
 * This function returns true/false for whether the word
 * is valid.
 */
let dictionary; // Gets set by load function at end of file
function checkWord(word){
  if(!dictionary)
    throw new Error('Dictionary not loaded yet');
  
  // See if dictionary has word (all dictionary words lower case)
  if(dictionary[word.toLowerCase()])
    return true;

  return false;
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
  // Be sure to attach functions to click listeners down here
  document.getElementById('startGame').addEventListener('click', startGame);

  // If your function needs a parameter, you can declare an inline function like this, and then call
  // the larger function with the correct parameters
  document.getElementById('rotateClock').addEventListener('click', function(){rotate('clockwise')});
  document.getElementById('rotateCounter').addEventListener('click', function(){rotate('counterclockwise')});
  document.getElementById('piece_0').addEventListener('click', function(){ handleLetterClick(0); })
  document.getElementById('piece_1').addEventListener('click', function(){ handleLetterClick(1); })
  document.getElementById('piece_2').addEventListener('click', function(){ handleLetterClick(2); })
  document.getElementById('piece_3').addEventListener('click', function(){ handleLetterClick(3); })
  document.getElementById('piece_4').addEventListener('click', function(){ handleLetterClick(4); })
  document.getElementById('piece_5').addEventListener('click', function(){ handleLetterClick(5); })
  document.getElementById('piece_6').addEventListener('click', function(){ handleLetterClick(6); })
  document.getElementById('piece_7').addEventListener('click', function(){ handleLetterClick(7); })
  document.getElementById('piece_8').addEventListener('click', function(){ handleLetterClick(8); })
  document.getElementById('piece_9').addEventListener('click', function(){ handleLetterClick(9); })
  document.getElementById('piece_10').addEventListener('click', function(){ handleLetterClick(10); })
  document.getElementById('piece_11').addEventListener('click', function(){ handleLetterClick(11); })
  document.getElementById('piece_12').addEventListener('click', function(){ handleLetterClick(12); })
  document.getElementById('piece_13').addEventListener('click', function(){ handleLetterClick(13); })
  document.getElementById('piece_14').addEventListener('click', function(){ handleLetterClick(14); })
  document.getElementById('piece_15').addEventListener('click', function(){ handleLetterClick(15); })
}

// Check for fetch() support
if(! typeof fetch === 'function'){
  alert('Browser unsupported: no fetch() api');
} else {
  // Run at pageload to load dictionary
  fetch('https://raw.githubusercontent.com/dwyl/english-words/master/words_dictionary.json')
  .then(response=>response.json())
  .then(response=>{
    dictionary = response;
    console.log('dictionary loaded');
    document.getElementById('fullscreenCard').remove();
    return dictionary;
  })
}