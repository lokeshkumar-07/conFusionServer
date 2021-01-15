const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());


leaderRouter.route('/' )
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-type','text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send all the leaders to you');
})
.post( (req,res,next)=> {
    res.end('Will add the leader: '+req.body.name +
        ' with details: '+ req.body.description);
})
.put((req,res,next) => {
    res.end('PUT operation not supported on /leaders');
    res.statusCode = 403;
})
.delete((req,res,next) => {
    res.end('deleting all the leaders');
});




leaderRouter.route('/:leaderId')
.get((req,res,next) => {
    res.end('Will send details of the leader: '+
        req.params.leaderId);
})
.post((req,res,next)=> {
    res.statusCode = 403;
    res.end('POST operation not supported on /leaders/'+
        req.params.leaderId);

})
.put((req,res,next) => {
    res.end('Updating the leader: '+req.params.leaderId+'\n'+
        ' update the leader: '+ req.body.name+
        ' with details: '+req.body.description);
    res.statusCode = 403;
})
.delete((req,res,next) => {
    res.end('deleting the leader: '+req.params.leaderId);
});

module.exports = leaderRouter;