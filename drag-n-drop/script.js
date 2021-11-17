const fill = document.querySelector('.fill');
const empties= document.querySelectorAll('.empty');

fill.addEventListener('dragstart', dragStart);
fill.addEventListener('dragend', dragEnd);

for(const empty of empties) {
  empty.addEventListener('dragover', dragOver);
  empty.addEventListener('dragenter', dragEnter);
  empty.addEventListener('dragleave', dragLeave);
  empty.addEventListener('drop', dragDrop);
}

function dragStart() {
  this.className += ' hold';
  // this.classList.add('my'); // This works too
  // console.log('this = ',this); // Show already jumped ahead to have class 'invisible'
  // console.log('this.className: ', this.className); // This shows classes as assigned above (e.g. 'fill hold')
  // So apparently 'empty' (above, not defined here) is 'this'
  setTimeout(() => this.className = 'invisible', 0); /* not a real class, SetTimeout allows us to take image before it's blanked out, even w/ 0 ms*/
}

function dragEnd() {
  this.className = 'fill';
}
function dragOver(e) {
  e.preventDefault(); /* Default action:	Reset the current drag operation to "none".*/

}
function dragEnter(e) {
  e.preventDefault(); /* Default action:	Reject immediate user selection as potential target element. */
  this.className += ' hovered';
}

function dragLeave() {
  this.className = 'empty';
}

function dragDrop() {
  this.className = 'empty';
  this.append(fill);

}