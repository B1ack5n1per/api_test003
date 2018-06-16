var key;

module.exports = function (app, db) {
  app.get('/anime', (req, res) => {
    var cursor = db.collection('anime').find().toArray((err, results) => {
      res.send(results);
    });
  });

  app.post('/login', (req, res) => {
    const account = req.body;
    let details = { username: account.user };
    console.log(account);
    db.collection('acounts').findOne(details, (err, results) => {
      key = results.password;
      console.log(results);
      if (account.password == key) {
        res.send('200');
        console.log('success');
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
};
