var timeStamp = dayjs().format('D.MMMM.YYYY_H:mm');
console.log(timeStamp);


  // if (window.location.pathname === '/notes.html'){
        noteTitle = document.querySelector('.note-title');
        noteText = document.querySelector('.note-textarea');
        saveNoteBtn = document.querySelector('.save-note');
        newNoteBtn = document.querySelector('.new-note');
        //myList = document.querySelectorAll('.list-group');
        //myList = document.getElementById('list1');
        myCards = document.getElementById('card1');
    
    //  };

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

  const saveNote = (note) =>
  fetch('/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  });

function clearDiary(){myCards.innerHTML = " "};

myNotes = [ ];
myNotesId = [ ];

function renderMyNotes(note){
    
    const pnote = document.createElement('p');
    pnote.textContent = note.title;
    pnote.id = note.note_id;
    //console.log(pnote);
    myCards.appendChild(pnote);
    myNotes.push(note);
    myNotesId.push(note.note_id);
};

    console.log(myNotes);
    console.log(myNotesId);

show(saveNoteBtn);


getNotes().then((response) => response.forEach((item) => renderMyNotes(item)));


const handleNoteSave = () => {
      const newNote = {
      type: "Shop",
      title: noteTitle.value.trim(),
      text: noteText.value.trim(),
  
    };
    saveNote(newNote).then((response) => {
        alert(`Note is saved!`);
    })
    localStorage.setItem(timeStamp, JSON.stringify(newNote));

    clearDiary();
    getNotes().then((response)=> response.forEach((item) => renderMyNotes(item)));
      //getAndRenderNotes();
      //renderActiveNote();
    }
    //);
  //};

function handleNoteSelect(event){
    gotSelect = event.target.id;
    console.log(this.childElementCount);
    console.log(this.firstChild);
}



//if (window.location.pathname === '/notes') {
    saveNoteBtn.addEventListener('click', handleNoteSave);
    myCards.addEventListener('click', handleNoteSelect);

//};
