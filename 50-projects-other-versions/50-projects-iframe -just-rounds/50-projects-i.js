/** @format */

const projectsEl = document.getElementById('projects');
// const random = document.getElementById('random');
// const headerEl = document.querySelector('.header');
const loader = document.getElementById('loader');
// const loadingRemaining = document.getElementById('loading-remaining');
const fullScreenMessage = document.getElementById('full-screen-message');
const startTime = Date(0);
let disableScroll = false;

// const root = document.documentElement;
// const projectWidth = '600px';
// const iframeWidth = '560px';
// root.style.setProperty("--project-width", projectWidth);

// window.addEventListener('load', ()=> {
//   console.log("in load listener"); // only happens once
// });
// let controller; // for aborting load event listeners

// random.innerText = `Random #: ${Math.floor(Math.random() * 10000)}`; // Was used to show clearly when screen refreshes

function app(dir, description, color, show, popup, color2) {
  this.dir = dir;
  this.description = description;
  this.color = color;
  this.show = show;
  this.popup = popup;
  this.color2 = color2;
}

let apps = [];

// apps.push(new app('3d-boxes-background','3D Boxes Background','#f9ca24',true)); // full saturation made box shadow invisible
apps.push(
  new app(
    '3d-boxes-background',
    '3D Boxes Background',
    'rgba(234,160,36,.7)',
    true
  )
);
apps.push(new app('animated-countdown', '', '', true));
apps.push(new app('animated-navigation', '', '', true));
apps.push(new app('auto-text-effect', '', '', true));
apps.push(new app('background-slider', '', '', true));
apps.push(new app('blury-loading', '', '', true));
apps.push(new app('button-ripple-effect', '', '', true));
apps.push(new app('content-placeholder', '', '', true));
apps.push(new app('custom-range-slider', '', '', true, '', ''));
apps.push(new app('dad-jokes', '', '', true));
apps.push(new app('double-click-heart', '', 'rgb(255,0,0,.5)', true));
apps.push(new app('double-vertical-slider', '', '', true));
apps.push(new app('drag-n-drop', '', '', true));
apps.push(new app('drawing-app', '', '', true));
apps.push(new app('drink-water', '', '', true));
apps.push(new app('event-keycodes', '', '', true));
apps.push(new app('expanding-cards', '', '', true));
apps.push(new app('faq-collapse', 'FAQ Collapse', '', true));
apps.push(new app('feedback-ui-design', 'Feedback UI Design', '', true));
apps.push(new app('form-wave-animation', '', '', true));
apps.push(new app('github-profiles', '', '', true));
apps.push(new app('good-cheap-fast', '', '', true));
apps.push(new app('hidden-search', '', '', true));
apps.push(new app('hoverboard', '', '', true));
apps.push(new app('image-carousel', '', '', true));
apps.push(new app('incrementing-counter', '', '', true));
apps.push(new app('infinite-scroll', '', '', true));
apps.push(
  new app(
    'infinite-scroll-search',
    'Infinite Scroll w/ Hidden Search',
    '',
    true
  )
);
apps.push(new app('insect-catch-game', '', '', true));
apps.push(new app('kinetic-loader', '', '', true));
apps.push(new app('live-user-filter', '', '', true));
apps.push(
  new app(
    '50-projects',
    'Simple Version of This Page<br/>(preferably, use this link)',
    '',
    true
  )
);
apps.push(new app('mobile-tab-navigation', '', '', true));
apps.push(new app('movie-app', '', '', true));
apps.push(new app('netflix-mobile-navigation', '', '', true));
apps.push(new app('notes-app', '', '', true));
apps.push(new app('password-generator', '', '', true));
apps.push(new app('password-strength-background', '', '', true));
apps.push(new app('picture-in-picture', '', '', true));
apps.push(new app('pokedex', 'Pokédex', 'rgb(222,253,240,.5)', true));
apps.push(new app('quiz-app', '', '', true));
apps.push(new app('quote-generator', '', '', true));
// apps.push(new app('quote-generator-fetch-single-quote', '', '', false));
apps.push(new app('random-choice-picker', '', '', true));
apps.push(new app('random-image-feed', '', '', true));
apps.push(new app('rotating-nav-animation', '', '', true));
apps.push(new app('scroll-animation', '', '', true));
apps.push(new app('sound-board', '', '', true));
apps.push(new app('split-landing-page', '', '', true));
apps.push(new app('steps', '', '', true));
apps.push(new app('sticky-navbar', '', '', true));
apps.push(new app('testimonial-box-switcher', '', 'rgb(71,108,244,0.5)', true));
apps.push(new app('theme-clock', '', '', true));
apps.push(new app('toast-notification', '', '', true));
apps.push(new app('todo-list', '', '', true));
apps.push(new app('tv-search', 'TV Search', '', true));
apps.push(new app('verify-account-ui', 'Verify Account UI', '', true));

function generateProjectContainers() {
  // WIP: Separate iContainer builds from iframe builds. Build all containers first, then attach iframes in rounds
  apps.forEach((app, idx) => {
    // async unnecessary -- was for tryihng to show intermediate load results for each project
    ({ dir, description, color, show, popup, color2 } = app);
    if (show) {
      const docFrag = document.createDocumentFragment();

      const iContainer = document.createElement('dir');
      iContainer.id = 'i-container-' + idx;
      iContainer.classList.add('i-container');
      iContainer.classList.add('project');
      iContainer.index = idx.toString;
      containerIds[idx] = iContainer.id;

      const iFrameInnerContainer = document.createElement('div');
      iFrameInnerContainer.classList.add(
        'iframe-box',
        'iframe-inner-container'
      );

      const iFrameFiller = document.createElement('div');
      iFrameFiller.textContent = 'Waiting to Load...';
      iFrameFiller.classList.add('animated-bg', 'iframe-filler');

      const link = document.createElement('a');
      link.href = '../' + dir + '/index.html';
      link.target = '_blank';
      let desc = description || capitalizeWords(dir, '-');
      link.classList.add('link');
      link.innerHTML = desc;

      iFrameInnerContainer.appendChild(iFrameFiller);
      iContainer.appendChild(iFrameInnerContainer);
      iContainer.appendChild(link);
      docFrag.appendChild(iContainer);
      projectsEl.appendChild(docFrag);

      containers++;
    }
  });

}

function generateiFrames(start, end) {
  let iFramesLoadedThisRound = 0;
  for (let idx = start; idx <= end; idx++) {
    const app = apps[idx];
    ({ dir, description, color, show, popup, color2 } = app);
    if (show) {
      // console.log('****** generating iFrame: ' + idx + ' ' + dir); // T
      generateiFrame(idx, dir, description);
    }
  }

  function generateiFrame(idx, dir, description) {
    // Build iframe Box, Replace loading filler, add Event Listener for load
    const iframe = document.createElement('iframe');
    iframe.src = '../' + dir + '/index.html';
    iframe.frameborder = '1';
    iframe.style.visiblity = 'hidden';
    iframe.allowfullscreen = true;
    iframe.classList.add('iframe-box', 'muted');

    const iContainer = document.getElementById(containerIds[idx]);
    const innerContainer = iContainer.querySelector('.iframe-inner-container');
    const filler = iContainer.querySelector('.iframe-filler');

    // disableScroll = true;
    innerContainer.replaceChild(iframe, filler);
    // disableScroll = false;

    iframe.addEventListener('load', (e) => {
      const iFrame = e.target;
      iFrame.classList.remove('muted');
      iFramesLoadedThisRound++;
      iFramesLoaded++;
      iFrameLoaded[idx] = true;
      if (iFramesLoaded === containers) return; // Done
      if (iFramesLoadedThisRound === iFramesPerRound) nextRound(); // When all projects in this round loaded, call next round. Since nextRound calls this function is basicslly a recurrsion callback, I guess
    });
  }
}

function hideLoaderShowProjects() {
  loader.style.opacity='0';
  setTimeout(()=> {
    headerEl.style.visibility = 'visible';
    headerEl.style.opacity='1';
    projectsEl.style.visibility='visible';
    projectsEl.style.opacity='1';
    window.scrollTo(0,0)
  }, 1000);
};

function capitalizeWords(str, sep) {
  // Just used here for converting directory names into titles, if isn't a title given
  const arr = str.split(sep);
  for (let word = 0; word < arr.length; word++) {
    // arr[word] = arr[word].charAt(0).toUpperCase() + arr[word].slice(1);
    arr[word] = arr[word][0].toUpperCase() + arr[word].slice(1);
  }
  return arr.join(' ');
}


// ******** Main code! ********

// Attempt to keep from scrolling on load...
// projectsEl.addEventListener('scroll', ()=> {
//   if (disableScroll) return
  // then what?
// })


// Generate All Containers
const containerIds = new Array(apps.length - 1);
let containers = 0;
generateProjectContainers();
window.scrollTo(0,0);

// Add iframes in rounds
let iFramesLoaded = 0;
const iFrameLoaded = new Array(apps.length - 1);
const projects = apps.length;
// Assign iFrames per Round based on screen width (at least at start of loading), how many projects per row
const screenWidth = window.screen.availWidth; // in px
let iFramesPerRound = 6; // 3/row
if (screenWidth < 1884) iFramesPerRound = 4; // 2/row
if (screenWidth < 1275) iFramesPerRound = 2; // 1/row
// console.log("***** screenWidth: "+screenWidth+"  IFramesPerRound: "+iFramesPerRound);

const rounds =
  Math.floor(projects / iFramesPerRound) + (projects % iFramesPerRound != 0);
let round = 0;
nextRound(); // all other calls will be recursive from generateIFrames() when all iframes have loaded for round

function nextRound() {
  round++;
  if (round > rounds) return;
  const from = (round-1) * iFramesPerRound;
  const thru = Math.min(round * iFramesPerRound -1, projects);
  // console.log("from: "+from+" thru: "+thru);
  generateiFrames(
    (round - 1) * iFramesPerRound,
    Math.min(round * iFramesPerRound - 1, projects)
  );
}

// This isn't working
fullScreenMessage.addEventListener('hover', hideFullScreenMessage);

function hideFullScreenMessage() {
  setTimeout(() => {
    fullScreenMessage.style.opacity = '0';
  }, 1000);
}
