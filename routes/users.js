var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');

var authenticate = require('../authenticate');


var User = require('../models/user'); 


var router = express.Router();
router.use(bodyParser.json());

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', (req,res,next) => {
  User.register(new User({username: req.body.username}), 
    req.body.password, (err, user) => {
    if(err) {
      res.statusCode = 500;
      res.setHeader('Content-Type','application/json');
      res.json({err: err});
    }
    else{
      if(req.body.firstname){
        user.firstname = req.body.firstname;
      }
      if( req.body.lastname){
        user.lastname = req.body.lastname;
      }
      user.save((err,user) => {
        if(err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json')
          res.json({err: err});
          return ; 
        }
        passport.authenticate('local')(req,res, () => {
          res.statusCode = 200;
          res.setHeader('Content-Type','application/json');
          res.json({succes: true, staus: 'Registration Successful' });
        });
      });

    }
  });
});

router.post('/login', passport.authenticate('local'), (req,res,next) => {

  var token = authenticate.getToken({_id: req.user._id});
  res.statusCode = 200;
  res.setHeader('Content-Type','application/json');
  res.json({succes: true, token: token, staus: 'You are Logged In Successful' })
})


router.get('/logout', (req,res,next) => {
  if(req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else{
    var err = new Erro('you are not Logged In!');
    err.status = 403;
    return next(err);
  }
});
module.exports = router;
