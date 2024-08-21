var express = require('express');
var router = express.Router();
var path = require('path');

router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/login', function(req, res, next) {
    let result = req.body;
    if (result.password === '1234') {
        res.send(JSON.stringify({
            status: 'ok'
        }));
        return;
    }
    res.send(JSON.stringify({
        status: 'wrong password'
    }));
});

router.get('/checkout', function(req, res, next) {
  res.sendFile(path.resolve(__dirname + '/../public/checkout.html'));
});

module.exports = router;
