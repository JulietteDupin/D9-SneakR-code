import fs from 'fs'

export async function getSneakers() {
    const filePath = 'sneakers.json';
    const response = await fetch("http://54.37.12.181:1337/api/sneakers");
    const sneakers = await response.json();
    const jsonData = JSON.stringify(sneakers);

    try {
        fs.writeFileSync(filePath, jsonData);
        console.log('Sneakers data saved to file successfully.');
      } catch (error) {
        console.error('Error writing sneakers data to file:', error);
      }      
  }
  

export async function getSneaker(id) {
    const response = await fetch(`http://54.37.12.181:1337/api/sneakers/${id}`);
    const sneaker = await response.json();

    return sneaker;
}   
