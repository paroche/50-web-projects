const labels = document.querySelectorAll('.form-control label');
const email = document.getElementById('email');
const password = document.getElementById('password');

labels.forEach(label => {
  // console.log(label.innerText.split(""));
  label.innerHTML = label.innerText
    .split("")
    .map((letter, idx) => `<span style="transition-delay:${idx*50}ms">${letter}</span>`)
    .join("");
})

// Code I added because Chrome kept filling in fields, even w/ autocompled="off"

const elem = document.documentElement;
elem.addEventListener('load', ()=> {
  setTimeout(clearValues, 500);
}
)

setTimeout(clearValues, 800); /* this seems to work. Load event never triggered */
setTimeout(clearValues, 1000);
setTimeout(clearValues, 1500);

function clearValues() {
  email.value = '';
  password.value='';
  // console.log('in clearValues()');
}