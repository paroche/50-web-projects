const password = document.getElementById('password');
const background = document.getElementById('background');

password.addEventListener('input', (e) => {
  const input = e.target.value;
  const length = input.length;
  const blurValue = 20 - length * 2;
  background.style.filter = `blur(${blurValue}px)`;
})

// My version. Works
// const backgroundEl = document.getElementById('background');
// const passwordEl = document.getElementById('password');

// password.addEventListener('keydown', () => {
//   const password = passwordEl.value;
//   const blur = 20 - password.length * 2;
//   backgroundEl.style.filter = `blur(${blur}px`;
// })
