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
let restarts = 0;

// window.addEventListener('load', runAnimation); // having it on load is unnecessary, was an attempt to make it work more consistently in ifram
resetDOM();
runAnimation();
body.addEventListener('click', (e)=> refresh(e));
// playButton.addEventListener('click', restart); // This is redundant, refresh() will run restart if click is on button


function resetDOM() {
  counter.classList.add('hide');
  goMessage.classList.add('hide');
  playContainer.classList.add('show');
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
      } else {showGo(); setTimeout(showButton, 2500)}
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
  playContainer.classList.remove('show');
}

function showButton() {
  // numContainer.classList.add('hide');
  playContainer.classList.add('show');
}

function restart() {
  restarts++; // no longer used
  resetDOM();
  // location.reload(); // below not working consistently in iframe. But in Firefox this was causing a hiccup
  // if ((window.frameElement != null) && (restarts % 3 == 0)) location.reload(); // force restart on 3rd click of button in iframe
  runAnimation();
}

function refresh(e) { 
  if (e.target === playButton) {
    restart();
  } else {
    if (window.frameElement != null) setTimeout(()=> location.reload(), 700); // For iFrame, reload whole page. Delay so won't execute single click event until after doubleclick processed
    else showButton();
 }}