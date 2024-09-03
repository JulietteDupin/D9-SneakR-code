const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Your Stripe Secret Key

router.use(express.json());

router.post('/create-payment-intent', async (req, res) => {
  const { amount } = req.body; // Amount should be in the smallest currency unit (e.g., cents for USD)

  console.log("amount", amount);
  try {
    // Create a PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      // You can add more options here based on your needs
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
