/** @format */

const container = document.getElementById('container');
const bradContainer = document.querySelector('.container');

const unsplashURL = 'https://source.unsplash.com/random/';

// Mine (adjusted to use same common vars as Brad's)
const images = 24;

for (let i = 0; i < images; i++) {
  const imageEl = document.createElement('img');
  imageEl.src = getRandomImage();
  imageEl.classList.add('image');
  container.appendChild(imageEl);
  // I added dblclick on image to generate new random image
  imageEl.addEventListener('dblclick', () => {
    imageEl.classList.add('transparent');
    setTimeout( () => {
      imageEl.src = getRandomImage(); // this seems to happen asynchronously
      imageEl.classList.remove('transparent');
    },200)
  });
}

function getRandomImage() {
  let w = 250 + Math.floor(Math.random() * 100);
  let h = 250 + Math.floor(Math.random() * 100);
  const randImage = unsplashURL + w + 'x' + h;
  return randImage;
}

// Brad's
// const rows = 10;

// for (let i = 0; i< rows * 3; i++) {
//   const img = document.createElement('img');
//   img.src = `${unsplashURL}${getRandomSize()}`;
//   bradContainer.appendChild(img);
// }

// function getRandomSize() {
//   return `${getRandomNr()}x${getRandomNr()}`;
// }

// function getRandomNr() {
//   return Math.floor(Math.random() * 10 + 300);
// }
