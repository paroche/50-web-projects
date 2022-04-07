const counters = document.querySelectorAll('.counter');
const button = document.getElementById('reload-button');

// Main
runCount();


function runCount() {
  counters.forEach((counter, idx) => {
    counter.innerText = '0';
    const updateCounter = () => {
      const target = +counter.getAttribute('data-target');
    const c = +counter.innerText;
    const increment = target / 200;
  
    if (c < target ) {
      counter.innerText = `${Math.min(Math.ceil(c+increment),target)}`;
      setTimeout(updateCounter, 10 * (c / target));
    }
    }
    updateCounter();
  })
  setTimeout(reloadButton, 3000);
}


function reloadButton() {
  if (window.frameElement !=null) {
    setTimeout(()=> {
      button.classList.remove('hidden');
      button.addEventListener('click', () => {
        button.classList.add('hidden');
        setTimeout(()=> {
          resetCounters();
          setTimeout(runCount, 500);
        }, 1500); // allow to reload if in iframe
      } , 1500)
    }, 1500)
  }
}

function resetCounters() {
  counters.forEach(counter => {
    counter.innerText = '0';
  })
}