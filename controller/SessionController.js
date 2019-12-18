var express = require('express');
var session = require('express-session');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.json());
var User = require('../model/user-model');

router.use(session({
    secret: "Shh, its a secret!",
    resave: false,
    saveUninitialized: true
}));

const authMiddleware = (req, res, next) => {
    if(req.session && req.session.user) {
        next();
    } else {
        res.status(403).send({
            errorMessage: 'You must be logged in.'
        });
    }
};
/**
 * User log in.
 */
router.post('/login', function (req, res) {
    User.findOne({username: req.body.username}, function(err, user) {
        if (err){
            res.status(400).json(err)
        }
        else if (user == null){
            res.status(401).json(err)
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
                    req.session.user = req.body.username;
                    req.session.role = user.role;
                    res.status(200).send({
                        user: req.session.user,
                        role: req.session.role
                    });
                }
            });
        }
    });
});

/**
 * Check if user is logged in.
 */
router.get('/login', (req, res) => {
    req.session.user ? res.status(200).send({loggedIn: true}) : res.status(200).send({loggedIn: false});
});

/**
 * Log the user out of the application.
 */
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            res.status(500).send('Could not log out.');
        } else {
            res.status(200).send({});
        }
    });
});


/**
 * Check permission session
 */
router.get('/balance', authMiddleware, (req, res) => {
    const user = req.session.user;
    const userRole = req.session.role;
    if (user && userRole === 1) {
        res.status(200).send({
            success: 'Authorized'
        })
    } else {
        res.status(403).send({
            errorMessage: 'Access Denied.'
        });
    }
});


module.exports = router;