const fs = require('fs');
const db = require('./config/db');

function convertISOToMySQLDateTime(isoDateString) {
  const date = new Date(isoDateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

const cleanString = (input) => {
  if (typeof input !== 'string')
    return input;
  return input
    .replace(/[\u200B-\u200D\uFEFF\u202A-\u202E\u0000-\u001F\u007F-\u009F]/g, '')
    .replace(/[^\x00-\x7F]/g, '')
    .trim();
}

function getShoeSizes(category) {
  const sizes = {
    men: {
      "41": {stock: "50"},
      "42": {stock: "50"},
      "43": {stock: "50"},
      "44": {stock: "50"},
      "45": {stock: "50"},
      "46": {stock: "50"}
    },
    women: {
      "37": {stock: "50"},
      "38": {stock: "50"},
      "39": {stock: "50"},
      "40": {stock: "50"},
      "41": {stock: "50"}
    },
    youth: {
      "36": {stock: "50"},
      "37": {stock: "50"},
      "38": {stock: "50"},
      "39": {stock: "50"}
    },
    infant: {
      "17": {stock: "50"},
      "18": {stock: "50"}
    },
    preschool: {
      "28": {stock: "50"},
      "29": {stock: "50"},
      "30": {stock: "50"}
    },
    child: {
      "25": {stock: "50"},
      "26": {stock: "50"},
      "27": {stock: "50"},
      "28": {stock: "50"}
    },
    toddler: {
      "21": {stock: "50"},
      "22": {stock: "50"},
      "23": {stock: "50"},
      "24": {stock: "50"},
      "25": {stock: "50"}
    },
    unisex: {
      "38": {stock: "50"},
      "39": {stock: "50"},
      "40": {stock: "50"},
      "41": {stock: "50"},
      "42": {stock: "50"},
      "43": {stock: "50"}
    }
  };
  return JSON.stringify(sizes[category] || sizes['unisex']);
}

async function updateSneakersStock() {
  try {
    for (let page = 0; page <= 1969; page++) {
      const response = await fetch(`http://54.37.12.181:1337/api/sneakers?pagination%5Bpage%5D=${page}`);
      const data = await response.json();

      // Ensure data is properly structured
      if (!data || !data.data) {
        console.log("No data found for page ${page}");
        continue;
      }

      for (const sneaker of data.data) {
        try {
          const { name, gender } = sneaker.attributes;
          const sizes = getShoeSizes(gender);

          await db.query("UPDATE sneakers SET stock=? WHERE name = ?", [sizes, name]);
        } catch (error) {
          console.log("Error updating sneaker with name ${sneaker.attributes.name}: ${error.message}");
        }
      }
    }
  } catch (error) {
    console.log('Error fetching or updating sneakers:', error.message);
  }
}

async function getSneakersFromApi() {

  for (page = 0; page <= 1969; page++) {
    const response = await fetch(`http://54.37.12.181:1337/api/sneakers?pagination%5Bpage%5D=${page}`);
    const sneakers = await response.json();
    const jsonData = JSON.stringify(sneakers);


    sneakers.data.forEach(
      async function (sneaker) {
        try {

          const product = await db.query(`
            INSERT INTO sneakers (
              brand, colorway, estimatedMarketValue, gender, image,
              links, name, releaseYear, retailPrice, silhouette, sku, story,
              UID, createdAt, updatedAt, publishedAt, stock
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [sneaker.attributes.brand, sneaker.attributes.colorway, sneaker.attributes.estimatedMarketValue, sneaker.attributes.gender, JSON.stringify(sneaker.attributes.image),
            JSON.stringify(sneaker.attributes.links), sneaker.attributes.name, sneaker.attributes.releaseYear, sneaker.attributes.retailPrice, sneaker.attributes.silhouette, cleanString(sneaker.attributes.sku), sneaker.attributes.story,
            sneaker.attributes.UID, convertISOToMySQLDateTime(sneaker.attributes.createdAt), convertISOToMySQLDateTime(sneaker.attributes.updatedAt), convertISOToMySQLDateTime(sneaker.attributes.publishedAt), getShoeSizes(sneaker.attributes.gender)]
          );
        } catch (error) {
          console.log("error", error.message);
        }
      });
  }
}

async function getSneaker(id) {
  const response = await fetch(`http://54.37.12.181:1337/api/sneakers/${id}`);
  const sneaker = await response.json();

  return sneaker;
}

module.exports = {
  getSneakersFromApi,
  getSneaker
};

updateSneakersStock()