const buttons = document.querySelectorAll('.ripple');

buttons.forEach(button => {
  button.addEventListener('click', e => {
    const x = e.clientX;
    const y = e.clientY;
    const buttonTop = e.target.offsetTop;
    const buttonLeft = e.target.offsetLeft;

    const xInside = x - buttonLeft + 1;
    const yInside = y - buttonTop + 1;

    const circle = document.createElement('span');
    circle.classList.add('circle');
    circle.style.top = yInside + 'px';
    circle.style.left = xInside + 'px';

    button.appendChild(circle); // this works too (instead of 'this')
    // this.appendChild(circle); // His code. Then have to have regular function above rather than arrow function.

    setTimeout(() => circle.remove(), 500);
  })
})

// The clientX read-only property of the MouseEvent interface provides the horizontal coordinate within the application's viewport at which the event occurred (as opposed to the coordinate within the page).

// The Element.remove() method removes the element from the tree it belongs to.
