var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;

// get users info from database
router.get("/api/userdata", function(req, res) {
    connection.query("SELECT * FROM users WHERE username=?", ["texast9018"], function(err, data) {
        if (err) {
            throw err;
        }
        else {
            console.log(data);
        }

        res.json(data);
    });
});
