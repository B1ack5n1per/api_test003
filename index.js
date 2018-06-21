<<<<<<< HEAD
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const path = require('path');
const db = require('./config/db');
const cookieParser =  require('cookie-parser');
const fs = require('fs');
const jsonParser = bodyParser.json();
const port = process.env.PORT || 3000;
const favicon = require('serve-favicon');
var app = express();

function init() {
  console.log('Server started on port:' + 3000);
};

app.use(express.static(path.join(__dirname, 'Frontend')));
app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err);
  require('./app/routes/routes')(app, database);
  app.listen(port, init);
});
=======
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const path = require('path');
const db = require('./config/db');
const cookieParser =  require('cookie-parser');
const fs = require('fs');
const jsonParser = bodyParser.json();
const port = process.env.PORT || 3000;
const favicon = require('serve-favicon');
var app = express();

function init() {
  console.log('Server started on port:' + 3000);
};

app.use(express.static(path.join(__dirname, 'Frontend')));
app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(db.url, (err, database) => {
  if (err) return console.log(err);
  require('./app/routes/routes')(app, database);
  app.listen(port, init);
});
>>>>>>> ec3ea128864ee9e4c37da1bb16a2a4fdad156a6c
