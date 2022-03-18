/** @format */

// console.log("*********************** in animated countdown script.js");
const body = document.querySelector('body');
const nums = document.querySelectorAll('.nums span');
const counter = document.querySelector('.counter');
const finalMessage = document.querySelector('.final');
const replay = document.getElementById('replay');
let ranAnimation = false;

// window.addEventListener('load', runAnimation); // having it on load is unnecessary, was an attempt to make it work more consistently in ifram
runAnimation();
body.addEventListener('click', (e)=> refresh(e));
replay.addEventListener('click', restart);


function resetDOM() {
  counter.classList.remove('hide');
  finalMessage.classList.remove('show');
  nums.forEach((num) => {
    num.classList.value = '';
  });
  nums[0].classList.add('in');
}

function runAnimation() {
  // console.log("***** Running animated countdown animation. nums.length=",nums.length);
  const lastIdx = nums.length - 1; // He had this in the forEach loop. Seems sub-optimal. Makes the last # (0) not rotate out, but just disappear
  nums.forEach((num, idx) => {
    num.addEventListener('animationend', (e) => {
      if (e.animationName === 'goIn' && idx !== lastIdx) {
        num.classList.remove('in');
        num.classList.add('out');
      } else if (e.animationName == 'goOut' && num.nextElementSibling) {
        num.nextElementSibling.classList.add('in');
      } else {showButton()}
    });
  });
  ranAnimation=true;
}

function showButton() {
  counter.classList.add('hide');
  finalMessage.classList.add('show');
}

function restart() {
  resetDOM();
  runAnimation();
}

function refresh(e) {
  if (e.target != replay) showButton;
}