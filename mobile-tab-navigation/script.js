// His solution

const contents = document.querySelectorAll('.content');
const listItems = document.querySelectorAll('nav ul li');

listItems.forEach((item, idx) => {
  item.addEventListener('click', () => {
    hideAllContents();
    hideAllItems();
    item.classList.add('active');
    contents[idx].classList.add('show');
  });

});

function hideAllContents() {
  contents.forEach(content => content.classList.remove('show'));
}

function hideAllItems() {
  listItems.forEach(item => item.classList.remove('active'));
}

/* My solution. Works same
const images = document.querySelectorAll(".phone img");
const navButtons = document.querySelectorAll('nav li');

const update = (button, idx)=> {
  button.addEventListener('click', () => {
    images.forEach((image) => {
      image.classList.remove('show');    
    })
    images[idx].classList.add('show');
    navButtons.forEach((button) => {
      button.classList.remove('active');
    });
    button.classList.add('active');
  });
}
navButtons.forEach((button, idx) => update(button, idx));
*/