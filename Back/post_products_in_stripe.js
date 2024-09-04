const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

async function deleteAllStripeSneakers() {
  const stripe = require('stripe')("sk_test_51PvHtDI2zoQhkaff8YhqT9DGZSBs8abMehaSqWbclwzCJqyrD23tScvgz74WrdF2o92VMUVhc7rXtE0Kflm87qpq00DY3TjgLJ"); // Your Stripe Secret Key
  const products = await stripe.products.list();

  products.data.forEach(
    async function(value)
    {
      try {
        const product = await stripe.products.del(value.id);    
      } catch (error) {
        console.log("error", error.message);
      }
  });

}


async function getSneakers() {
  const fs = require('fs');
  const stripe = require('stripe')("sk_test_51PvHtDI2zoQhkaff8YhqT9DGZSBs8abMehaSqWbclwzCJqyrD23tScvgz74WrdF2o92VMUVhc7rXtE0Kflm87qpq00DY3TjgLJ");

  await delay(1200)
  for(page = 0; page <= 1969; page++) {
    await delay(1050)
    const filePath = 'sneakers.json';
      const response = await fetch(`http://54.37.12.181:1337/api/sneakers?pagination%5Bpage%5D=${page}`);
      const sneakers = await response.json();
      const jsonData = JSON.stringify(sneakers);

      try {
          fs.writeFileSync(filePath, jsonData);
          console.log('Sneakers data saved to file successfully.');
        } catch (error) {
          console.error('Error writing sneakers data to file:', error);
        }

        sneakers.data.forEach(
          async function(value)
          {
            try {
              const product = await stripe.products.create({
                name: value.attributes.name,
                default_price_data: {
                  unit_amount: value.attributes.retailPrice * 100,
                  currency: 'usd',
                },
              });    
            } catch (error) {
              console.log("error", error.message);
            }
        });
      }
}

getSneakers();

async function getSneaker(id) {
    const response = await fetch(`http://54.37.12.181:1337/api/sneakers/${id}`);
    const sneaker = await response.json();

    return sneaker;
}