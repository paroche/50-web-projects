/** @format */

const screens = document.querySelectorAll('.screen');

const start_btn = document.getElementById('start-btn');
const choose_insect_btns = document.querySelectorAll('.choose-insect-btn');

const game_container = document.getElementById('game-container');
const timeEl = document.getElementById('time');
const scoreEl = document.getElementById('score');
const message = document.getElementById('message');

let seconds = 0;
let score = 0;
let selected_insect = {};

screens.forEach((screen) => {
  screen.classList.remove('up');
});

start_btn.addEventListener('click', () => {
  screens[0].classList.add('up');
});

choose_insect_btns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const img = btn.querySelector('img');
    // const srcMine = img.src;
    // const insect_name = btn.querySelector('p').innerText;
    const src = img.getAttribute('src');
    const alt = img.getAttribute('alt');
    // console.log(srcMine, src);
    // console.log(srcMine == src); // true
    selected_insect = { src, alt };
    screens[1].classList.add('up');
    setTimeout(createInsect, 1000);
    startGame();
  });
});

function startGame() {
  setInterval(increaseTime, 1000);
}

function increaseTime() {
  let m = Math.floor(seconds / 60);
  let s = seconds % 60;
  m = m < 10 ? `0${m}` : m;
  s = s < 10 ? `0${s}` : s;
  timeEl.innerHTML = `Time: ${m}:${s}`;
  seconds++;
}
function createInsect() {
  const insect = document.createElement('div');
  insect.classList.add('insect');
  const { x, y } = getRandomLocation();
  console.log(selected_insect.src);
  // insect.style.top = y + 'px'; // works
  // insect.style.left = x + 'px'; // works
  insect.style.top = `${y}px`;
  insect.style.left = `${x}px`;
  insect.innerHTML = `<img src="${selected_insect.src}" alt="${
    selected_insect.alt
  }" style="transform: rotate(${Math.random() * 360}deg)" />`;
  insect.addEventListener('click', catchInsect);
  game_container.appendChild(insect);
}

function getRandomLocation() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const x = Math.floor(Math.random() * (width - 200) + 100);
  const y = Math.floor(Math.random() * (height - 200) + 100);
  return { x, y };
}

function catchInsect() {
  increaseScore();
  this.classList.add('caught');
  setTimeout(() => this.remove(), 2000);
  addInsects();
}

function addInsects() {
  setTimeout(createInsect, 1000);
  setTimeout(createInsect, 1500);
}

function increaseScore() {
  score++;
  if (score > 9) {
    message.classList.add('visible');
  }
  scoreEl.innerText = `Score: ${score}`;
}
