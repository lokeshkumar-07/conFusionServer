var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');

var authenticate = require('../authenticate');
var cors = require('./cors');


var User = require('../models/user'); 


var router = express.Router();
router.use(bodyParser.json());

/* GET users listing. */
router.options('*', cors.corsWithOptions, (req,res) => { res.sendStatus(200); });
router.get('/', cors.corsWithOptions, authenticate.verifyUser, authenticate.adminUser, (req, res, next) =>  {
  User.find({})
  .then((users) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    res.json(users);
  })
  .catch((err) => {
    res.statusCode = 500;
    res.setHeader('Content-Type','application/json');
    res.json({err: err});
  })
});

router.post('/signup',cors.corsWithOptions, (req,res,next) => {
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

router.post('/login', cors.corsWithOptions,  (req,res,next) => {

  passport.authenticate('local', (err, user, info) => {
    if(err)
      return next(err);
    
    if(!user){
      res.statusCode = 401;
      res.setHeader('Content-Type','application/json');
      res.json({succes: false, status: 'LogIn Unsuccessful!', err: info })
    }

    req.logIn(user, (err) => {

      if(err) {
        res.statusCode = 401;
        res.setHeader('Content-Type','application/json');
        res.json({succes: false, status: 'LogIn Unsuccessful!', err: 'Could not user LogIN!' })
      }

      var token = authenticate.getToken({_id: req.user._id});
      res.statusCode = 200;
      res.setHeader('Content-Type','application/json');
      res.json({succes: true, status: 'Login SuccessFully!', token: token })

    })
  })(req,res,next);
})


router.get('/logout', (req,res,next) => {
  if(req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else{
    var err = new Error('you are not Logged In!');
    err.status = 403;
    return next(err);
  }
});

router.get('/facebook/token', passport.authenticate('facebook-token'), (req, res) => {
  if(req.user) {
    var token = authenticate.getToken({_id: req.user._id});
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    res.json({succes: true, token: token, staus: 'You are Logged In Successfully' })
  }
})

router.get('/checkJWTToken', cors.corsWithOptions, (req,res) => {
  passport.authenticate('jwt', {session: false}, (err, user, info) => {
    if(err)
      return next(err);

    if(!user){
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      return res.json({status: 'JWT inValid', success: false, err: info});
    }
    else{
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      return res.json({status: 'JWT Valid', success: false, user: info});
    }

  })(req,res);
})
module.exports = router;
