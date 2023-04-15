const express = require("express");
require("dotenv").config();
const db = require("./config/dbConnection.js");

const app = express();

app.listen("8080", () => {
  console.log("App started!");
});
