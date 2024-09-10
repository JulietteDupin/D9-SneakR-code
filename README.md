# {EPITECH DIGITAL} | Fifth year | Web | Rest API | E-Commerce


## Description

The purpose of this project is to discover the software platform that we chose through the creation of a business application.<br />
To do this, we had to implement an E-Commerce website, `SneakR`. SneakR allows to discover and buy sneakers from an API bringing together several brands and models. The application offers an intuitive user interface, a back office for management, as well as a complete ordering system.
<br />

- `The website offers the following functionalities:`
    * The user can register and login on the website by creating an account or using Google OAuth2 (user management, authentification)
    * Complete ordering process, including adding to cart and paying.
    * User preferences with management of shoe sizes and favorite brands.

- `Tools:`
    * The frontend is made with Reactjs version 18, for a reactive and responsive web interface.
    * the backend is made with Node.js and Express, to handle the REST API and the users. 
    * MySQL is used to handle the users, products and orders.
    * a docker-compose is provided to deploy the website and allow an easy scalability.

- `Requirements:`
    * Docker version 20
    * the `docker-compose` command

## Usage
### How to launch the website

```
$ docker-compose -f docker-compose.prod.yml up --build
```

### Web version :

Open `http://localhost:5173/` (local version) <br />
Open `http://172.18.0.4:5173/` (network version)<br />
<br />
Create an account to access all our functionalities.


### Contributors

[Solène L.](https://github.com/slefeu), Juliette Dupin, Aelynn Michenet.