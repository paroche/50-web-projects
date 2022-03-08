/** @format */
// Switch to full screen in iframe
const elem = document.documentElement;
elem.addEventListener('dblclick', () => {
  if (window.frameElement != null) elem.requestFullscreen();
}); 

const imgs = document.getElementById('imgs');
const leftBtn = document.getElementById('left');
const rightBtn = document.getElementById('right');

const img = document.querySelectorAll('#imgs img');

let idx = 0;

let interval;

startSlide();

function startSlide() {
  if (interval) clearInterval(interval);
  interval = setInterval(run, 2000);
}

function run() {
  idx++;
  changeImage();
}

function changeImage() {
  if (idx < 0) idx = img.length - 1;
  if (idx > img.length - 1) idx = 0;
  imgs.style.transform = `translateX(${-idx * 500}px)`;
}

rightBtn.addEventListener('click', () => {
  idx++;
  changeImage();
  startSlide();
});

leftBtn.addEventListener('click', () => {
  idx--;
  changeImage();
  startSlide();
});

// His code. My version handles this in startSlide()
function resetInterval() {
  clearInterval(interval);
  interval = setInterval(run, 2000);
}
