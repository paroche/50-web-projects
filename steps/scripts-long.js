const progress = document.getElementById('progress');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const circles = document.querySelectorAll('.circle');

let currentActive = 1;
next.disabled = false;
prev.disabled = true;

next.addEventListener('click', () => {
  currentActive++;
  // if (currentActive > 1) {
  //   prev.disabled = false;
  // }
  if(currentActive >= circles.length) {
    currentActive=circles.length;
    // next.disabled = true;
  };
  update();
})

prev.addEventListener('click', () => {
  currentActive--;
  if(currentActive < 1) {
    currentActive=1;
  };
  // if (currentActive < 2) {
  //   prev.disabled = true;
  // };
  // if (currentActive < circles.length) {
  //   next.disabled = false;
  // }
  update();
})

function update() {
  circles.forEach((circle, idx) => {
    if(idx < currentActive) {
      circle.classList.add('active')
    } else {
      circle.classList.remove('active');
    }
  })

  const actives = document.querySelectorAll('.active');
  progress.style.width = (((actives.length -1) / (circles.length -1))*100) + '%';

  /* His. Replaces my original embedded code remmed out above. But assumes correct values to start, I think */
  // if(currentActive === 1) {
  //   prev.disabled = true;
  // } else if (currentActive === circles.length) {
  //   next.disabled = true
  // } else {
  //   prev.disabled = false;
  //   next.disabled = false;
  // }
 
  /* my version, self-correcting */
  if(currentActive === 1) {
    prev.disabled = true;
    next.disabled = false;
  } else if (currentActive === circles.length) {
    prev.disabled = false;
    next.disabled = true
  } else {
    prev.disabled = false;
    next.disabled = false;
  }
}
