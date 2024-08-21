var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function(req, res, next) {
    if (req.query.atest) {
        res.sendFile(path.resolve(__dirname + '/../public/paywallA.html'));
    } else {
        res.sendFile(path.resolve(__dirname + '/../public/paywallB.html'));
    }
});

module.exports = router;
