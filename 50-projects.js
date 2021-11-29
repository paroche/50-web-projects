const projectsEl = document.getElementById("projects");
const random = document.getElementById('random');
const headerEl = document.querySelector('.header');

random.innerText = `Random #: ${Math.floor(Math.random()*10000)}`; // proves reruns script when you return from project
/*
To preserve classes and states of DOM, may have to use local storage. But then would have to check to make sure
that the app list hasn't changed. Could just store its length, should be enough
Would have to be part of event listeners to store, project generator to restore.
*/


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
apps.push(new app('3d-boxes-background','3D Boxes Background','rgba(234,160,36,.7)',true));
apps.push(new app('animated-countdown','','',true));
apps.push(new app('animated-navigation','','',true));
apps.push(new app('auto-text-effect','','',true));
apps.push(new app('background-slider','','',true));
apps.push(new app('blury-loading','','',true));
apps.push(new app('button-ripple-effect','','',true));
apps.push(new app('content-placeholder','','',true));
apps.push(new app('custom-range-slider','','',true,'',''));
apps.push(new app('dad-jokes','','',true));
apps.push(new app('double-click-heart','','rgb(255,0,0,.5)',true));
apps.push(new app('double-vertical-slider','','',true));
apps.push(new app('drag-n-drop','','',true));
apps.push(new app('drawing-app','','',true));
apps.push(new app('drink-water','','',true));
apps.push(new app('event-keycodes','','',true));
apps.push(new app('expanding-cards','','',true));
apps.push(new app('faq-collapse','FAQ Collapse','',true));
apps.push(new app('feedback-ui-design','Feedback UI Design','',true));
apps.push(new app('form-wave-animation','','',true));
apps.push(new app('github-profiles','','',true));
apps.push(new app('good-cheap-fast','','',true));
apps.push(new app('hidden-search','','',true));
apps.push(new app('hoverboard','','',true));
apps.push(new app('image-carousel','','',true));
apps.push(new app('incrementing-counter','','',true));
apps.push(new app('infinity-scroll','','',true));
apps.push(new app('kinetic-loader','','',true));
apps.push(new app('live-user-filter','','',true));
apps.push(new app('mobile-tab-navigation','','',true));
apps.push(new app('movie-app','','',true));
apps.push(new app('notes-app','','',true));
apps.push(new app('password-generator','','',true));
apps.push(new app('password-strength-background','','',true));
apps.push(new app('picture-in-picture','','',true));
apps.push(new app('pokedex','','',true));
apps.push(new app('quote-generator','','',true));
apps.push(new app('quote-generator-fetch-single-quote','','',false));
apps.push(new app('random-choice-picker','','',true));
apps.push(new app('rotating-nav-animation','','',true));
apps.push(new app('scroll-animation','','',true));
apps.push(new app('sound-board','','',true));
apps.push(new app('split-landing-page','','',true));
apps.push(new app('steps','','',true));
apps.push(new app('sticky-navbar','','',true));
apps.push(new app('theme-clock','','',true));
apps.push(new app('toast-notification','','',true));
apps.push(new app('verify-account-ui','Verify Account UI','',true));

// Project generator
apps.forEach((app, idx) => {
  ({dir, description, color, show, popup, color2 } = app);
  if (show) {
    const box = document.createElement('div');
    const innerBox = document.createElement('div');
    const link = document.createElement('A');
    const idxString = idx.toString();

    box.classList.add('project');
    box.index = idxString;

    innerBox.classList.add('project-inner');
    innerBox.style.backgroundColor = color || randomColor();
    link.href = "./"+dir+"/index.html";
    // link.target = "_blank"; // temp, for testing
    let desc = description || capitalizeWords(dir, '-');
    link.classList.add('link');
    link.innerText = desc;
    
    const storedClass = sessionStorage.getItem(idxString);
    if (storedClass) {
      box.classList.add(storedClass);
      link.classList.add(storedClass);
    }
    // Update DOM
    projectsEl.appendChild(box);
    box.appendChild(innerBox);
    innerBox.appendChild(link);
  }
})


function capitalizeWords(str, sep) {
 const arr = str.split(sep);
 for (let word=0; word<arr.length; word++) {
   arr[word]=arr[word].charAt(0).toUpperCase() + arr[word].slice(1);
 }
 return arr.join(' ');
}

function randomColor() {
  const r = Math.floor(Math.random()*255);
  const g = Math.floor(Math.random()*255);
  const b = Math.floor(Math.random()*255);
  const a = 0.5;
  const color = `rgba(${r},${g},${b},${a})`;
  return color;
}


projectsEl.addEventListener('click', (e) => {
  const element = e.target;
  if (element.tagName == 'A') {
    const project = element.closest('.project');
    const projectInner = element.closest('.project-inner');
    if (project) {
      project.classList.add('clicked', 'visited');
      projectInner.classList.add('clicked', 'visited');
      sessionStorage.setItem(project.index, "visited");
      setTimeout(()=> {
        project.classList.remove('clicked');
        projectInner.classList.remove('clicked')
      } , 300);
    }
  }
})

headerEl.addEventListener('dblclick', () => {
  sessionStorage.clear();
  location.reload();
})