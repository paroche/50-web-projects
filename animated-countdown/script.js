/** @format */

const nums = document.querySelectorAll('.nums span');
const counter = document.querySelector('.counter');
const finalMessage = document.querySelector('.final');
const replay = document.getElementById('replay');

runAnimation();

function resetDOM() {
  counter.classList.remove('hide');
  finalMessage.classList.remove('show');
  nums.forEach((num) => {
    num.classList.value = '';
  });
  nums[0].classList.add('in');
}

function runAnimation() {
  const nextToLast = nums.length - 1; // He had this in the forEach loop. Seems sub-optimal. Also, this is really the LAST index. What is does is makes the last # (0) not rotate out, but just disappear
  nums.forEach((num, idx) => {
    num.addEventListener('animationend', (e) => {
      if (e.animationName === 'goIn' && idx !== nextToLast) {
        num.classList.remove('in');
        num.classList.add('out');
      } else if (e.animationName == 'goOut' && num.nextElementSibling) {
        num.nextElementSibling.classList.add('in');
      } else {
        counter.classList.add('hide');
        finalMessage.classList.add('show');
      }
    });
  });
}

replay.addEventListener('click', () => {
  resetDOM();
  runAnimation();
});
