const smallCups = document.querySelectorAll('.cup-small');
const liters = document.getElementById('liters');
const percentage = document.getElementById('percentage');
const remained = document.getElementById('remained');

updateBigCup();

smallCups.forEach((cup, idx) => {
  cup.addEventListener('click', () => highlightCups(idx))
})

function highlightCups(idx) {
  if (smallCups[idx].classList.contains('full')  && 
      (idx == smallCups.length-1 ||   
        // I added this to avoid error on toggling last cup. Also could have used:
      // (smallCups[idx].nextElementSibling == null ||
        !smallCups[idx].nextElementSibling.classList.contains('full'))) 
        
        {
      idx--;
       }
  smallCups.forEach((cup, idx2) => {
    if(idx2 <= idx) {
        cup.classList.add('full');
    } else {
        cup.classList.remove('full');
    }
  })

  updateBigCup();
}

function updateBigCup() {
  const fullCups = document.querySelectorAll('.cup-small.full').length;
  const totalCups = smallCups.length;

  if (fullCups === 0) {
    percentage.style.visibility = 'hidden';
    percentage.style.height = 0;
  } else {
    percentage.style.visibility = 'visible';
    percentage.style.height = `${fullCups / totalCups * 330}px`;
    percentage.innerText = `${fullCups / totalCups * 100}%`
  }

  if (fullCups == totalCups) {
    remained.style.visibility = 'hidden';
    remained.style.height = 0;
  } else {
    remained.style.visibility = 'visible';
    liters.innerText = `${250 * (totalCups - fullCups) / 1000 }L`; // mine
    // liters.innerText = `${2 - (250 * fullCups) / 1000 }L`; // his
  }
}