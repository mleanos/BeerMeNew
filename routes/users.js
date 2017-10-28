var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

// get users info from database
router.get("/api/userdata", function(req, res) {
  console.log('models: ', models);
    models.User.findOne({ where: { id: req.user.user_id } })
      .then(user => {
        console.log('found user from model findOne!');
        console.log('user: ', user);
        res.json(user);
      })
      .catch(err => {
        console.log('err in User.findOne!');
        console.log(err);
        res.status(400).send({
          message: err.message
        });
      });
});
