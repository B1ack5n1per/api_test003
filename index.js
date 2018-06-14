const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const path = require('path');
const db = require('./config/db');
const fs = require('fs');

var app = express();

function init() {
  console.log('Server started on port:' + 3000);
};

app.get('/home', (req, res) => {
  res.sendFile(path.join(__dirname + '/Frontend/home/index.html'));
});
app.get('/styles.css', (req, res) => {
  res.sendFile(path.join(__dirname + '/Frontend/home/styles.css'));
});
app.get('/main.js', (req, res) => {
  res.sendFile(path.join(__dirname + '/Frontend/home/main.js'));
});
app.get('/global_styles.css', (req, res) => {
  res.sendFile(path.join(__dirname + '/Frontend/global_styles.css'));
});

MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err);
  require('./app/routes/routes')(app, database);
  app.listen(3000, init);
});
