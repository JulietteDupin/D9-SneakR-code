const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.use(express.json());

router.post('/create-payment-intent', async (req, res) => {
  console.log("create payment intent")
  console.log("req", req);
  console.log("body", req.body);
  const { customer, line_items } = req.body; // Amount should be in the smallest currency unit (e.g., cents for USD)

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      // customer: customer, // customer id ex : "cus_QnBExMh9cwI5oM",
      // line_items: line_items,
      line_items : [
        {
          price: "price_1PvIXeI2zoQhkaffQvSQM0HT", // req.body.price_id, // Identifiant du prix dans Stripe
          quantity: 1, // req.body.quantity, // Quantité d'articles
        },
      ],
      mode: 'payment', // Changement du mode à 'payment' pour un paiement unique
      success_url: `${process.env.VITE_APP_CLIENT_URL}/payment/success`, // URL de succès après paiement
      cancel_url: `${process.env.VITE_APP_CLIENT_URL}/payment/cancel`, // URL d'annulation après paiement
    });


    console.log("payment response", session);
    console.log("payment session id", session.id);
    res.json({session_id: session.id});
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
