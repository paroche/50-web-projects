/** @format */

// console.log("*********************** in animated countdown script.js");
const body = document.querySelector('body');
const numContainer = document.getElementById('num-container');
const nums = document.getElementById('nums');
const numSpans = document.querySelectorAll('#nums span');
const counter = document.querySelector('.counter');
// const startMessage = document.querySelector('.start');
const goMessage = document.getElementById('go');
const playContainer = document.getElementById('play');
const playButton = document.querySelector('#play button');
let ranAnimation = false;

// window.addEventListener('load', runAnimation); // having it on load is unnecessary, was an attempt to make it work more consistently in ifram
resetDOM();
runAnimation();
body.addEventListener('click', (e)=> refresh(e));
// playButton.addEventListener('click', restart);


function resetDOM() {
  counter.classList.add('hide');
  goMessage.classList.add('hide');
  play.classList.add('show');
  numSpans.forEach((num) => {
    num.classList.value = '';
    num.classList.remove('in'); // sometimes in iframe doesn't reset properly
    num.classList.remove('out'); // ""
  });
  numSpans[0].classList.add('in');
}

function runAnimation() {
  // console.log("***** Running animated countdown animation. numSpans.length=",numSpans.length);
  hideButton();
  counter.classList.remove('hide');
  numContainer.classList.remove('hide');
  const lastIdx = numSpans.length - 1; // He had this in the forEach loop. Seems sub-optimal. Makes the last # (0) not rotate out, but just disappear
  numSpans.forEach((num, idx) => {
    num.addEventListener('animationend', (e) => {
      if (e.animationName === 'goIn' && idx !== lastIdx) {
        num.classList.remove('in');
        num.classList.add('out');
      } else if (e.animationName == 'goOut' && num.nextElementSibling) {
        num.nextElementSibling.classList.add('in');
      } else {showGo(); setTimeout(showButton, 1000)}
    });
  });
  ranAnimation=true;
}

function showGo() {
  numContainer.classList.add('hide');
  nums.classList.add('hide');
  goMessage.classList.remove('hide');
}

function hideButton() {
  play.classList.remove('show');
}
function showButton() {
  // numContainer.classList.add('hide');
  play.classList.add('show');
}

function restart() {
  resetDOM();
  // location.reload(); // below not working consistently in iframe. But in Firefox this was causing a hiccup
  runAnimation();
}

function refresh(e) {
  if (e.target != playButton) showButton();
  else restart();
}