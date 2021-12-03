/** @format */

const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

const search = document.querySelector('.search');
const btn = document.querySelector('.btn');
const input = document.querySelector('.input');

// Init
let apiUrl;
let ready = false;
let domImages = 0;
let imagesLoaded = 0;
let imagesRead = 0;
let photosArray = [];
// Set up for initial UnSplash API load
const initialImageCount = 3;
let imageCount = initialImageCount; // for initial load
//
// Search input
let query = '';
let prevQuery = '';

btn.addEventListener('click', () => {
  if (search.classList.contains('active')) { // && query && query !== prevQuery) {
    doQuery();}
  
    search.classList.toggle('active');
    if (search.classList.contains('active')) {
      input.type = 'text';
      input.value = prevQuery;
      input.placeholder = 'Search...';
      input.focus();
    } else {
      input.placeholder = '';
      input.value = '';
    }
  
});

input.addEventListener('input', () => {
  query = input.value;
});

input.addEventListener('keypress', (e) => {
  // console.log(e.keyCode);
  if (e.keyCode == 13) {
    console.log(query," ",prevQuery);
    if (query !== prevQuery) {
      doQuery();
    }
  }
});

function doQuery() {
  imageContainer.innerHTML = null;
  prevQuery = query;
  setApiUrl(initialImageCount);
  getPhotos();


}

setApiUrl(imageCount);
getPhotos();
// ** End Search

function setApiUrl(count) {
  const apiKey = 'e2R3VYadBTbPfp-sT10cOFzBKNRLSwX6-mnv0nT-43o';
  apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
  if (query) apiUrl += `&query=${query}`;
  return apiUrl;
  // return `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&query=${query}`; // This works, if I want to have a query input
}

// Check if all images were loaded
function imageLoaded() {
  // console.log('image loaded');
  imagesLoaded++;
  console.log(imagesLoaded);
  if (imagesLoaded === imagesRead) {
    ready = true;
    loader.hidden = true;
    imageCount = 30; // Once initial load done, bump up # images
    apiUrl = setApiUrl(imageCount);
    // console.log('ready = ', ready);
  }
}

// Helper Function to Set Attributes on DOM
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create Elements for Links & Photos, Add to DOM
function displayPhotos() {
  imagesRead = photosArray.length;
  console.log('Images Read: ', imagesRead);
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
    console.log(apiUrl);
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    // console.log(photosArray);
    displayPhotos();
  } catch (error) {
    console.log('error in getPhotos()');
    console.log(error);
    console.log(apiUrl);
    // Catch Error Here
  }
}

// Check to see if scrolling near bottom of page, Load more photos
window.addEventListener('scroll', () => {
  // console.log('window.pageYOffset: ', window.pageYOffset);
  // console.log('document.body.offsetHeight:', document.body.offsetHeight);
  // if bottom of page (top of page + page height) w/in 1000px of bottom of document
  if (
    window.innerHeight + window.pageYOffset >=
      document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

// On Load
setApiUrl(imageCount);
getPhotos();
