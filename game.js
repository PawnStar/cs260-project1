var wordInProgress = [];
var secondsLeft = 0;
var rotationClasses = [
  '',
  'rot90',
  'rot180',
  'rot270'
]

function startGame(){

}

function createBoard(){

}

function handleLetterClick(index){

}

function canClickLetter(index){
  
}

function startTimer(){

}

function addWordToList(){

}

function gameEnd(){

}

function updateTimer(){

}

function checkWord(word){

}

function handleWordResult(word, isValid){

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

document.getElementById('startGame').addEventListener('click', startGame);
document.getElementById('rotateClock').addEventListener('click', function(){rotate('clockwise')});
document.getElementById('rotateCounter').addEventListener('click', function(){rotate('counterclockwise')});