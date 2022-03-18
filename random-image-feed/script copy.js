/** @format */

// Version w/ attempts at asynchonous loading, using UnSplash API, etc.

const container = document.getElementById('container');
// const bradContainer = document.querySelector('.container'); // created separate container below 'container' for Brad's method

const unsplashURL = 'https://source.unsplash.com/random/';
// const apiUrl = setApiUrl(1); // To set up to use UnSplash API rather than just image URL

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
    imageEl.src = getRandomImage(randomNum(1000) + images); // this seems to happen asynchronously, so transparent ends before new image appears
    imageEl.addEventListener('load', () => {
      imageEl.classList.remove('transparent');
    });
  });
}
/*
    setTimeout(() => {
      imageEl.src = getRandomImage(randomNum(1000) + images); // this seems to happen asynchronously, so transparent ends before new image appears
      // imageEl.src = getRandomImageAsync(randomNum(100)); // Gnerates an image like the others, but only a Promise ends up in DOM
      // imageEl.src = getPhotoFromAPI(); // from UnSplash API
      imageEl.addEventListener('load', () => {
        imageEl.classList.remove('transparent');
      });
    }, 200);
  });
}
*/

function getRandomImage(i) {
  // took out Brand's size params, just use simple index. Seems to be faster. Maybe.
  // let w = 250 + Math.floor(Math.random() * 100);
  // let h = 250 + Math.floor(Math.random() * 100);
  // const randImage = unsplashURL + w + 'x' + h;
  // const randImage = unsplashURL + "?sig=" + Math.floor(Math.random() * 10000); // this gives a lot of duplicates!
  const randImage = unsplashURL + '/' + i;
  // console.log('from getRandomImage(): ', randImage);
  return randImage;
}

// The below doesn't work. Image logged to console is valid link, but a Promise is put in DOM
// async function getRandomImageAsync(i) {
//   const randImage = (await unsplashURL) + '/' + i;
//   console.log('from GetRandomImageAsync(): ', randImage); // This is fine, but what ends up in DOM is a Promise
//   return randImage;
// }

// function setApiUrl(count) {
//   const apiKey = 'e2R3VYadBTbPfp-sT10cOFzBKNRLSwX6-mnv0nT-43o';
//   return `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
// }

// // Get photos from Unsplash API
// async function getPhotoFromAPI() {
//   try {
//     const response = await fetch(apiUrl);
//     photosArray = await response.json();
//     console.log(photosArray.length);
//     console.log(photosArray[0]);
//     const photoUrl = photosArray[0].urls.regular; // for this app, just using 1 photo
//     console.log('from getPhotoFromAPI(): ', photoUrl); // This is a clickable image link that works. But what ends up in DOM is a promise
//     return photoUrl;
//   } catch (error) {
//     // Catch Error Here
//   }
// }

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
