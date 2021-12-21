// Import express module and data.json
const express = require("express");
const { projects } = require("./data/data.json");

//declaring app as express

const app = express();

// middleware to handale cliend files, and set view engine settings to pug
app.use("/static", express.static("public"));
app.set("view engine", "pug");

//routes handlers
//index route
app.get("/", (req, res, next) => {
  res.render("index", { projects });
});
// about route
app.get("/about", (req, res, next) => {
  res.render("about");
});

//project ${id} route
app.get("/project/:id", (req, res, next) => {
  const { id } = req.params;
  res.render(`project`, { project: projects[id] });
});

//error handlers
app.use((req, res, next) => {
  const err = new Error("404 Error called");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status = 404;
    return res.render("page-not-found", { err });
  } else {
    err.message = err.message || `Some error with the server`;
    res.status(err.status || 500).render("error", { err });
  }
});

// running local server on port: 3000
app.listen(3000, () => {
  console.log(`Local server start at localhost:3000`);
});
