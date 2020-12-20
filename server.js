// Create an application that can be used to write, save, and delete notes. This application will use an express backend and save and retrieve note data from a JSON file.


// The application frontend has already been created, it's your job to build the backend and connect the two.

const express = require("express");
const cors = require("cors");
const path = require("path");
const http = require("http");
const fs = require("fs");

const PORT = process.env.PORT || 3000;
const app = express();

//takes query bar and codes any variables out of it requested
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); //allows any type of data not just strings and arrays
app.use(express.json());
app.use(cors()); //allows all cors request


//routes
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", (req, res) => {
    
    const jsonHolder = JSON.parse(fs.readFileSync(path.join(__dirname, "/db/db.json")));

    res.json(jsonHolder);

})

// send info back to server - creating new things on the server
app.post("/api/notes", (req, res) => {

    let addNewNote = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

    let newNote = req.body;

    let uniqueId = addNewNote.length;

    newNote.id = uniqueId;

    addNewNote.push(newNote);


    fs.writeFileSync( "./db/db.json", JSON.stringify(addNewNote), (err) => {
        if (err) throw err;
        res.json(addNewNote);
    });

});

app.delete("/app/notes/:id", (req, res) => {
    

    let noteId = req.params.id;

    let addNewNote = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));

    const deleteThisNote = addNewNote.filter(deletedNote => deletedNote.id != noteId);

    fs.writeFileSync("./db/db.json", JSON.stringify(deleteThisNote), (err) => {

        if (err) throw err;

        res.json(addNewNote);

        console.log("Your note has been deleted.");

    })

});


//wild cards always last route
app.get("*", (req, res) => {

    res.sendFile(path.join(__dirname, "/public/index.html"));

});



app.listen(PORT, function(){
    console.log("App is listeing on port " + PORT);
});



// DELETE /api/notes/:id - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique id when it's saved. In order to delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.

// User Story
// AS A user, I want to be able to write and save notes
// I WANT to be able to delete notes I've written before
// SO THAT I can organize my thoughts and keep track of tasks I need to complete

// Business Context
// For users that need to keep track of a lot of information, it's easy to forget or be unable to recall something important. Being able to take persistent notes allows users to have written information available when needed.