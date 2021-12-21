const express = require("express");
const { projects } = require("./data/data.json");

const app = express();

app.use("/static", express.static("public"));
app.set("view engine", "pug");

app.get("/", (req, res, next) => {
  res.render("index", { projects });
});

app.get("/about", (req, res, next) => {
  res.render("about");
});

app.get("/project/:id", (req, res, next) => {
  const { id } = req.params;
  console.log(projects[id]);
  res.render(`project`, { project: projects[id] });
});

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

app.listen(3000);
