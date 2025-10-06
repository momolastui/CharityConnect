-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: charityevents_db
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Gala Dinner'),(2,'Fun Run'),(3,'Silent Auction'),(4,'Concert'),(5,'Volunteering');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `date` datetime NOT NULL,
  `location` varchar(255) NOT NULL,
  `ticket_price` decimal(10,2) DEFAULT '0.00',
  `target_amount` decimal(10,2) DEFAULT NULL,
  `current_amount` decimal(10,2) DEFAULT '0.00',
  `image_url` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT '1',
  `category_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `events_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (1,'Annual Charity Gala 2023','An evening of fine dining and auctions to support local schools.','2023-11-15 19:00:00','Sydney Convention Centre',150.00,50000.00,42000.00,'/images/gala.jpg',1,1),(2,'Coastal Fun Run 2023','A 5km run along the beautiful Byron Bay coastline.','2023-12-05 08:00:00','Byron Bay Beach',35.00,20000.00,15500.00,'/images/funrun.jpg',1,2),(3,'Winter Concert for Homeless','Enjoy performances from local artists, all proceeds go to homeless shelters.','2024-07-20 18:30:00','Melbourne Town Hall',45.00,15000.00,0.00,'/images/concert.jpg',1,4),(4,'Art Auction for Conservation','Bid on stunning artworks to help protect the rainforest.','2024-08-10 14:00:00','Online Event',0.00,30000.00,12500.00,'/images/auction.jpg',1,3),(5,'City River Cleanup','Help us remove trash from the city riverbank and promote environmental awareness.','2024-09-21 09:00:00','City River Park',0.00,NULL,NULL,'/images/cleanup.jpg',1,5),(6,'Kids Coding Workshop','A free workshop to introduce underprivileged kids to the world of coding.','2024-10-05 13:00:00','Central Library',0.00,NULL,NULL,'/images/workshop.jpg',1,5),(7,'Christmas Food Drive','Donate non-perishable food items for families in need this holiday season.','2024-12-14 10:00:00','Various Drop-off Locations',0.00,NULL,NULL,'/images/fooddrive.jpg',1,5),(8,'Vintage Car Show','A display of classic cars with entry fees donated to medical research.','2024-11-30 11:00:00','Fairgrounds',20.00,25000.00,5000.00,'/images/carshow.jpg',1,1);
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-10-04 20:41:25
