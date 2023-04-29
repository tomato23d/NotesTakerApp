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



app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);



