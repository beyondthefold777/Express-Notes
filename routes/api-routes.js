const router = require('express').Router();
const { v4: uuidv4 } = require('uuid'); // Importing uuid so we can set a unique identifier for our project
const fs = require('fs'); 

router.get('/api/notes', async (req, res) => {
    try {
        const dbJson = await JSON.parse(fs.readFileSync('db/db.json', 'utf8')); // Reading the content of db.json file
        res.json(dbJson); 
    } catch (err) {
        console.error(err); 
        res.status(500).send('Server Error'); 
    }
});

router.post('/api/notes', (req, res) => {
    try {
        const dbJson = JSON.parse(fs.readFileSync('db/db.json', 'utf8')); // Reading the content of db.json file
        const newFile = {
            title: req.body.title,
            text: req.body.text,
            id: uuidv4()
        };

        dbJson.push(newFile); // Adding a new note to the existing notes array
        fs.writeFileSync('db/db.json', JSON.stringify(dbJson)); 
        res.json(dbJson); 
    } catch (err) {
        console.error(err); 
        res.status(500).send('Server Error'); 
    }
});

router.delete('/api/notes/:id', (req, res) => {
    try {
        let data = fs.readFileSync('db/db.json', 'utf8'); // Reading the content of db.json file
        const dataJSON = JSON.parse(data); // Parsing the JSON data from db.json
        const newNotes = dataJSON.filter((note) => note.id !== req.params.id); // Filtering out the note with the given id

        fs.writeFileSync('db/db.json', JSON.stringify(newNotes)); // Writing the filtered notes back to db.json file
        res.json(newNotes); // Sending the filtered notes as response
    } catch (err) {
        console.error(err); // Log any errors that occur during file reading or writing
        res.status(500).send('Server Error'); // Sending a 500 status response in case of error
    }
});