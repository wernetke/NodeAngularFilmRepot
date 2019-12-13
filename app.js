var express = require('express');
var app = express();
var db = require('./db');
var cors = require('cors');

app.use(cors());
const mongoose = require('mongoose');

db = mongoose.connection;
db.on("error", () => {
    console.log("> error occurred from the database");
});
db.once("open", () => {
    console.log("> successfully opened the database");
});

var UserTest = require('./controller/UserController');
app.use('/registers', UserTest);






module.exports = app;