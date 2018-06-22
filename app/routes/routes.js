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
    db.collection('anime').find().toArray((err, results) => {
      for (let i = 0; i < results.length; i++) {
        db.collection('acounts').find({
          vote_id: (i + 1),
        }).toArray((er, result) => {
          db.collection('anime').updateOne(results[i], {
            $set: {
              votes: result.length,
            },
          }, (err, resul) => {});
        });
      }

      res.send(results);
    });
  });
  app.post('/anime', (req, res) => {
    let details = Number(req.body.id);
    let query = {
      id: details,
    };
    console.log(query);
    var cursor = db.collection('anime').findOne(query, (err, results) => {
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
      console.log(results);
      if (results) {
        let result = results;
        delete result.password;
        console.log(result);
        res.send(result);
      } else {
        res.send('Please Sign In');
      };
    });
  });
  app.post('/register', (req, res) => {
    let details = req.body;
    let query = {
      username: details.username,
    };
    let detail = {
      username: details.username,
      password: details.password,
      vote_id: 0,
      email: details.email,
      admin: false,
    };
    if (details.password === details.confirm) {
      db.collection('acounts').findOne(query, (err, results) => {
        console.log(results);
        if (results === null) {
          db.collection('acounts').insert(detail, (err, results) => {
            res.send(results.ops[0]);
          });
        } else {
          res.send('Username Taken');
        };
      });
    } else {
      res.send('error');
    };
  });
  app.put('/vote', (req, res) => {
    let voteId = req.body.id;
    let user = req.body.username;
    let details = {
      username: user,
    };
    let detail = {
      id: Number(voteId),
    };
    console.log(voteId + ' ' + user);
    db.collection('acounts').updateOne(details, {
      $set: {
        vote_id: voteId,
      },
    }, (err, results) => {
      if (results) {
        console.log(detail);
        db.collection('anime').findOne(detail, (err, result) => {
          console.log(result);
          res.send(result);
        });
      };
    });
  });
};
