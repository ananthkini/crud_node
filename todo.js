const router = require('express').Router();


router.get('/', function(req,res){

    res.send([
        {
            title:'Hello'
        }
    ])
})

module.exports = router;