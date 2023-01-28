/** @format */

const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

const search = document.querySelector('.search');
const btn = document.querySelector('.btn');
const input = document.querySelector('.input');

// Neither of these worked. But clearing my Chrome cache did. Then it didn't. Then rebooting modem worked.
// const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
// const proxyUrl = 'https://immense-mesa-50556.herokuapp.com/';
const proxyUrl = '';

// Init
let apiUrl;
let ready = false;
let domImages = 0;
let imagesLoaded = 0;
let imagesRead = 0;
let photosArray = [];
loader.hidden = false; // if want to ever see loader. Currently am hiding it as soon as 1 image has loaded.

const initialImageCount = 3; // for initial load
let imageCount = initialImageCount;
let query = '';
let prevQuery = '';

// Event Listeners
btn.addEventListener('click', () => {
  if (search.classList.contains('active')) {
    // && query && query !== prevQuery) {
    doQuery();
  }
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
  if (e.keyCode == 13) {
    // console.log(query, ' ', prevQuery);
    if (query !== prevQuery) {
      doQuery();
    }
  }
});

// Check to see if scrolling near bottom of page, Load more photos
window.addEventListener('scroll', () => {
  // if bottom of page (top of page + page height) w/in 1000px of bottom of document:
  if (
    window.innerHeight + window.pageYOffset >=
      document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

// Functions

function setApiUrl(count) {
  const apiKey = 'e2R3VYadBTbPfp-sT10cOFzBKNRLSwX6-mnv0nT-43o';
  apiUrl =
    proxyUrl +
    `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
  if (query) apiUrl += `&query=${query}`;
}

function doQuery() {
  imageContainer.innerHTML = null;
  prevQuery = query;
  setApiUrl(initialImageCount);
  showLoader();
  getPhotos();
}

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  hideLoader(); // Remove loader if even 1 image loads. Seems better. Otherwise is over 1st image while others are loading.
  if (imagesLoaded === imagesRead) {
    ready = true;
    // hideLoader(); // If want to wait until all images loaded
    imageCount = 30; // Once initial load done, bump up # images
    setApiUrl(imageCount);
  } else {
    if (imagesRead) {
      const newFilter = `blur(${5 * (imagesLoaded / imagesRead)}px)`;
      loader.style.filter = newFilter; // make loader fade
    }
  }
}

function showLoader() {
  loader.classList.remove('hidden'); // in case using this
  loader.hidden = false;
}

function hideLoader() {
  loader.hidden = true; // abupt. Otherwise...
  // loader.classList.add('hidden'); // w/ this, loader fades out while image is already displayed
}

// Create Elements for Links & Photos, Add to DOM
function displayPhotos() {
  imagesRead = photosArray.length;
  imagesLoaded = 0;
  photosArray.forEach((photo, idx) => {
    // setTimeout(addPhotoToDOM, 1000 * idx);
    addPhotoToDOM();
    function addPhotoToDOM() {
      // console.log(imagesLoaded);
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
      img.addEventListener('load', imageLoaded);
    }
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
    console.log(apiUrl);
    console.log('error in getPhotos()');
    console.log(error);
    console.log(apiUrl);
    // Catch Error Here
  }
}

// On Load
setApiUrl(imageCount);
getPhotos();
