var key;
function parse(str) {
  str = str.split(', ');
  var result = {};
  for (var i = 0; i < str.length; i++) {
    var cur = str[i].split('=');
    result[cur[0]] = cur[1];
  };

  return result;
};

module.exports = function (app, db) {
  const cookieParser = require('cookie-parser');
  app.use(cookieParser());

  app.get('/anime', (req, res) => {
    var cursor = db.collection('anime').find().toArray((err, results) => {
      res.send(results);
    });
  });

  app.post('/login', (req, res) => {
    const account = req.body;
    details = {
      username: account.user,
    };
    console.log(account);
    db.collection('acounts').findOne(details, (err, results) => {
      if (results) {
        key = results.password;
        console.log(results);
        if (account.password == key) {
          res.cookie('username=' + details.username + '; path=/');
          res.send('200');
          console.log('success');
        } else {
          res.send('Error');
        };
      } else {
        res.send('Error');
      };
    });

  });

  app.post('/add', (req, res) => {
    let details = req.body;
    details.votes = 0;
    db.collection('anime').count({}, (err, num) => {
      details.id = num;
      db.collection('anime').insert(details, (err, results) => {
        if (err) {
          res.send(err);
        } else {
          res.send(results.ops[0]);
        };
      });
      console.log(details);
    });
  });

  app.post('/logout', (req, res) => {
    let detail = req.body.cookies;
    detail = parse(detail);
    console.log(detail);
    res.clearCookie('username');
    console.log('cleared');
    res.send(detail.username);
  });

  app.post('/getProfile', (req, res) => {
    let details = req.body;
    console.log(details);
    db.collection('acounts').findOne(details, (err, results) => {
      if (results) {
        let result = results;
        delete result.password;
        console.log(result);
        res.send(result);
      };
    });
  });
};
