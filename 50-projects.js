const projectsEl = document.getElementById("projects");

const directories = "3D-background-boxes,animated-countdown,animated-navigation,auto-text-effect,background-slider,blury-loading,button-ripple-effect,content-placeholder,dad-jokes,double-click-heart,double-vertical-slider,drag-n-drop,drawing-app,drink-water,event-keycodes,expanding-cards,faq-collapse,form-wave-animation,github-profiles,good-cheap-fast,hidden-search,hoverboard,image-carousel,incrementing-counter,kinetic-loader,mobile-tab-navigation,movie-app,notes-app,password-generator,password-strength-background,pokedex,random-choice-picker,rotating-nav-animation,scroll-animation,sound-board,split-landing-page,steps,sticky-navbar,test-scripts,theme-clock,toast-notification";

const dirs = directories.split(',');

console.log(dirs);

dirs.forEach(dir => {
  const link = document.createElement('A');
  link.href = "./"+dir+"/index.html";
  link.innerText = dir;
  link.classList.add('link');
  projectsEl.appendChild(link);
})

