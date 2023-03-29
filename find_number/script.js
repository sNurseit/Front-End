function createSecretNumber() {
  return Math.trunc(Math.random() * 20) + 1;
}

let secretNum = createSecretNumber(); 
let score = 20;
let highScore=0;

let playerScore = document.querySelector('.score');
let inputNumber = document.querySelector('.input-number');
let checkBtn = document.querySelector('.check');
let againBtn = document.querySelector('.again');
let message = document.querySelector('.message');
let body_s = document.querySelector('body');
let docHighScore = document.querySelector('.highscore');
let correct_num = document.querySelector('.corr-num');

const checkNumber = function(num){

  if (num<0 || num>20) {
    message.innerHTML = "Plese Enter a Number between 1 and 20";
  }
  else {
    if (num==secretNum) {
      if (score > highScore){
        highScore = score;
        docHighScore.innerHTML = highScore;
      }
      message.innerHTML = "Correct Number";
      body_s.style.backgroundColor = '#60b347';
      correct_num.innerHTML = score;
      console.log("Correct number")
    }
    else {
      score-=1;
      if (num<secretNum){message.innerHTML = "Too low";}
      else if (num>secretNum){message.innerHTML = "Too high";}
    }
    playerScore.innerHTML = score;
  }
  
}

checkBtn.addEventListener('click', function () {
  checkNumber(inputNumber.value);
  console.log(inputNumber.value);
  console.log(secretNum);
});

againBtn.addEventListener('click', function () {
  secretNum = createSecretNumber(); 
  score = 20;
  body_s.style.backgroundColor = '#4C3434';
  correct_num.innerHTML = "?";
  message.innerHTML = "Start Catching...";
});


















