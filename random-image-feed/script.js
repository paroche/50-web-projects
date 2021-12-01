/** @format */

const container = document.getElementById('container');
const bradContainer = document.querySelector('.container');

const unsplashURL = 'https://source.unsplash.com/random/';

// Mine (adjusted to use same common vars as Brad's)
const images = 24;

for (let i = 0; i < images; i++) {
  const imageEl = document.createElement('img');
  imageEl.src = getRandomImage(i);
  imageEl.classList.add('image');
  container.appendChild(imageEl);
  // I added dblclick on image to generate new random image
  imageEl.addEventListener('dblclick', () => {
    imageEl.classList.add('transparent');
    setTimeout( () => {
      imageEl.src = getRandomImage(randomNum(1000)+images); // this seems to happen asynchronously, so transparent ends before new image appears
      imageEl.classList.remove('transparent');
    },200)
  });
}

function getRandomImage(i) {
  // took out Brand's size params, just use simple index. Seems to be faster. Maybe.
  // let w = 250 + Math.floor(Math.random() * 100);
  // let h = 250 + Math.floor(Math.random() * 100);
  // const randImage = unsplashURL + w + 'x' + h;
  // const randImage = unsplashURL + "?sig=" + Math.floor(Math.random() * 10000); // this gives a lot of duplicates!
  const randImage = unsplashURL + "/" + i;
  return randImage;
}

// The below doesn't work
async function getRandomImageAsync(i) {
  const randImage = await unsplashURL + "/" + i;
  return randImage;
}

function randomNum(max) {
  return Math.floor(Math.random() * max);
}
// async function getRandomImageAsync() {
//   let w = 250 + Math.floor(Math.random() * 100);
//   let h = 250 + Math.floor(Math.random() * 100);
//   const randImageRaw = await fetch(unsplashURL + w + 'x' + h);
//   // const randImage = await randImageRaw.json();
//   return randImageRaw;
// }

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
