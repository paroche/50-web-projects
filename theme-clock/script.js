const hourEl = document.querySelector('.hour');
const minuteEl = document.querySelector('.minute');
const secondEl = document.querySelector('.second');
const timeEl = document.querySelector('.time');
const dateEl = document.querySelector('.date');
const toggleEl = document.querySelector('.toggle-button');
const html = document.querySelector('html');
const bodyEl = document.querySelector('body');

const useOpacity = false;
const testMode = false;

let time, month, day, date, hours, hoursForClock, minutes, seconds, ampm, timeSecs;
let fakeTimeCounter = 0; // For testing
removeNeedleTransitions(); // Shouldn't be necessary. Doesn't work anyway?????

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

toggleEl.addEventListener('click', (e) => toggleDark(e));

function toggleDark(e) {
  html.classList.toggle('dark'); /* He used if/else */
  if(html.classList.contains('dark')){
    e.target.innerText = 'Light mode';
  } else {
    e.target.innerText = 'Dark mode'
  }
}

function getTime() {
  time = new Date();
  month = time.getMonth();
  day = time.getDay();
  date = time.getDate();
  hours = time.getHours();
  hoursForClock = (hours % 12) == 0 ? 12 : hours % 12; // my fix
  minutes = time.getMinutes();
  seconds = time.getSeconds();
  ampm = hours >= 12 ? 'PM' : 'AM';
  // timeSecs = Math.floor(Date.now() / 1000) - 27200000*60; // made smaller because seemed to confuse rotate transform w/ larger #s
  //   timeDays = Math.floor((Date.now() /1000) / (24*3600));
}

function fakeTime() {
  // Just for time around midnight
  month = 1;
  day = 1;
  hours = 23;
  hoursForClock = 11;
  minutes = 59;
  seconds = 55 + fakeTimeCounter++;
  ampm = 'PM';
  if (fakeTimeCounter > 5) {
    seconds = seconds % 60;
    hours = 0;
    hoursForClock = 12;
    minutes = Math.floor((fakeTimeCounter - 6)/60);
    ampm = 'AM';
  }
 }

function setTimeDOM() {
  // My solution. Doesn't use scale, and adds 360deg from minutes, etc. so doesn't jump at 0
  // Adjust when day changes version:
  // hourEl.style.transform = `translateX(-50%) rotate(${hours*30 + date*360}deg)`;
  // minuteEl.style.transform = `translateX(-50%) rotate(${minutes*6 + hours*360 + date*24*360}deg)`;
  // secondEl.style.transform = `translateX(-50%) rotate(${seconds*6 + minutes*360 + hours*60*360 + date*24*60*360}deg)`;
  // Let rewind at midnight version. Seems smoother:
  // console.log(hours,minutes,seconds); // t
  if ((hours == 0 && minutes == 0 && seconds == 0) ){removeNeedleTransitions();} // At midnight, remove transitions so can rewind w/out spin (NOT WORKING???)

  hourEl.style.transform = `translateX(-50%) rotate(${hours*30}deg)`;
  minuteEl.style.transform = `translateX(-50%) rotate(${minutes*6 + hours*360}deg)`;
  secondEl.style.transform = `translateX(-50%) rotate(${seconds*6 + minutes*360 + hours*60*360}deg)`;
  // secondEl.style.transform = `translateX(-50%) rotate(${seconds*6 + minutes*360 + hours*60*360 + timeDays*24*60*360}deg)`; // jumps around, not good
  // secondEl.style.transform = `translateX(-50%) rotate(${timeSecs*6}deg)`; // doesn't work right
  timeEl.innerHTML = `${hoursForClock}:${minutes < 10 ? `0${minutes}` : minutes} ${ampm}`; // Did not know you could embed templates w/int templates
  // timeEl.innerHTML = `${hoursForClock}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds} ${ampm}`; // Did not know you could embed templates w/int templates
  dateEl.innerHTML = `${days[day]}, ${months[month]} <span class="circle">${date}</span>`;
  if (!needleTransitions) setTimeout(setNeedleTransitions, 600); // w/ opacity settings on needles, this avoids spin by making hands disappear briefly.
}

function setNeedleTransitions() {
  // console.log("in setNeedleTransitions");
  // Added after 1st display so won't spin into place at start
  hourEl.style.transition = "transform 0.5s ease-in";
  minuteEl.style.transition = "transform 0.5s ease-in";
  secondEl.style.transition = "transform 0.5s ease-in";
  secondEl.style.backgroundColor = 'red';
  if (useOpacity) {
    hourEl.style.opacity = '1';
    minuteEl.style.opacity = '1';
    secondEl.style.opacity = '1'; }
  }
  needleTransitions = true;

function removeNeedleTransitions() {
  // console.log('in removeNeedleTransitions');
  // So rotation degree can zero w/out rewinding
  // hourEl.style.transition = "all none"; // have tried "none" "transform none", "all none", "transform 0s"
  // minuteEl.style.transition = "all none";
  // secondEl.style.transition = "all none";
  // The below - transitionDuration -- Actually works
  hourEl.style.transitionDuration = '0s';
  minuteEl.style.transitionDuration = '0s';
  secondEl.style.transitionDuration = '0s';
  // secondEl.style.backgroundColor = 'green'; // just for testing
  // w/ below & delayed restoration of opacity, makes hands disappear (then come back when reset)
  if (useOpacity) {
    hourEl.style.opacity = '0';
    minuteEl.style.opacity = '0';
    secondEl.style.opacity = '0';
  }
  needleTransitions = false;
}

function setTime() {
  getTime(); 
  if (testMode) fakeTime();
  setTimeDOM();
}

// **** Main ****

// First display

// Display time
bodyEl.opacity = 0;
setTime(); // First time no transitions, so screen just appears. Or so one would think????
bodyEl.style.transition = "opacity 1s ease-in 0s";  // Removes trace of flicker even w/ transitions at 0. Also, looks a bit nicer easing-in.
bodyEl.style.opacity = '1';
setTimeout(setNeedleTransitions, 1000); // Now that have initial display, start transitions


// Redisplay once/second

// setTimeout(setTime, 1000 - new Date().getMilliseconds()); // Doesn't work all that well. Jumps
// setInterval(setTimeWTransitions, 1000); // This works reasonably well

// oncePerSecond - More precise than setInterval - From StackOverflow: https://stackoverflow.com/questions/53891790/make-javascript-interval-synchronize-with-actual-time
// I guess each iteration completes while leaving behind another iteration in the queue, so won't cause memory problems. But still jumps sometimes
function oncePerSecond(callback) {
  let timerFunc = function () {
      // get the current time rounded down to a whole second (with a 10% margin)
      let now = 1000 * Math.floor(Date.now() / 1000 + 0.1);
      // (The static Date.now() method returns the number of milliseconds elapsed since January 1, 1970 00:00:00 UTC.)
      // run the callback
      callback(now);
      // wait for the next whole second
      setTimeout(timerFunc, now + 1000 - Date.now());
  };
  timerFunc();
}


setTimeout(() => oncePerSecond(setTime), 1000); 