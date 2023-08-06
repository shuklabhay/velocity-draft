const express = require("express");

const admin = require("firebase-admin");
const db = require("./db");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  //Code to fecth data from the database will go here
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
