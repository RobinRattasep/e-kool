-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: e_kool
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `hinded`
--

DROP TABLE IF EXISTS `hinded`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hinded` (
  `opilase_id` int DEFAULT NULL,
  `aine_id` int DEFAULT NULL,
  `hinne` int NOT NULL,
  `kommentaar` varchar(255) DEFAULT NULL,
  KEY `opilase_id` (`opilase_id`),
  KEY `aine_id` (`aine_id`),
  CONSTRAINT `hinded_ibfk_1` FOREIGN KEY (`opilase_id`) REFERENCES `opilased` (`opilase_id`),
  CONSTRAINT `hinded_ibfk_2` FOREIGN KEY (`aine_id`) REFERENCES `ained` (`aine_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hinded`
--

LOCK TABLES `hinded` WRITE;
/*!40000 ALTER TABLE `hinded` DISABLE KEYS */;
INSERT INTO `hinded` VALUES (1,1,4,'Tubli oled'),(1,1,5,'Tubli oled'),(1,2,5,'Tubli oled1'),(1,3,4,'Tubli oled2'),(1,1,4,'Tubli oled'),(1,1,5,'Tubli oled'),(1,2,5,'Tubli oled1'),(1,3,4,'Tubli oled2'),(2,1,4,'Tubli1'),(2,1,3,'Tubli2'),(2,1,5,'Tubli3'),(2,1,5,'Tubli5'),(2,2,5,'Tubli5'),(2,2,4,'Tubli5'),(2,2,4,'Tubli6'),(4,1,4,'Tubli');
/*!40000 ALTER TABLE `hinded` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-04-11 22:25:09
