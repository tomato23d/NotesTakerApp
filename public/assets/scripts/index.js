var timeStamp = dayjs().format('D.MMMM.YYYY_H:mm');
console.log(timeStamp);


  // if (window.location.pathname === '/notes.html'){
        noteTitle = document.querySelector('.note-title');
        noteText = document.querySelector('.note-textarea');
        saveNoteBtn = document.querySelector('.save-note');
        mySaveBtn = document.getElementById('saveBtn');
        myNewBtn = document.getElementById('newBtn');
        newNoteBtn = document.querySelector('.new-note');
        myList = document.querySelectorAll('.list-group');
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


function renderMyNotes(note){
    const linote = document.createElement('li');
    linote.innerText = note.title;
    //console.log(linote);
    myCards.appendChild(linote);
};

show(saveNoteBtn);


getNotes().then((response)=> response.forEach((item) => renderMyNotes(item)));


const handleNoteSave = () => {
      const newNote = {
      type: "Shop",
      title: noteTitle.value.trim(),
      text: noteText.value.trim(),
  
    };
    saveNote(newNote).then((response) => {
        alert(`Note is saved!`)
    })
    localStorage.setItem(timeStamp, JSON.stringify(newNote));

    getNotes().then((response)=> response.forEach((item) => renderMyNotes(item)));
      //getAndRenderNotes();
      //renderActiveNote();
    }
    //);
  //};


//if (window.location.pathname === '/notes') {
    saveNoteBtn.addEventListener('click', handleNoteSave);


//};
