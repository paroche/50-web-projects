const ratings = document.querySelectorAll('.rating');
const ratingsContainer = document.querySelector('.ratings-container');
const sendBtn = document.getElementById('send');
let seelctedRating = 'Satisfied';

ratingsContainer.addEventListener('click',(e)=> {
  if(e.target.parentNode.classList.contains('rating')) {
    removeActive();
    e.target.parentNode.classList.add('active');
    selectedRating = e.target.nextElementSibling.innerText;
    console.log(selectedRating);
  }
})

sendBtn.addEventListener('click', (e) => {
  panel.innerHTML = `
    <i class="fas fa-heart"></i>
    <strong>Thank You!</strong>
    <br>
    <strong>Feedback: ${selectedRating}</strong>
    <p>We'll use your feedback to improve our custmoer support</p>
  `
})

// using regular for loop just for variety
function removeActive() {
  for(let i = 0; i < ratings.length; i++) {
    ratings[i].classList.remove('active');
  }
}