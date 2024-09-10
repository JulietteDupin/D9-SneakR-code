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
  const { email, line_items } = req.body;

  try {
    const customer = await db.query("SELECT * FROM users WHERE email = ?", [email])


    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer: customer.stripe_customer_id, // ex : "cus_QnBExMh9cwI5oM",
      line_items: line_items.map(select_stripe_props),
      mode: 'payment',
      success_url: `${process.env.VITE_APP_CLIENT_URL}/payment/success`, // URL for payment success
      cancel_url: `${process.env.VITE_APP_CLIENT_URL}/payment/cancel`, // URL for payment error
    });

    res.json({session_id: session.id});
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});


router.post('/payment-success/:user_id', async (req, res) => {
  const { user_id } = req.params;

  try {
    const user_data = await db.query("SELECT * FROM users WHERE id = ?", [user_id]);
    const cartItems = JSON.parse(user_data[0][0].cart);

    for (const cart_item of cartItems) {
      const item_selected = await db.query("SELECT * FROM sneakers WHERE name = ?", [cart_item.name]);
      
      if (item_selected.length > 0) {
        const stock = JSON.parse(item_selected[0][0].stock);

        // Ensure stock values are integers before performing arithmetic
        if (stock[cart_item.size] && stock[cart_item.size].stock) {
          stock[cart_item.size].stock = parseInt(stock[cart_item.size].stock) - parseInt(cart_item.quantity);
        }
        
        console.log("update stock", stock);
        await db.query("UPDATE sneakers SET stock = ? WHERE name = ?", [JSON.stringify(stock), cart_item.name]);
      }
    }

    // Clear user's cart after processing payment
    await db.query("UPDATE users SET cart = '{}' WHERE id = ?", [user_id]);
    res.status(200).send({ message: "Stock updated and cart cleared successfully." });

  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});


module.exports = router;
