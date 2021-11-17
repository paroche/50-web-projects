const panels = document.querySelectorAll('.panel'); // Puts panels into a nodelist

panels.forEach(panel => {
  panel.addEventListener('click', () => {
    panels.forEach(panel => 
      panel.classList.remove('active'));
    panel.classList.add('active');
    })
  })


// function removeActiveClasses() {
//   panels.forEach(panel => 
//     panel.classList.remove('active')
//   )
// }
