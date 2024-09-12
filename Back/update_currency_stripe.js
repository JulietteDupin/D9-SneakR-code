const db = require('./config/db');
const stripe = require('stripe')('sk_test_51PvHtDI2zoQhkaff8YhqT9DGZSBs8abMehaSqWbclwzCJqyrD23tScvgz74WrdF2o92VMUVhc7rXtE0Kflm87qpq00DY3TjgLJ');

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function updateCurrency() {
  try {
    const [sneakers] = await db.query('SELECT * FROM sneakers;');

    if (!Array.isArray(sneakers)) {
      throw new Error('Unexpected result format from db.query');
    }

    for (const sneaker of sneakers) {
      try {
        if (sneaker.id % 25 === 0) {
          await delay(1050);
        }

        if(sneaker.stripe_price_id != null) {
            const price = await stripe.payout.update(sneaker.stripe_price_id, { 
                currency: 'eur'
            });
        }

      } catch (error) {
        console.error(`Error updating sneaker ID ${sneaker.id}:`, error.message);
      }
    }
  } catch (error) {
    console.error('Error fetching sneakers:', error.message);
  }
}

updateCurrency();
