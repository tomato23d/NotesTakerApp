    if (window.location.pathname === '/notes.html'){
        noteTitle = document.querySelector('.note-title');
        noteText = document.querySelector('.note-textarea');
        saveNoteBtn = document.querySelector('.save-note');
        newNoteBtn = document.querySelector('.new-note');
        myList = document.querySelectorAll('.list-group');
       myCards = document.getElementById('card1');
    
      }

const show = (elem) => {
    elem.style.display = 'inline';
  };
  
  
const hide = (elem) => {
    elem.style.display = 'none';
  };

let activeNote = {};

const getNotes = async () => {
    const result = await fetch('/api/notes', {
      method: 'GET',
    });
    const json = await result.json();
    return json;
  };

function renderMyNotes(note){
    const linote = document.createElement('li');
    linote.innerText = note.title;
    console.log(linote);
    myCards.appendChild(linote);
};

show(saveNoteBtn);


getNotes().then((response)=> response.forEach((item) => renderMyNotes(item)))
