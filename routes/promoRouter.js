const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();
promoRouter.use(bodyParser.json());


promoRouter.route('/' )
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-type','text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send all the promotions to you');
})
.post( (req,res,next)=> {
    res.end('Will add the promotion: '+req.body.name +
        ' with details: '+ req.body.description);
})
.put((req,res,next) => {
    res.end('PUT operation not supported on /promotions');
    res.statusCode = 403;
})
.delete((req,res,next) => {
    res.end('deleting all the promotions');
});




promoRouter.route('/:promoId')
.get((req,res,next) => {
    res.end('Will send details of the promotion: '+
        req.params.promoId);
})
.post((req,res,next)=> {
    res.statusCode = 403;
    res.end('POST operation not supported on /promotions/'+
        req.params.promoId);

})
.put((req,res,next) => {
    res.end('Updating the promotion: '+req.params.promoId+'\n'+
        ' update the promotion: '+ req.body.name+
        ' with details: '+req.body.description);
    res.statusCode = 403;
})
.delete((req,res,next) => {
    res.end('deleting the promotion: '+req.params.promoId);
});

module.exports = promoRouter;