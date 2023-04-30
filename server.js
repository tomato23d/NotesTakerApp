const express = require('express');
const path = require('path');
const notesData = require('./db/note.json');
const fs = require('fs');
const util = require('util');
const uuid = require('./helpers/uuid');


const PORT = 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//GET route for landing page
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

//GET route for notes page
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

//GET route to retrieve existing notes
app.get('/api/notes', (req, res) => res.json(notesData));

app.get('/api/notes/:type', (req, res) => {
    
    const requestedType = req.params.type.toLowerCase();
    const output = [];
  
    for (let i = 0; i < notesData.length; i++) {
      if (requestedType === notesData[i].type.toLowerCase()) {
        output.push(notesData[i]);
      }}
      return res.json(output);
    });
//POST request to save a new note
app.post('/api/notes',(req,res) => {
    console.info(`${req.method} request received to add a review`);
    const{title, text} = req.body;

    if (title && text){
        const newNote = {
            type: "Shop",
            title,
            text,
            note_id: uuid(),
        };
    
    const noteString = JSON.stringify(newNote);
    
    fs.appendFile('./db/note.json', noteString, (err)=>
    {err ? console.error(err): console.log("success")});

    const response = {
        status: 'success',
        body: newNote,
    };
    
    console.log(response);
    res.status(201).json(response);
    }
    else{
        res.status(500).json('Error in posting review');
    }
});


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);



