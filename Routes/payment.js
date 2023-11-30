const router = require('express').Router();
const paymentController = require('../Controller/paymentController');

router.post('/create-payment-intent', paymentController.createPaymentIntent);

module.exports = router;
