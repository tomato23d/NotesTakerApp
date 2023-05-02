const express = require('express');
const path = require('path');
const notesData = require('./db/mynote.json');
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

// GET Route for retrieving all notes
app.get('/api/notes', (req, res) => {
    console.info(`${req.method} request received to retrieve all notes`);
    readFromFile('./db/mynote.json').then((NotesData) => res.json(JSON.parse(NotesData)));
                           });
//GET route to retrieve notes of specific type
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
    console.info(`${req.method} request received to add a note`);
    const{title, text} = req.body;

    if (title && text){
        const newNote = {
            type: "Shop",
            title,
            text,
            note_id: uuid(),
        };
    
    const noteString = JSON.stringify(newNote);

    const readAndAppend = () => {
        fs.readFile('./db/mynote.json', 'utf8', (err, data) => {
         if (err) {console.error(err);} 
      else {
            const parsedData = JSON.parse(data);
           
           // parsedData.push(JSON.parse(noteString));

           parsedData.push(newNote);
            
            fs.writeFile('./db/mynote.json', JSON.stringify(parsedData), (err) =>
            err ? console.error(err) : console.info("success read and write"));
            }
                    });
                            };
    readAndAppend();
                        
     };})
 
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);



