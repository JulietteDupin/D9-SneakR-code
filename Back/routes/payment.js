const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const db = require('../config/db');

router.use(express.json());

function select_stripe_props(line_items) {
  const {stripe_price_id, quantity} = line_items;
  return {price: stripe_price_id, quantity};
}

router.post('/create-payment-intent', async (req, res) => {
  console.log("create payment intent")
  console.log("req", req);
  console.log("body", req.body);
  const { email, line_items } = req.body; // Amount should be in the smallest currency unit (e.g., cents for USD)

  try {
    const customer = await db.query("SELECT * FROM users WHERE email = ?", [email])

    console.log(">line_items", line_items.map(select_stripe_props));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer: customer.stripe_customer_id, // ex : "cus_QnBExMh9cwI5oM",
      line_items: line_items.map(select_stripe_props),
      // line_items : [
      //   {
      //     price: req.body.price_id, // Identifiant du prix dans Stripe
      //     quantity: req.body.quantity, // Quantité d'articles
      //   },
      // ],
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
