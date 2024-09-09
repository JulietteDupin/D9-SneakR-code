const db = require('./config/db');
const stripe = require('stripe')('sk_test_51PvHtDI2zoQhkaff8YhqT9DGZSBs8abMehaSqWbclwzCJqyrD23tScvgz74WrdF2o92VMUVhc7rXtE0Kflm87qpq00DY3TjgLJ');

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Wrap the code in an async function
async function updateCurrency() {
  try {
    // Await the query and destructure the result if needed
    const [sneakers] = await db.query('SELECT * FROM sneakers;');

    // Check if sneakers is an array
    if (!Array.isArray(sneakers)) {
      throw new Error('Unexpected result format from db.query');
    }

    // Use forEach with async function to update each sneaker price
    for (const sneaker of sneakers) {
      try {
        if (sneaker.id % 25 === 0) {
          await delay(1050); // Delay to avoid hitting rate limits
        }

        // Update the stripe price with the new currency
        console.log("stripe price", sneaker.stripe_price_id);
        if(sneaker.stripe_price_id != null) {
            const price = await stripe.prices.update(sneaker.stripe_price_id, { 
                currency: 'eur'
            });
        }

        console.log(`Updated price for sneaker ID ${sneaker.id}:`, price);
      } catch (error) {
        console.error(`Error updating sneaker ID ${sneaker.id}:`, error.message);
      }
    }
  } catch (error) {
    console.error('Error fetching sneakers:', error.message);
  }
}

// Call the async function to run the updates
updateCurrency();
