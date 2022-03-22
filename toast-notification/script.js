const button = document.getElementById('button');
const toasts = document.getElementById('toasts');

const messages = ['Message One','Message Two','Message Three','Message Four'];
const types = ['info', 'success', 'error'];

button.addEventListener('click', () => createNotification());

// Not currently passing message or type so using random ones
function createNotification(message, type) {
  // My first try. Works, but only for one message, and doesn't give us a handy element to remove afte timeout:
  // const toast = `<div class="toast">${messages[Math.floor(Math.random()*4)]}</div>`;
  // toasts.innerHTML = toast;
  const notif = document.createElement('div');
  notif.classList.add('toast');
  notif.classList.add(type ? type : getRandomType());
  notif.innerText = message ? message : getRandomMessage();
  toasts.appendChild(notif);
  // setTimeout(()=>toasts.removeChild(notif), 3000); // my first. Works
  setTimeout(()=> notif.remove(), 3000);
  }


function getRandomMessage() {
  return messages[Math.floor(Math.random()*messages.length)];
}
function getRandomType() {
  return types[Math.floor(Math.random()*types.length)];
}

