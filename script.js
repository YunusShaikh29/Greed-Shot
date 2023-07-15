'use strict';

const firstPlayerEl = document.getElementById(`player--0`);
const secondPlayerEl = document.getElementById(`player--1`);



const shooterEl = document.querySelector('.shooter_container');
const laserEl = document.querySelector('.laser')

const firstPlayerOverallScoreEl = document.getElementById('overall_score--0');
const secondPlayerOverallScoreEl = document.getElementById('overall_score--1');
const firstPlayerCurrentScoreEl = document.getElementById('current_score--0');
const secondPlayerCurrentScoreEl = document.getElementById('current_score--1');


const addCurrScoreEl = document.querySelectorAll('.add_curr_score');
const addCurrScoreEl1 = document.getElementById('add_curr_score--0');
const addCurrScoreEl2 = document.getElementById('add_curr_score--1');


const restartBtnEl = document.querySelector('.restart_btn');

const pointsEl = document.querySelectorAll('.popup');

//Application Data:
let overallScore = [0, 0];
let activePlayerCurrentScore = 0,
    gameWinScore = 50,
    gameOver = false,
    activePlayer = 0; // it will check which player is active

const invalidScore = [1, 5, 10];

//Utility functions:
const generateRandomNumber = (min, max) => Math.trunc(Math.random() * (max - min) + min) + 1;

const handlePopup = (randomNum, className) => {
    pointsEl[pointsEl.length - randomNum].classList.add(className);
}

const handlePopupReset = () =>{
    for(let i = 0; i<pointsEl.length; i++){
        pointsEl[i].classList.remove('shakeAnimate','translateAbove','translateBelow');
    }
}

const handleLaserWidth = (width) =>{
    laserEl.style.width = `${width * 100}px`;
}

const init = function () {
    // activePlayer = 0;
    firstPlayerOverallScoreEl.textContent =
        secondPlayerOverallScoreEl.textContent =
        firstPlayerCurrentScoreEl.textContent =
        secondPlayerCurrentScoreEl.textContent =
        '0';
    // overallScore[0] = overallScore[1] = 0;
    // same way for this:
    overallScore = [0, 0];
    activePlayerCurrentScore = 0;
    activePlayer = 0;
    gameOver = false;
    // gameWinScore = 0;

    handlePopupReset();
    handleLaserWidth(0);

    firstPlayerEl.classList.add('player--active');
    secondPlayerEl.classList.remove('player--active');

    addCurrScoreEl1.classList.remove('isDisabled');
    addCurrScoreEl2.classList.add('isDisabled');

    //after someone's win
    shooterEl.classList.remove('isDisabled');
    firstPlayerEl.classList.remove('winner', 'loser');
    secondPlayerEl.classList.remove('loser', 'winner');
    restartBtnEl.classList.remove('animateUpDown');
}


init();


const handleSwitchPlayer = function () {
    document.getElementById(`current_score--${activePlayer}`).textContent = 0;

    // document.getElementById(`player--${activePlayer}`).classList.remove('player--active');

    // document.getElementById(`player--${activePlayer === 0 ? 1 : 0}`).classList.add('player--active');
    // ⬆️one liner for condition below
    // if(activePlayer === 0){
    //     document.getElementById(`player--1`).classList.add('player--active');
    // }else{
    //     document.getElementById(`player--0`).classList.add('player--active');    
    // }

    firstPlayerEl.classList.toggle('player--active');
    secondPlayerEl.classList.toggle('player--active');

    addCurrScoreEl1.classList.toggle('isDisabled');
    addCurrScoreEl2.classList.toggle('isDisabled');

    // if(activePlayer === 0){
    //     activePlayer =1;
    // }else{
    //     activePlayer = 0;
    // }
    activePlayer = activePlayer === 0 ? 1 : 0;

    activePlayerCurrentScore = 0;
}

const handleGameWin = () => {
    gameOver = true;
    shooterEl.classList.add('isDisabled')
    document.getElementById(`player--${activePlayer}`).classList.add('winner');
    document.getElementById(`player--${activePlayer === 0 ? 1 : 0}`).classList.add('loser');
    restartBtnEl.classList.add('animateUpDown');
}




shooterEl.addEventListener('click', function () {
    const randomlyGeneratedNum = generateRandomNumber(0, 10);
   handleLaserWidth(randomlyGeneratedNum)

    //removing classes for the second time, so they can be applied again
    handlePopupReset();

    if (invalidScore.includes(randomlyGeneratedNum)) {
        handleSwitchPlayer();
        //shake animation
        handlePopup(randomlyGeneratedNum, 'shakeAnimate');
        
    } else {
        activePlayerCurrentScore += randomlyGeneratedNum; //data change
        
        /* activePlayer == 0 ?  firstPlayerCurrentScoreEl.textContent = activePlayerCurrentScore : secondPlayerCurrentScoreEl.textContent = activePlayerCurrentScore; */
        
        document.getElementById(`current_score--${activePlayer}`).textContent = activePlayerCurrentScore; //UI change
        
        // if(activePlayer === 0){
        //     pointsEl[pointsEl.length - randomlyGeneratedNum].classList.add('translateAbove');
        // }else{
        //     pointsEl[pointsEl.length - randomlyGeneratedNum].classList.add('translateBelow');
        // }
        //

        // while calling the handlePopup function, we will pass ternary operator as second argument:
        handlePopup(randomlyGeneratedNum, activePlayer === 0 ? 'translateAbove' : 'translateBelow');
    }

});


const addToOverallScore = () => {
    if(gameOver) return;
    overallScore[activePlayer] += activePlayerCurrentScore
    document.getElementById(`overall_score--${activePlayer}`).textContent = overallScore[activePlayer];

    handlePopupReset();
    handleLaserWidth(0);

    if(overallScore[activePlayer] >= gameWinScore){
        handleGameWin();
    }else{
        handleSwitchPlayer();
    }
    
}


addCurrScoreEl1.addEventListener('click', addToOverallScore)
addCurrScoreEl2.addEventListener('click', addToOverallScore)



restartBtnEl.addEventListener('click', init)