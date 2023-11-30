const router = require('express').Router();
const paymentController = require('../Controller/paymentController');
const verifyUser = require('../Middleware/verifyUser');

router.post(
  '/create-payment-intent',
  verifyUser,
  paymentController.createPaymentIntent
);

module.exports = router;
