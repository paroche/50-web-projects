/** @format */

const textEl = document.getElementById('text');
const speedEl = document.getElementById('speed');
const text = 'We Love Programming';
let idx = 1;

const speedBase = 300; // Amount to divide by DOM speed value var to get ms
let speed = speedBase / speedEl.value;


writeText();

function writeText() {
  textEl.innerText = text.slice(0, idx);
  idx++;

  if (idx > text.length) {
    idx = 1;
  }

  setTimeout(writeText, speed);
}

speedEl.addEventListener('input', (e) => {
  speed = speedBase / e.target.value
});

