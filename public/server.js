// packages
const fs = require("fs");
const express = require("express");
const path = require("path");
const notesDB = require("./db/db.json");
const { v4: uuidv4 } = require("uuid");

// determing what port is being used
const PORT = process.env.PORT || 3001;

const app = express();

// to read public folder
app.use(express.json());
app.use(express.static("public"));

// acessing routes
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        ///error logging
        if (err) throw err;
        let dbData = JSON.parse(data);
        //Returns new database
        res.json(dbData)
    });   
})

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// posting notes
app.post("/public/notes", (req, res) => {
  const newNote = req.body;

  newNote.id = uuidv4();

  db.push(newNote);

  fs.writeFileSync("./db/db.json", JSON.stringify(db));

  res.json(db);
});

// to delete notes
app.delete("/public/notes/:id", (req, res) => {
  const newDb = notesDB.filter((note) => note.id !== req.params.id);

  fs.writeFileSync("./db/db.json", JSON.stringify(newDb));

  readFile.json(newDb);
});

// calling the port
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
