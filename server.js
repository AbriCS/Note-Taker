const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 80;
const { v4: uuidv4 } = require("uuid");
uuidv4();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// reads db.json and sets the data string to a variable
let newNote;
function readDb() {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    newNote = data;
  });
}
readDb();

//matching the fetch/get in server.js
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/db/db.json"))
);

app.post("/api/notes", (req, res) => {
  let addedNote = JSON.parse(newNote); // changes array/string of characters into a JavasScript object JSON
  //addedNote is the array
  req.body.id = uuidv4();
  addedNote.push(req.body);

  fs.writeFile("./db/db.json", JSON.stringify(addedNote), (err) =>
    err ? console.error(err) : console.log(`New Information on Database`)
  );

  res.send(req.body);
  readDb();
});

//delete note
app.delete("/api/notes/${id}", (req, res) => {
  console.log(req);
  //const {id} = req.params
  //res.send(id);
});

app.listen(PORT, () =>
  console.log(`Serving static asset routes on port ${PORT}!`)
);
