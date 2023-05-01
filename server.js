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

///////////////////
// Promise version of fs.readFile
		const readFromFile = util.promisify(fs.readFile);

/**
 *  Function to write data to the JSON file given a destination and some content
 *  @param {string} destination The file you want to write to.
 *  @param {object} content The content you want to write to the file.
 *  @returns {void} Nothing
 */
		const writeToFile = (destination, content) =>
  		fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    		err ? console.error(err) : console.info(`\nData written to ${destination}`));

/**
 *  Function to read data from a given a file and append some content
 *  @param {object} content The content you want to append to the file.
 *  @param {string} file The path to the file you want to save to.
 *  @returns {void} Nothing
 */
		const readAndAppend = (content, file) => {
  		fs.readFile(file, 'utf8', (err, data) => {
   		if (err) {console.error(err);} 
		else {
      		const parsedData = JSON.parse(data);
      		parsedData.push(content);
      		writeToFile(file, parsedData);
    			}
  				});
								};

//////////////////


//GET route to retrieve existing notes
app.get('/api/notes', (req, res) => res.json(notesData));

// GET Route for retrieving all notes
app.get('/api/notes', (req, res) => {
    console.info(`${req.method} request received to retrieve all notes`);
    readFromFile('./db/note.json').then((NotesData) => res.json(JSON.parse(NotesData)));
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

    ///////////////////
    const readAndAppend = () => {
        fs.readFile('./db/mynote.json', 'utf8', (err, data) => {
         if (err) {console.error(err);} 
      else {
            const parsedData = JSON.parse(data);
            //parsedData.push(content);
            parsedData.push(noteString);
              
                              fs.writeFile('./db/mynote.json', JSON.stringify(parsedData), (err) =>
                              err ? console.error(err) : console.info("success read and write"));
            }
                    });
                            };

    readAndAppend();
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
        res.status(500).json('Error in posting note');
    }
});


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);



