const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();
dishRouter.use(bodyParser.json());


dishRouter.route('/' )
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-type','text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send all the dishes to you');
})
.post( (req,res,next)=> {
    res.end('Will add the dish: '+req.body.name +
        ' with details: '+ req.body.description);
})
.put((req,res,next) => {
    res.end('PUT operation not supported on /dishes');
    res.statusCode = 403;
})
.delete((req,res,next) => {
    res.end('deleting all the dishes');
});




dishRouter.route('/:dishId')
.get((req,res,next) => {
    res.end('Will send details of the dish: '+
        req.params.dishId);
})
.post((req,res,next)=> {
    res.statusCode = 403;
    res.end('POST operation not supported on /dishes/'+
        req.params.dishId);

})
.put((req,res,next) => {
    res.end('Updating the dish: '+req.params.dishId+'\n'+
        ' update the dish: '+ req.body.name+
        ' with details: '+req.body.description);
    res.statusCode = 403;
})
.delete((req,res,next) => {
    res.end('deleting the dish: '+req.params.dishId);
});

module.exports = dishRouter;