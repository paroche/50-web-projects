const projectsEl = document.getElementById("projects");

function app(dir, description, color, show, popup) {
  this.dir = dir;
  this.description = description;
  this.color = color;
  this.show = show;
  this.popup = popup;
}

let apps = [];

apps.push(new app('3d-boxes-background','3D Boxes Background','#f9ca24',true));
apps.push(new app('animated-countdown','','',true));
apps.push(new app('animated-navigation','','',true));
apps.push(new app('auto-text-effect','','',true));
apps.push(new app('background-slider','','',true));
apps.push(new app('blury-loading','','',true));
apps.push(new app('button-ripple-effect','','',true));
apps.push(new app('content-placeholder','','',true));
apps.push(new app('custom-range-slider','','',false));
apps.push(new app('dad-jokes','','',true));
apps.push(new app('double-click-heart','','red',true));
apps.push(new app('double-vertical-slider','','',true));
apps.push(new app('drag-n-drop','','',true));
apps.push(new app('drawing-app','','',true));
apps.push(new app('drink-water','','',true));
apps.push(new app('event-keycodes','','',true));
apps.push(new app('expanding-cards','','',true));
apps.push(new app('faq-collapse','FAQ Collapse','',true));
apps.push(new app('feedback-ui-design','','',true));
apps.push(new app('form-wave-animation','','',true));
apps.push(new app('github-profiles','','',true));
apps.push(new app('good-cheap-fast','','',true));
apps.push(new app('hidden-search','','',true));
apps.push(new app('hoverboard','','',true));
apps.push(new app('image-carousel','','',true));
apps.push(new app('incrementing-counter','','',true));
apps.push(new app('kinetic-loader','','',true));
apps.push(new app('live-user-filter','','',true));
apps.push(new app('mobile-tab-navigation','','',true));
apps.push(new app('movie-app','','',true));
apps.push(new app('notes-app','','',true));
apps.push(new app('password-generator','','',true));
apps.push(new app('password-strength-background','','',true));
apps.push(new app('pokedex','','',true));
apps.push(new app('random-choice-picker','','',true));
apps.push(new app('rotating-nav-animation','','',true));
apps.push(new app('scroll-animation','','',true));
apps.push(new app('sound-board','','',true));
apps.push(new app('split-landing-page','','',true));
apps.push(new app('steps','','',true));
apps.push(new app('sticky-navbar','','',true));
apps.push(new app('theme-clock','','',true));
apps.push(new app('toast-notification','','',true));
apps.push(new app('verify-account-ui','','',true));


console.log(apps);




apps.forEach(app => {
  ({dir, description, color, show, popup } = app);
  if (show) {
    const box = document.createElement('div');
    const innerBox = document.createElement('div');
    const link = document.createElement('A');

    box.classList.add('project');
    innerBox.classList.add('project-inner');
    innerBox.style.backgroundColor = color || randomColor();
    console.log(randomColor());
    link.href = "./"+dir+"/index.html";
    let desc = description || capitalizeWords(dir, '-');
    link.classList.add('link');
    link.innerText = desc;

    innerBox.appendChild(link);
    box.appendChild(innerBox);
    projectsEl.appendChild(box);
  }
})

function capitalizeWords(str, sep) {
 const arr = str.split(sep);
 console.log(arr);
 for (let word=0; word<arr.length; word++) {
   arr[word]=arr[word].charAt(0).toUpperCase() + arr[word].slice(1);
 }
 return arr.join(' ');
}

function randomColor() {
  const r = Math.floor(Math.random()*255);
  const g = Math.floor(Math.random()*255);
  const b = Math.floor(Math.random()*255);
  const a = 0.2;
  const color = `rgba(${r},${g},${b},${a})`;
  return color;
}