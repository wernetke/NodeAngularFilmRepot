var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var User = require('../model/user-model');
var functions = require ('../controller/sendMail');


router.post('/login', function (req, res) {
    User.findOne({username: req.body.username}, function(err, user) {
        if (err){
            res.status(400).json(err)
        }
        else if (user == null){
            res.status(404);
        }
        else{
            user.comparePassword(req.body.password, function(err, isMatch) {
            if (err) throw err;
            console.log('Password:', isMatch); // -> Password123: true
                if(!isMatch)
                {
                    res.status(401).json(err)
                }
                else{
                    res.status(200).json(user);
                }
            });
        }
    });
});

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