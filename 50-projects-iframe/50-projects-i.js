/** @format */

const projectsEl = document.getElementById('projects');
// const random = document.getElementById('random');
const headerEl = document.querySelector('.header');
const loader = document.getElementById('loader');
const fullScreenMessage = document.getElementById('full-screen-message');

const root = document.documentElement;
const projectWidth = '600px';
const iframeWidth = '560px';
root.style.setProperty("--project-width", projectWidth);

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
apps.push(new app('50-projects', 'Simple Version of This Page<br/>(preferably, use this link)', '', true));
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
apps.push(new app('quote-generator-fetch-single-quote', '', '', false));
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
apps.push(new app('verify-account-ui', 'Verify Account UI', '', true));

function generateProjects() {
  apps.forEach((app, idx) => {
    ({ dir, description, color, show, popup, color2 } = app);
    if (show) {
      // Build iframe Box
      const docFrag = document.createDocumentFragment();

      const iContainer = document.createElement('dir');
      iContainer.classList.add('i-container');
      iContainer.classList.add('project');
      iContainer.index = idx.toString;

      const iframe = document.createElement('iframe');
      iframe.src = '../' + dir + '/index.html';
      iframe.frameborder = '1';
      // iframe.width = iframeWidth;
      // iframe.height = iframeWidth;
      iframe.allowfullscreen = true;

      const link = document.createElement('a');
      link.href = '../' + dir + '/index.html';
      link.target = "_blank";
      let desc = description || capitalizeWords(dir, '-');
      link.classList.add('link');
      link.innerHTML = desc;

      iContainer.appendChild(iframe);
      iContainer.appendChild(link);
      docFrag.appendChild(iContainer);
      projectsEl.appendChild(docFrag);
    }
    if (idx >= apps.length-1) addLoadListener(); // After last frame added, listen for load event to make screen visible
  });
}

function addLoadListener() {
  window.addEventListener('load', ()=> {
    projectsEl.style.visibility='visible';
    // ready = true;
    loader.hidden = true;
    window.scrollTo(0,0)
  });
}

function capitalizeWords(str, sep) {
  const arr = str.split(sep);
  for (let word = 0; word < arr.length; word++) {
    arr[word] = arr[word].charAt(0).toUpperCase() + arr[word].slice(1);
  }
  return arr.join(' ');
}

// function randomColor() {
//   let r,g,b;
//   getRGB();
//   // favoring less white
//   while (r+g+b > 370) {
//     getRGB();
//   }
//   const a = 0.5;
//   const color = `rgba(${r},${g},${b},${a})`;
//   return color;

//   function getRGB() {
//     r = Math.floor(Math.random() * 255);
//     g = Math.floor(Math.random() * 255);
//     b = Math.floor(Math.random() * 255);
//   }
// }

// Main code!
generateProjects();

// This isn't working
fullScreenMessage.addEventListener('hover', hideFullScreenMessage);

function hideFullScreenMessage() {
  setTimeout(() => {fullScreenMessage.style.opacity="0"}, 1000);
}

// window.scroll();
// document.documentElement.scrollIntoView();

// Event Listeners

// projectsEl.addEventListener('click', (e) => {
//   const element = e.target;
//   if (element.tagName == 'A') {
//     const project = element.closest('.project');
//     const projectInner = element.closest('.project-inner');
//     if (project) {
//       project.classList.add('clicked', 'visited');
//       projectInner.classList.add('clicked', 'visited');
//       sessionStorage.setItem(project.index, 'visited');
//       setTimeout(() => {
//         project.classList.remove('clicked');
//         projectInner.classList.remove('clicked');
//       }, 300);
//     }
//   }
// });

// headerEl.addEventListener('dblclick', () => {
//   sessionStorage.clear();
//   location.reload();
// });

