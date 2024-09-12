const db = require('./config/db');

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

function convertISOToMySQLDateTime(isoDateString) {
  if (isoDateString == '') {
    return null;
  }
  const date = new Date(isoDateString);
  // Extract components
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  // Return MySQL DATETIME format
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

async function fillSneakersDB() {
  for(page = 0; page <= 1969; page++) {
    const filePath = 'sneakers.json';
      const response = await fetch(`http://54.37.12.181:1337/api/sneakers?pagination%5Bpage%5D=${page}`);
      const sneakers = await response.json();
      const jsonData = JSON.stringify(sneakers);

        sneakers.data.forEach(
          async function(sneaker)
          {
            try {
              const product = await db.query(`
            INSERT INTO sneakers (
              brand, colorway, estimatedMarketValue, gender, image, 
              links, name, releaseDate, releaseYear, retailPrice, silhouette, sku, story, 
              UID, createdAt, updatedAt, publishedAt
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [sneaker.attributes.brand, sneaker.attributes.colorway, sneaker.attributes.estimatedMarketValue, sneaker.attributes.gender, JSON.stringify(sneaker.attributes.image), 
                  JSON.stringify(sneaker.attributes.links), sneaker.attributes.name, convertISOToMySQLDateTime(sneaker.attributes.releaseDate), sneaker.attributes.releaseYear, sneaker.attributes.retailPrice, sneaker.attributes.silhouette, sneaker.attributes.sku, sneaker.attributes.story, 
                  sneaker.attributes.UID, convertISOToMySQLDateTime(sneaker.attributes.createdAt), convertISOToMySQLDateTime(sneaker.attributes.updatedAt),convertISOToMySQLDateTime(sneaker.attributes.publishedAt)]
              );    
            } catch (error) {
              console.log("error", error.message);
              console.log("product", sneaker);
            }
        });
      }
      console.log("end fill DB");
}

async function postSneakersInStripe() {
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

async function setStripeSnickerId() {
  console.log("set stripe id");
  const stripe = require('stripe')("sk_test_51PvHtDI2zoQhkaff8YhqT9DGZSBs8abMehaSqWbclwzCJqyrD23tScvgz74WrdF2o92VMUVhc7rXtE0Kflm87qpq00DY3TjgLJ");

  try {
    await delay(1200)
    var products = await stripe.products.list({
      limit: 100,
    });
    while(products.data.length > 99) {
      await delay(1050)
      products.data.forEach(async function(product) {
        db.query("UPDATE sneakers SET stripe_price_id = ? WHERE name = ?", [product.default_price, product.name])
      })
      products = await stripe.products.list({
        limit: 100,
        starting_after: products.data[99].id
      });  
    }
  } catch (error) {
    console.log(" setStripeSnickerId error", error.message);
  } 
}

fillSneakersDB().then (() => setStripeSnickerId())
