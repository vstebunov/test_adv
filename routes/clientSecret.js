var express = require('express');
var router = express.Router();
var path = require('path');
var {keys} = require('../keys');


router.get('/', async function(req, res, next) {
    const stripe = require('stripe')(keys.secret);
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 1500,
        currency: "usd",
    });
    res.json({clientSecret: paymentIntent.client_secret});
});

module.exports = router;
