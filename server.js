const express = require("express");
const homeRoutes = require("./Routes/homeRoutes");
const api = require("./Routes/apiRoutes");

const app = express();
const PORT = process.env.PORT || 8080;

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(api)
app.use(homeRoutes)

/*app.post("/api/notes", (req, res) => {
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
});*/

app.listen(PORT, () =>
  console.log(`Serving static asset routes on port ${PORT}!`)
);
