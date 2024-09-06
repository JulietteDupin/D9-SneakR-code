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
  .replace(/[^\x00-\x7F]/g, '') // Optionally remove all non-ASCII characters 
  .trim(); 
}
async function getSneakersFromApi() {
 
  for(page = 0; page <= 1969; page++) {
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
              links, name, releaseYear, retailPrice, silhouette, sku, story,
              UID, createdAt, updatedAt, publishedAt
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [sneaker.attributes.brand, sneaker.attributes.colorway, sneaker.attributes.estimatedMarketValue, sneaker.attributes.gender, JSON.stringify(sneaker.attributes.image),
                  JSON.stringify(sneaker.attributes.links), sneaker.attributes.name, sneaker.attributes.releaseYear, sneaker.attributes.retailPrice, sneaker.attributes.silhouette, cleanString(sneaker.attributes.sku), sneaker.attributes.story,
                  sneaker.attributes.UID, convertISOToMySQLDateTime(sneaker.attributes.createdAt), convertISOToMySQLDateTime(sneaker.attributes.updatedAt),convertISOToMySQLDateTime(sneaker.attributes.publishedAt)]
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

getSneakersFromApi()