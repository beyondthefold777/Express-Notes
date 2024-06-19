const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

router.post('/notes', (req, res) => { // Update route path to '/notes'
    try {
        const dbJson = JSON.parse(fs.readFileSync('db/db.json', 'utf8'));
        const newFile = {
            title: req.body.title,
            text: req.body.text,
            id: uuidv4()
        };

        dbJson.push(newFile);
        fs.writeFileSync('db/db.json', JSON.stringify(dbJson));
        res.json(dbJson);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.delete('/notes/:id', (req, res) => { // Update route path to '/notes/:id'
    try {
        let data = fs.readFileSync('db/db.json', 'utf8');
        const dataJSON = JSON.parse(data);
        const newNotes = dataJSON.filter((note) => note.id !== req.params.id);

        fs.writeFileSync('db/db.json', JSON.stringify(newNotes));
        res.json(newNotes);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.get('/notes', (req, res) => { // Update route path to '/notes'
    try {
        const dbJson = JSON.parse(fs.readFileSync('db/db.json', 'utf8'));
        res.json(dbJson);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
