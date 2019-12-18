var express = require('express');
var app = express();
var cors = require('cors');
var db = require('./db');
var UserTest = require('./controller/UserController');
var ApiSession = require('./controller/SessionController');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


app.use(cors({credentials: true}));

app.use(bodyParser.json());

db = mongoose.connection;
db.on("error", () => {
    console.log("> error occurred from the database");
});
db.once("open", () => {
    console.log("> successfully opened the database");
});

app.use('/api/registers', UserTest);
app.use('/api', ApiSession);


module.exports = app;