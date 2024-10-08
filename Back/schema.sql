ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'pass';

FLUSH PRIVILEGES;

CREATE DATABASE SneakR;

USE SneakR;

DROP TABLE IF EXISTS `sneakers`;
DROP TABLE IF EXISTS `users`;

CREATE TABLE `sneakers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `brand` varchar(255) DEFAULT NULL,
  `colorway` varchar(255) DEFAULT NULL,
  `estimatedMarketValue` decimal(10,2) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `links` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `releaseDate` datetime DEFAULT NULL,
  `releaseYear` varchar(255) DEFAULT NULL,
  `retailPrice` decimal(10,2) DEFAULT NULL,
  `silhouette` varchar(255) DEFAULT NULL,
  `sku` varchar(255) DEFAULT NULL,
  `story` text DEFAULT NULL,
  `UID` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `publishedAt` datetime DEFAULT NULL,
  `createdBy_id` int(11) DEFAULT NULL,
  `createdBy_firstname` varchar(255) DEFAULT NULL,
  `createdBy_lastname` varchar(255) DEFAULT NULL,
  `createdBy_username` varchar(255) DEFAULT NULL,
  `createdBy_email` varchar(255) DEFAULT NULL,
  `createdBy_isActive` tinyint(1) DEFAULT NULL,
  `updatedBy_id` int(11) DEFAULT NULL,
  `updatedBy_firstname` varchar(255) DEFAULT NULL,
  `updatedBy_lastname` varchar(255) DEFAULT NULL,
  `updatedBy_username` varchar(255) DEFAULT NULL,
  `updatedBy_email` varchar(255) DEFAULT NULL,
  `updatedBy_isActive` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

<<<<<<< HEAD
LOCK TABLES `sneakers` WRITE;
UNLOCK TABLES;

DROP TABLE IF EXISTS `users`;
=======
>>>>>>> f0116628378b0f247c7225fe835209068d9e9668
CREATE TABLE `users` (
  `id` int(11) AUTO_INCREMENT,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `isActive` tinyint(1) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `accountCreated` datetime DEFAULT NULL,
  `birthdate` datetime DEFAULT NULL,
  `number` int(11) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);
<<<<<<< HEAD

LOCK TABLES `users` WRITE;
UNLOCK TABLES;
=======

-- Optional: Lock tables for certain operations (usually not needed during schema setup)
-- LOCK TABLES `sneakers` WRITE;
-- UNLOCK TABLES;

-- LOCK TABLES `users` WRITE;
-- UNLOCK TABLES;
>>>>>>> f0116628378b0f247c7225fe835209068d9e9668
