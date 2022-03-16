const hourEl = document.querySelector('.hour');
const minuteEl = document.querySelector('.minute');
const secondEl = document.querySelector('.second');
const timeEl = document.querySelector('.time');
const dateEl = document.querySelector('.date');
const toggleEl = document.querySelector('.toggle');

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

toggleEl.addEventListener('click', (e) => {
  const html = document.querySelector('html');
  html.classList.toggle('dark'); /* He used if/else */
  if(html.classList.contains('dark')){
    e.target.innerText = 'Light mode';
  } else {
    e.target.innerText = 'Dark mode'
  }
})

function setTime() {
  const time = new Date();
  const month = time.getMonth();
  const day = time.getDay();
  const date = time.getDate();
  const hours = time.getHours();
  const hoursForClock = hours % 12 == 0 ? 12 : hours % 12; // my fix
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  /* my solution
  let minutesF = minutes;
  if (minutesF.length = 1) minutesF = '0'+minutesF;
  timeEl.innerText = hoursForClock + ":" + minutesF;

  hourEl.style.transform = `translate(-50%, -100%) rotate(${(hoursForClock * 30)}deg)`
  hourEl.style.height = '120px';
  minuteEl.style.transform = `translate(-50%, -100%) rotate(${minutes * 6}deg)`;
  secondEl.style.transform = `translate(-50%, -100%) rotate(${seconds * 6}deg)`;
  dateEl.innerHTML = days[day] + ', ' + months[month] + ' <span class="circle">' + `${day}` + '</span>';
  */

  // Dynamic transitions to avoid spin. Adapted from Q&A. Still jumps from 59 to 0 w/out ease-in, but doesn't spin back to do it.
  hourEl.style.transition = `${hours === 0 ? "none" : "all 0.5s ease-in"}`; 
  minuteEl.style.transition = `${minutes === 0 ? "none" : "all 0.5s ease-in"}`;   
  secondEl.style.transition = `${seconds === 0 ? "none" : "all 0.5s ease-in"}`;

// His solution. Using scale() for this is really overkill, plus he uses it wrong
hourEl.style.transform = `translate(-50%, -100%) rotate(${scale(hoursForClock, 0, 12, 0, 360)}deg)`; // he had 0, 11, 0, 360, which is wrong
minuteEl.style.transform = `translate(-50%, -100%) rotate(${scale(minutes, 0, 60, 0, 360)}deg)`;
secondEl.style.transform = `translate(-50%, -100%) rotate(${scale(seconds, 0, 60, 0, 360)}deg)`;

timeEl.innerHTML = `${hoursForClock}:${minutes < 10 ? `0${minutes}` : minutes} ${ampm}`; // Did not know you could embed back templates w/int templates

dateEl.innerHTML = `${days[day]}, ${months[month]} <span class="circle">${date}</span>`


}

// StackOverflow https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
const scale = (num, in_min, in_max, out_min, out_max) => {
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

setInterval(setTime, 1000);
