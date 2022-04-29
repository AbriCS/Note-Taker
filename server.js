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

//fires the server into brower or PORT8080
app.listen(PORT, () =>
  console.log(`Serving static asset routes on port ${PORT}!`)
);
