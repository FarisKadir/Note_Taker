const fs = require('fs');
const path = require('path');
const uniqid = require("uniqid");

module.exports = app => {
    let notes;

    // Get existing notes from db.json
    fs.readFile("db/db.json","utf8", (err, res) => {
        if (err) throw err;
        notes = JSON.parse(res);
    });

    //Rewrite db.json file
    const updateJson = () =>  {
        fs.writeFile("db/db.json",JSON.stringify(notes,'\t'),err => {
            if (err) throw err;
        });
    };


    //Routes

    // Setup the /api/notes get route
    app.get("/api/notes", (req, res) => {
        // Read the db.json file and return all saved notes as JSON.
        res.json(notes);
    });

    // Setup the /api/notes post route
    app.post("/api/notes", (req, res) => {
        // Receives a new note, adds it to db.json, then returns the new note
        let newNote = req.body;
        newNote.id = uniqid();
        notes.push(newNote);
        updateJson();
        console.log(`Added:\n   Note: ${newNote.title} \n   Text: ${newNote.text} \n   ID: ${newNote.id}`);
        res.json(notes);
    });

    // Retrieves a note with specific id
    app.get("/api/notes/:id", (req,res) => {
        // display json for the notes array indices of the provided id
        res.json(notes[req.params.id]);
    });

    // Deletes a note with specific id
    app.delete("/api/notes/:id", (req, res) => {
        notes.forEach((obj,index) => {
            if (req.params.id == obj.id)  {
                console.log(`Deleted:\n   Note: ${obj.title} \n   Text: ${obj.text}\n   ID: ${obj.id}`);
                notes.splice(index, 1);
            };
        });
        updateJson();
        res.json(notes);
    });
};