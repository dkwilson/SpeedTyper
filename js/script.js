//grab UI elements
const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// list of words for games
const words = [
    'sigh',
    'tense',
    'airplane',
    'ball',
    'pies',
    'juice',
    'warlike',
    'bad',
    'north',
    'dependent',
    'steer',
    'silver',
    'highfalutin',
    'superficial',
    'quince',
    'eight',
    'feeble',
    'admit',
    'drag',
    'loving'
  ];

  //init word
  let randomWord;

  //Init score
  let score = 0;

  //Init time
  let time = 10;

  //set difficulty to value of local storage of medium
  let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

  //set difficulty select value
  difficultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

  //focus on text at game start
  text.focus();

  //Start counting down
  const timeInterval = setInterval(updateTime, 1000);

  //generate random word from array
  function getRandomWord(){
      return words[Math.floor(Math.random() * words.length)];
  }

 //Add word to DOM
 function addWordToDOM() {
     randomWord = getRandomWord();
     word.innerHTML = randomWord;

 }

 // Update Scores
 function updateScore() {
     score++;
     scoreEl.innerHTML = score;
 }

 //Update time
 function updateTime(){
     time--;
     timeEl.innerHTML = time + 's';

     if(time === 0) {
         clearInterval(timeInterval);

         //end game
         gameOver();
     }
 }

 //Game over show end screen
function gameOver() {
    endgameEl.innerHTML = `
        <h1>Time ran out</h1>
        <p>Your final score is ${score}</p>
        <button onclick="location.reload()">Play Again!</button>
    `;

    endgameEl.style.display = 'flex';
}

 addWordToDOM();

 //Event listeners
 text.addEventListener('input', e => { 
     const insertedText = e.target.value;
     
     if (insertedText === randomWord) {
         addWordToDOM();
         updateScore();

         //clear
         e.target.value = '';

         if (difficulty === 'hard') {
            time += 2;
         } else if (difficulty === 'medium'){
            time += 3;
         } else {
            time += 5;  
         }

         updateTime();
     }
    
})
  
//setting btn click
settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

//settings select
settingsForm.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
})