/** @format */


const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let domImages = 0;
let imagesLoaded = 0;
let imagesRead = 0;
let photosArray = [];

function setApiUrl(count) {
  const apiKey = 'e2R3VYadBTbPfp-sT10cOFzBKNRLSwX6-mnv0nT-43o';
  return `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
  // return `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&query=elephants`; // This works, if I want to have a query input
}

// Set up for initial UnSplash API load
let imageCount = 3; // for initial load
let apiUrl = setApiUrl(imageCount);

// Check if all images were loaded
function imageLoaded() {
  // console.log('image loaded');
  imagesLoaded++;
  // console.log(imagesLoaded);
  if (imagesLoaded === imagesRead) {
    ready = true;
    loader.hidden = true;
    imageCount = 30; // Once initial load done, bump up # images
    apiUrl = setApiUrl(imageCount);
    // console.log('ready = ', ready);
  }
}

// Helper Function to Set Attributes on DOM
// function setAttributes(element, attributes) {
//   for (const key in attributes) {
//     element.setAttribute(key, attributes[key]);
//   }
// }

// Create Elements for Links & Photos, Add to DOM
function displayPhotos() {
  imagesRead = photosArray.length;
  // console.log('Images Read: ', imagesRead);
  imagesLoaded = 0; // Solution to challenge
  // Run function for each object in photosArray
  photosArray.forEach((photo) => {
    // Create <a> to link to Unsplash

    // My version using template:
    domImages++;
    const imageId = 'img-' + domImages;
    const element = `
      <a href="${photo.links.html}" target='_blank'>
        <img id="${imageId}"
             src="${photo.urls.regular}"
             alt="${photo.alt_description}"
             title="${photo.alt_description}"
             >
      </a>
      `;
    imageContainer.insertAdjacentHTML('beforeend', element);
    const img = document.getElementById(imageId);

    // First draft Code from lesson:
    // const item = document.createElement('a');
    // item.setAttribute('href', photo.links.html);
    // item.setAttribute('target', '_blank');
    // // Create <img> for photo
    // const img = document.createElement('img');
    // img.setAttribute('src', photo.urls.regular);
    // img.setAttribute('alt', photo.alt_description);
    // img.setAttribute('title', photo.alt_description);

    // Code from lesson using helper function:
    // const item = document.createElement('a');
    // setAttributes(item, { href: photo.links.html, target: '_blank' });
    // // Create <img> for photo
    // const img = document.createElement('img');
    // setAttributes(img, {
    //   src: photo.urls.regular,
    //   alt: photo.alt_description,
    //   title: photo.alt_description,
    // });

    // Event Listener, check when each is finished loading
    img.addEventListener('load', imageLoaded);

    // Put <img> inside <a>, then put both inside imageContainer element
    // item.appendChild(img);
    // imageContainer.appendChild(item);
  });
}

// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    // console.log(photosArray);
    displayPhotos();
  } catch (error) {
    // Catch Error Here
  }
}

// Check to see if scrolling near bottom of page, Load more photos
window.addEventListener('scroll', () => {
  // console.log('window.pageYOffset: ', window.pageYOffset);
  // console.log('document.body.offsetHeight:', document.body.offsetHeight);
  // if bottom of page (top of page + page height) w/in 1000px of bottom of document
  if (window.innerHeight + window.pageYOffset >=
      document.body.offsetHeight - 1000 &&
      ready) {
    ready = false;
    getPhotos();
  }
});

// On Load
getPhotos();
