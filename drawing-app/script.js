/** @format */
/*
 Issues: decrease button sometimes has visible background after you change the background color. At least in Chrome
 to do: trying changing eraser to use ctx.globalCompositeOperation = 'destination out' as per:
 https://dilshankelsen.com/creating-an-eraser-for-html5-canvas/
 */
const canvas = document.getElementById('canvas');
const increaseBtn = document.getElementById('increase');
const decreaseBtn = document.getElementById('decrease');
const sizeEl = document.getElementById('size');
const colorEl = document.getElementById('color');
const backgroundColorEl = document.getElementById('backgroundColor');
const eraserEl = document.getElementById('eraser');
const eraserSliderEl = document.getElementById('eraser-size-slider');
const eraserLabelEl = document.getElementById("eraser-label");

const clearEl = document.getElementById('clear');

const ctx = canvas.getContext('2d');

let size = 10;
let isPressed = false;
let color = '#000000';
let backgroundColor = '#FFFFFF';
let saveColor = color;
let erasing = false;
let eraserSize = 5;
let x;
let y;

// Seems to be necessary to update the color box in the color picker icons w/ current colors
updateColorPickers();
// In Firefox, slider knob won't automatically reset, so:
updateEraserSlider();

canvas.addEventListener('mousedown', (e) => {
  isPressed = true;
  x = e.offsetX;
  y = e.offsetY;
});

canvas.addEventListener('mousemove', (e) => {
  if (isPressed) {
    const x2 = e.offsetX;
    const y2 = e.offsetY;
    if (!erasing) {
      drawCircle(x2, y2);
      drawLine(x, y, x2, y2);
      x = x2;
      y = y2;
    } else {
      ctx.clearRect(x2, y2, eraserSize, eraserSize);
    }
  }
});

canvas.addEventListener('mouseup', (e) => {
  isPressed = false;
  x = undefined;
  y = undefined;
});

canvas.addEventListener('dblclick', (e) => {
  const c = ctx.getImageData(e.offsetX, e.offsetY, 1, 1).data;
  color = '#' + rgbToHex(c[0], c[1], c[2]);
  if (c[0]==0 && c[1]==0 && c[2]==0 && c[3]==0) {
    color = backgroundColor; // if rgba is all zeros, is background?
  }
  updateColorPickers();
  notErasing();
});

function rgbToHex(r, g, b) {
  return ('000000' + ((r << 16) | (g << 8) | b).toString(16)).slice(-6);
}

function areErasing() {
  eraserEl.classList.add('active');
  erasing = true;
}

function notErasing() {
  eraserEl.classList.remove('active');
  erasing = false;
}

function drawCircle(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2); // Outer circle
  ctx.fillStyle = color;
  ctx.fill();
}

function drawLine(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = size * 2;
  ctx.stroke();
}

function updateSizeOnScreen() {
  sizeEl.innerText = size;
}

function updateColorPickers() {
  colorEl.value = color
  backgroundColorEl.value = backgroundColor;
}

function updateEraserSlider() {
  eraserSliderEl.value = eraserSize;
}

colorEl.addEventListener('change', (e) => {
  color = e.target.value;
  updateColorPickers();
  notErasing();
});

backgroundColorEl.addEventListener('change', (e) => {
  backgroundColor = e.target.value;
  updateColorPickers();
  canvas.style.backgroundColor = backgroundColor;
});

increaseBtn.addEventListener('click', (e) => {
  // size += 5;
  // if (size > 50) {
  //   size = 50;
  // }
  size = Math.min(size + 5, 50);
  updateSizeOnScreen();
});

decreaseBtn.addEventListener('click', (e) => {
  // size -= 5;
  // if (size < 5) {
  //   size = 5;
  // }
  size = Math.max(size - 5, 5);
  updateSizeOnScreen();
});

eraserEl.addEventListener('click', (e) => {
  // Old method drawing over w/ current background color. If change background color will show old erasures
  // if (!erasing) {
  //   erasing = true;
  //   // saveColor = color;
  //   // color = backgroundColor;
  // } else {
  //   erasing = false;
  //   // color = saveColor;
  // }
  // eraserEl.classList.toggle('active');

  // clearRect method. Jagged on diagonals, but really erases:
  if (!erasing) {areErasing()} else {notErasing()};
});

eraserSliderEl.oninput = function() {
 eraserSize = this.value;
 eraserLabelEl.innerText = "Eraser: " + eraserSize;
}

clearEl.addEventListener('click', (e) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// ***** Popup script from Portfolio.html
/*
let popupDiv;

      document.onmouseover = function(event) {

        let targetDiv = event.target.closest('.project-tile');

        let targetA = event.target.closest('.udemy-link');

        if (!targetDiv && !targetA) return;

        targetElem = targetDiv || targetA;

        // ...create the popup element
        popupDiv = document.createElement('div');
        popupDiv.id = 'popup';
        popupDiv.className = 'popup-before';
        let popupHtml;
        let popupUnder = false;
        let waitTime;

        if (targetA) {
          // for Udemy links
          popupHtml = 'If you want to know more about what this course teaches, click here to see the tutorial site on Udemy, then scroll down and click on: <span class="underline bold">+ See More</span>.';
          popupUnder = true;
          waitTime = 200;

        } else {
          // For tile descriptions
          let tileDescContent = targetDiv.dataset.tiledesc;
          if (!tileDescContent) return;

          switch (tileDescContent) {
            case "fictional-university":
              popupHtml = "Currently my version of this site is not hosted online.";
              break;
            case "tribute":
              popupHtml = 'We were given the assignment of creating a "Tribute Page". I chose Eratosthenes because I was always impressed with his calculation of the diameter of the Earth.';
              break;
            case "survey":
              popupHtml = "A survey page, to practice forms and the like. If you vist the page (just click on the image!), be sure to hover over the submit button for 10 seconds or so.";
              break;
            case "landing":
              popupHtml = 'My solution for the "Product Landing Page" project. Familiarity with the lyrics to Simon and Garfunkle\'s "The Big Bright Green Pleasure Machine" is helpful for appreciating the subtle inside references.';
              break;
            case "techdoc":
              popupHtml = 'We were asked to create a page of technical documentation. I chose to describe the various ways to center text and images, horizontally and vertically, in HTML and CSS. A useful reference.';
              break;
            case "portfolio":
              popupHtml = "Even this page, or at least it's primitive prototype, was an FCC project. Though of course this particular site isn't totally static -- messages like this one are brought to you courtesy of JavaScript.";
              break;
          }
          waitTime = 1000;
        }

        popupDiv.innerHTML = popupHtml;
        document.body.append(popupDiv);

        setTimeout(() => {
          let tileDesc = document.getElementById('popup');
          // console.log(tileDesc);
          if (tileDesc) tileDesc.classList.add('popup-after');
        }, waitTime)


        // position it above the annotated element (top-center)
        let coords = targetElem.getBoundingClientRect();

        let left = coords.left + (targetElem.offsetWidth - popupDiv.offsetWidth) / 2;
        left = Math.max(left, 15); //

        let top = coords.top - popupDiv.offsetHeight - 5;
        if (top < 0 || popupUnder) { // if crossing the top window edge, show below instead
          top = coords.top + targetElem.offsetHeight + 5;
        }

        popupDiv.style.left = left + 'px';
        popupDiv.style.top = top + 'px';
      };

      document.onmouseout = function(e) {
        if (popupDiv) {
          popupDiv.remove();
          popupDiv = null;
        }
      };

  */
