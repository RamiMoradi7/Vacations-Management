CREATE DATABASE  IF NOT EXISTS `vacations` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `vacations`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: vacations
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `likes`
--

DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `likes` (
  `userId` int NOT NULL,
  `vacationId` int NOT NULL,
  PRIMARY KEY (`userId`,`vacationId`),
  KEY `FK-Vacations-Users_idx` (`userId`),
  KEY `FK-Vacations-Vacations_idx` (`vacationId`),
  CONSTRAINT `FK-Vacations-Users` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK-Vacations-Vacations` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `likes`
--

LOCK TABLES `likes` WRITE;
/*!40000 ALTER TABLE `likes` DISABLE KEYS */;
INSERT INTO `likes` VALUES (5,41),(5,45),(5,78),(5,80),(5,99),(5,113),(9,79),(9,82),(9,99),(9,100);
/*!40000 ALTER TABLE `likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'Admin'),(2,'User');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(256) NOT NULL,
  `roleId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK-Users-Roles_idx` (`roleId`),
  CONSTRAINT `FK-Users-Roles` FOREIGN KEY (`roleId`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (5,'Rami','Moradi','Rami@gmail.com','1ee0b74557d7ae6f7cc9329e11cba0120450a980f73c10a5143c95cdfe4cbdbdd54f0354cb4961d5e1fa8bfcd6e8c1a7debf5eedfb323c0f74c251042be923fc',2),(6,'Kobi','Maman','Kobi@gmail.com','2419db985c7c7f0156a93e91b1c07d1afc8f564f317a80bc7168812106e2e333f515e34b6fd5fe206f73dc5b3ca8d9ddc87be18e7c921d12fbe9dad38fe90de5',2),(7,'Assaf','Fink','Assaf@gmail.com','57ba5fcc17a9315fa14d34e332677acf89bfe2e2019abc534237b87837980808553fe9e888102c4779b6850c7e21bd00c33afe9d0a6981c9f978d0ad44d7fcd5',1),(9,'Ilana','Moradi','Ilana@gmail.com','1ee0b74557d7ae6f7cc9329e11cba0120450a980f73c10a5143c95cdfe4cbdbdd54f0354cb4961d5e1fa8bfcd6e8c1a7debf5eedfb323c0f74c251042be923fc',2);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacations`
--

DROP TABLE IF EXISTS `vacations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `destination` varchar(100) NOT NULL,
  `description` varchar(1000) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `price` decimal(7,2) NOT NULL,
  `imageName` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=119 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacations`
--

LOCK TABLES `vacations` WRITE;
/*!40000 ALTER TABLE `vacations` DISABLE KEYS */;
INSERT INTO `vacations` VALUES (35,'Canada','Canada. Escape If Only For A Little While. Let the breathtaking aura of Canada guide you on an adventure of unending wonder. From landscapes that defy imagination to the allure of urban tapestries that entertain and delight, explore all that Canada has to offer. Book today. And remember to book direct with Marriott Bonvoy to enjoy exclusive benefits.','2024-03-29','2024-03-30',7540.00,'2260f9de-1c4a-48cd-9291-5492d823145e.jpg'),(41,'Greece','Take your time and come to Greece!\r\nthis is the perfect place to travel with your family,be aware for all our crazy deals!','2024-04-04','2024-05-15',6655.00,'eb31c1ae-e5b4-46ad-965a-7e72cb4448ce.jpg'),(45,'Norway','Shaped by the Ice Age, the epic landscapes of Norway are characterised by narrow fjords, majestic glaciers and towering mountains. Put simply, this Scandi nation features the kind of natural beauty that words will never do justice. The Norwegian fjords are the crowning glory of the country’s endless scenery. There are over a thousand scattered across the jagged coastline, but the most iconic –Nærøyfjord, Sognefjord, Lysefjord and Geirangerfjord – are located on the west coast.','2024-07-30','2024-08-21',3690.00,'d7b089f0-ad98-4e04-8f9e-7da870916e80.jpg'),(46,'Victoria Falls','One of the greatest attractions in Africa and one of the most spectacular waterfalls in the world, Victoria Falls is located on the Zambezi River, the fourth largest river in Africa, which also defines the border between Zambia and Zimbabwe.','2024-04-21','2024-05-21',5555.00,'53ebaaa8-1c82-4b65-ad5e-d1eb893502c9.jpg'),(78,'China','Your China Vacation\r\nSet off on your next adventure with a China vacation package, and leave knowing all the details have been taken care of. And with the ability to customize your escape, it\'ll be one you won\'t forget! A well-thought-out itinerary is a must to get the most out of your trip to China. Shanghai, Beijing and Guangzhou are a few of the leading cities here. When you\'re','2024-10-23','2024-11-20',9987.00,'da5bce18-37fe-4e0f-9b4b-db745fb028fb.jpg'),(79,'Le Mont-Saint-Michel','With every last detail planned before you take off, our Le Mont-Saint-Michel vacation packages mean you can simply focus on enjoying your getaway. Whether you\'re going to be based in the neighborhood of La Grand-ville, which is great for views, or somewhere else in town, this interesting city promises a world of discoveries. You\'ll want to do some exploring during your trip to Le Mont-Saint-Michel. ','2024-12-20','2024-12-28',7578.00,'e5455108-da79-40fb-9e85-10161a854439.jpg'),(80,'South Africa','There is absolutely no doubt South Africa is blessed with spectacular natural beauty, a fantastic climate and diversely interesting regions with diverse cultures. To say that South Africa is a virtual paradise is a true statement. The country geographically consists of an unspoiled coastline stretching for 2800 kilometres/1740 miles, dramatic mountains and escarpments, extensive bushveld','2024-04-21','2024-05-08',6584.00,'3d80125a-60f8-4c72-b791-fc37a1c1a94b.jpg'),(81,'Angel Falls','Angel Falls is located in the south of the country in the Canaima National Park. This park is surrounded by tabletop mountains and has many different species of wildlife. Angel Falls was named after a US pilot, Jimmy Angel who discovered the falls, first by flying over them and on a separate occasion, crash-landing there. They are the world’s highest waterfalls and can be seen by flying over them, taking a canoe trip, or taking a trek and camping.','2024-06-13','2024-07-14',3598.00,'e4cbccee-a180-4571-b34b-391957d64f39.jpg'),(82,'Skeleton Coast','While the name might not suggest an abundance of wildlife, your tour of the Skeleton Coast will soon demonstrate otherwise. The third largest national park in Namibia, the Skeleton Coast is rich with bird and sea life, and it even includes a number of Cape fur seal colonies.','2025-04-14','2025-04-30',3320.00,'e00f9b48-7b4c-4ecf-b7a4-53dfcefb5e25.jpg'),(99,'Bora Bora','See our vacation offers for Bora Bora, the island paradise in the heart of the Society Islands of French Polynesia. Magnificent scenery, superb white sandy beaches, and the turquoise lagoon that made Bora Bora famous.','2024-01-30','2024-02-29',3256.00,'4699c0da-b886-4752-a1f0-60cee0674e0a.jpeg'),(100,'Maldives ','With 26 atolls and 1,000+ islands spread out across the idyllic waters of the Indian Ocean, the Maldives are an island-hopper’s dream. Below the water, there’s miles of coral reef that are home to thousands of species of marine life and underwater treasures.','2024-03-11','2024-04-10',3698.00,'7991f811-81c1-4faf-8b9a-33c6dd8509f3.jpg'),(112,'Space','Embark on the journey of a lifetime with our Space Vacation experience. Leave behind the bounds of Earth and venture into the vast expanse of outer space, where the wonders of the cosmos await.','2025-03-04','2025-03-18',7777.00,'81169632-b350-4dc0-8853-9f62063809a4.jpg'),(113,'Amsterdam','Immerse yourself in the vibrant atmosphere and rich heritage of Amsterdam with our unforgettable vacation experience. From picturesque canals to world-class museums, Amsterdam offers a treasure trove of cultural delights waiting to be explored.','2024-04-16','2024-05-19',5599.00,'d82ee445-db55-4458-891c-c197b8e2c9c2.jpg');
/*!40000 ALTER TABLE `vacations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-21 20:10:14
