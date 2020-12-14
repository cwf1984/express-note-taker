// Create an application that can be used to write, save, and delete notes. This application will use an express backend and save and retrieve note data from a JSON file.


// The application frontend has already been created, it's your job to build the backend and connect the two.

const express = require("express");
const cors = require("cors");
const path = require("path");
const http = require("http");
const fs = require("fs");

const PORT = 3000;
const app = express();



//takes query bar and codes any variables out of it requested
app.use(express.urlencoded({ extended: true })); //allows any type of data not just strings and arrays
app.use(express.json());
app.use(cors()); //allows all cors request
// The following HTML routes should be created:

const jsonHolder = JSON.parse(fs.readFileSync(path.join(__dirname, "/db/db.json")));


// GET /notes - Should return the notes.html file.
//static routes
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});




// GET /api/notes - Should read the db.json file and return all saved notes as JSON.


// POST /api/notes - Should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.
//route
app.get("/api/notes", (req, res) => {
    

    //move jsonHolder into this function so it reads everytime hit end point
    res.json(jsonHolder);

})

//route
app.post("/api/notes", (req, res) => {

    //params - signify id #s or ways to route not pass info
    console.log(req.params.id);
    console.log(req.query.id);
    console.log(req.body);
    res.end();

})

app.delete("/app/notes/:id", (req, res) => {

})


//wild cards always last route
app.get("*", (req, res) => {
    //serve index.html file - sending file to the response
    res.sendFile(path.join(__dirname, "/public/index.html"));
});



app.listen(PORT, function(){
    console.log("App is listeing on port " + PORT);
});




// The application should have a db.json file on the backend that will be used to store and retrieve notes using the fs module.


// The following API routes should be created:





// DELETE /api/notes/:id - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique id when it's saved. In order to delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file.

// User Story
// AS A user, I want to be able to write and save notes
// I WANT to be able to delete notes I've written before
// SO THAT I can organize my thoughts and keep track of tasks I need to complete

// Business Context
// For users that need to keep track of a lot of information, it's easy to forget or be unable to recall something important. Being able to take persistent notes allows users to have written information available when needed.