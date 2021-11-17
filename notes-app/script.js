/** @format */

// console.log(marked);
// console.log(typeof marked); // object
// console.log(typeof marked.marked); // function

const addBtn = document.getElementById('add');

const notes = JSON.parse(localStorage.getItem('notes'));
 if(notes) {
   notes.forEach(note => addNewNote(note));
 }
addBtn.addEventListener('click', () => addNewNote(''));


function addNewNote(text = '') {
  const note = document.createElement('div');
  note.classList.add('note');

  note.innerHTML = `
    <div class="tools">
      <button class="edit"><i class="fas fa-edit"></i></button>
      <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>
    <div class="main ${text ? '' : 'hidden'}"></div>
    <textarea class="${text ? 'hidden' : ''}"></textarea>
    `;

  // I did not know you could do this before the element has been added to DOM
  const editBtn = note.querySelector('.edit');
  const deleteBtn = note.querySelector('.delete');
  const main = note.querySelector('.main');
  const textArea = note.querySelector('textarea');

  textArea.value = text;
  main.innerHTML = marked.parse(text);

  deleteBtn.addEventListener('click', () => {
    note.remove();
    updateLS();
  });

  editBtn.addEventListener('click', () => {
    main.classList.toggle('hidden');
    textArea.classList.toggle('hidden');
  });

  textArea.addEventListener('input', (e) => {
    const { value } = e.target;
    main.innerHTML = marked.parse(value);
    updateLS();
  });

  document.body.appendChild(note);
}

function updateLS() {
  const notesText = document.querySelectorAll('textarea');
  const notes = [];

  notesText.forEach((note) => notes.push(note.value));

  localStorage.setItem('notes', JSON.stringify(notes));
  sessionStorage.setItem('notes', JSON.stringify(notes));
  sessionStorage.setItem('test', 'WTF');

}
// localStorage. Can only store strings
// localStorage.setItem('name', 'Pete');
// localStorage.getItem('name');
// localStorage.removeItem('name');
// let testObj = {"key1":"value 1", "key2":"value 2"};
// localStorage.setItem("myObject", JSON.stringify(testObj)); // DevTools will actually show object when you click on string in local storage
// localStorage.setItem("key1alone", ""+testObj.key1);
// localStorage.clear();

// is also 'sessionStorage', which only lasts thru this session. Also, only this tab -- open the same site in another tab and will have localStorage but not sessionStorage.