var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var User = require('../model/user-model');

router.get('/', function (req, res) {
 /*   Matiere.getmatieres(function(err,rows){
        if(err) {
            res.status(400).json(err);
        }
        else
        {
            res.json(rows);
        }
    });*/
});

router.post('/', function (req, res) {
    console.log('Save user');

    var testUser = new User({
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        firstname: req.body.firstname,
         email: req.body.email
    });
// save user to database
    User.findOne({username: req.body.username}, function(err, user) {
        if (err) throw err;

        // test a matching password
        user.comparePassword(req.body.password, function(err, isMatch) {
            if (err) throw err;
            console.log('Password123:', isMatch); // -> Password123: true
        });

        // test a failing password
        user.comparePassword(req.body.password, function(err, isMatch) {
            if (err) throw err;
            console.log('123Password:', isMatch); // -> 123Password: false
        });
    });
    /*
    testUser.save(function(err) {
        if (err) throw err;
    });*/
});

module.exports = router;