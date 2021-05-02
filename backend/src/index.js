const express = require("express");
const db = require("./database/connection.js");

const app = express();

app.use(express.json());

const userRouter = require('./routers/user');
const noticiaRouter = require('./routers/noticia');

app.use(userRouter);
app.use(noticiaRouter);
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to fakenews application." });
});

console.log("oi")

// set port, listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});