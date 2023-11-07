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
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// acessing routes
app.get("/api/notes", (req, res) => {
  // fs.readFile("./db/db.json", (err, data) => {
  //   if (err) throw err;
  //   let dbData = JSON.parse(data);

  //   res.json(dbData);
  // });
  res.json(notesDB);
});

app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/notes.html"))
);

// posting notes
app.post("/api/notes", (req, res) => {
  const newNote = {
    text: req.body.text,
    title: req.body.title,
    id: uuidv4(),
  };

  notesDB.push(newNote);

  fs.writeFileSync("./db/db.json", JSON.stringify(notesDB));

  res.json(db);
});

// to delete notes
app.delete("/api/notes/:id", (req, res) => {
  const newDb = notesDB.filter((note) => note.id !== req.params.id);

  fs.writeFileSync("./db/db.json", JSON.stringify(newDb));

  readFile.json(newDb);
});

app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "./public/index.html"))
);

// calling the port
app.listen(PORT, () =>
  console.log(`app listening at http://localhost:${PORT}`)
);
