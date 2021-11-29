const open_btn = document.querySelector('.open-btn');
// He and Florin follow convention of using '-' for classes and, I guess, snake case or camel case for vars?
const close_btn = document.querySelector('.close-btn');
const nav = document.querySelectorAll('.nav');

open_btn.addEventListener('click', () => {
  nav.forEach(nav_el => nav_el.classList.add('visible'))
})

close_btn.addEventListener('click', () => {
  nav.forEach(nav_el => nav_el.classList.remove('visible'))
})