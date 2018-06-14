module.exports = function (app, db) {
  app.get('/anime', (req, res) => {
      var cursor = db.collection('anime').find().toArray((err, results) => {
        res.send(results);
      });
    });
  app.get('/login', (req, res) => {
    console.log('login atempted');
    res.send('login atempted');
  });
};
