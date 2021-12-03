/** @format */

const container = document.getElementById('container');
const unsplashURL = 'https://source.unsplash.com/random/';
const images = 24;

function addImagesToDOM() {
  for (let i = 0; i < images; i++) {
    const imageEl = document.createElement('img');
    imageEl.src = getRandomImage(i);
    imageEl.classList.add('image');
    container.appendChild(imageEl);
    // I added dblclick on image to generate new random image
    imageEl.addEventListener('dblclick', () => {
      imageEl.classList.add('transparent');
      imageEl.src = getRandomImage(randomNum(1000) + images); 
      // Apparently have to wait for DOM to report image is loaded before going on:
      imageEl.addEventListener('load', () => {
        imageEl.classList.remove('transparent');
      });
    });
  }
}
  
function getRandomImage(i) {
  let randImage = unsplashURL + '/' + i;
  // randImage += "&query=elephants"; // doesn't work
  console.log(randImage);
  return randImage;
}

function randomNum(max) {
  return Math.floor(Math.random() * max);
}

// **** Main ****

addImagesToDOM();


// Brad's
// const bradContainer = document.querySelector('.container'); // created separate container below 'container' for Brad's method

// const rows = 10;

// for (let i = 0; i< rows * 3; i++) {
//   const img = document.createElement('img');
//   img.src = `${unsplashURL}${getRandomSize()}`;
//   bradContainer.appendChild(img);
// }

// function getRandomImage(i) {
  // let w = 250 + Math.floor(Math.random() * 100);
  // let h = 250 + Math.floor(Math.random() * 100);
  // const randImage = unsplashURL + w + 'x' + h;
  // const randImage = unsplashURL + "?sig=" + Math.floor(Math.random() * 10000); // this gives a lot of duplicates!
  // const randImage = unsplashURL + '/' + i;
  // console.log('from getRandomImage(): ', randImage);
  // return randImage;
//}
// function getRandomSize() {
//   return `${getRandomNr()}x${getRandomNr()}`;
// }

// function getRandomNr() {
//   return Math.floor(Math.random() * 10 + 300);
// }
