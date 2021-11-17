/** @format */

const loveMe = document.querySelector('.loveMe');
const times = document.querySelector('#times');

let timesClicked = 0;

// My double click solution
// let lastClickTime = 0;

// loveMe.addEventListener('click', (e) => {
//   let thisClickTime = Date.now();
//   if (thisClickTime - lastClickTime <= 800) {
//     console.log('Was a double click');
//   }
//   lastClickTime = thisClickTime;
// });

// His double click solution
let clickTime = 0;

loveMe.addEventListener('click', (e) => {
  if (clickTime === 0) {
    clickTime = new Date().getTime();
  } else {
    if (new Date().getTime() - clickTime < 800) {
      createHeart(e);
      clickTime = 0;
    } else {
      clickTime = new Date().getTime();
    }
  }
});

const createHeart = (e) => {
  const heart = document.createElement('i');
  heart.classList.add('fas', 'fa-heart'); // He used 2 lines
  const x = e.clientX;
  const y = e.clientY;
  const leftOffset = e.target.offsetLeft;
  const topOffset = e.target.offsetTop;

  const xInside = x - leftOffset;
  const yInside = y - topOffset;

  heart.style.top = `${yInside}px`;
  heart.style.left = `${xInside}px`;
  loveMe.appendChild(heart);
  // setTimeout(()=> {loveMe.removeChild(heart)}, 1000); // my solo attempt, which worked
  setTimeout(() => heart.remove(), 1000);

  times.innerHTML = ++timesClicked;
};
