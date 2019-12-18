var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var User = require('../model/user-model');


router.post('/', function (req, res) {
    var testUser = new User({
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        firstname: req.body.firstname,
         email: req.body.email
    });
// save user to database
    User.findOne({username: req.body.username}, function(err, user) {
        if (err){
            res.status(400).json(err)
        }
        else if (user == null){
            testUser.save(function(err) {
                if (err) throw err;
            });
            res.json(user);
        }
        else{
            res.status(401).json(err)
        }
    });
});

module.exports = router;