// My code before watching video
const button = document.getElementById('btn');
const boxes = document.getElementById('boxes');

button.addEventListener('click', ()=> {
  boxes.classList.toggle('big');
})

// my guess is he will make this a function
for (let row = 0; row<4; row++) {
  for (let column=0; column<4; column++) {
    const box = document.createElement('div');
    box.classList.add('box');
    box.style.backgroundPosition = `${-125*column}px ${-125*row}px`;
    boxes.appendChild(box);
  }
}


// Brad's code

// const boxesContainer = document.getElementById('boxes');
// const btn = document.getElementById('btn');

// btn.addEventListener('click', ()=> boxesContainer.classList.toggle('big')
// )

// function createBoxes() {
// for(let i = 0; i<4; i++) {
//   for(let j = 0; j<4; j++) {
//     const box = document.createElement('div');
//     box.classList.add('box');
//     box.style.backgroundPosition = `${-j*125}px ${-i*125}px`;
//     boxesContainer.appendChild(box);
//   }
// }
// }

// createBoxes();
