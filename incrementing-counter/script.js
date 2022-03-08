const counters = document.querySelectorAll('.counter');
const button = document.getElementById('reload-button');

counters.forEach(counter => {
  counter.innerText = '0';
  const updateCounter = () => {
    const target = +counter.getAttribute('data-target');
  const c = +counter.innerText;
  const increment = target / 200;

  // His version
  // if(c < target) {
  //   counter.innerText = `${Math.ceil(c + increment)}`;
  //   setTimeout(updateCounter, 1);
  // } else {
  //   counter.innerText = target;
  // }

  // My version
  if (c < target ) {
    counter.innerText = `${Math.min(Math.ceil(c+increment),target)}`;
    setTimeout(updateCounter, 1);
  }
  }

  updateCounter();
})

setTimeout(reloadButton, 3000);

function reloadButton() {
  if (window.frameElement !=null) {
    setTimeout(()=> {
      button.classList.remove('hidden');
      button.addEventListener('click', () => {
        button.classList.add('hidden');
        setTimeout(()=>location.reload(), 2000); // allow to reload if in iframe
      } , 2000)

    }, 2000)
  }
}