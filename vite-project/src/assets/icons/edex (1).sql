-- Adminer 4.8.1 MySQL 8.3.0 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP DATABASE IF EXISTS `edex`;
CREATE DATABASE `edex` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `edex`;

DROP TABLE IF EXISTS `college`;
CREATE TABLE `college` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `acronym` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `college_code` varchar(255) NOT NULL,
  `status` enum('0','1') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `college_lounge_announcement`;
CREATE TABLE `college_lounge_announcement` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user` int NOT NULL,
  `message` varchar(255) NOT NULL,
  `status` enum('0','1') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `user` (`user`),
  CONSTRAINT `college_lounge_announcement_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `country`;
CREATE TABLE `country` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `status` enum('0','1') NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=197 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `downvoted_posts`;
CREATE TABLE `downvoted_posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `global` int NOT NULL,
  `college` int DEFAULT NULL,
  `user` int NOT NULL,
  `status` enum('0','1') NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `global` (`global`),
  KEY `user` (`user`),
  CONSTRAINT `downvoted_posts_ibfk_10` FOREIGN KEY (`user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `downvoted_posts_ibfk_9` FOREIGN KEY (`global`) REFERENCES `global_lounge` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=473 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `followers`;
CREATE TABLE `followers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user` int NOT NULL,
  `following` int NOT NULL,
  `status` enum('0','1') NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `following` (`following`),
  KEY `user` (`user`),
  CONSTRAINT `followers_ibfk_5` FOREIGN KEY (`following`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `followers_ibfk_6` FOREIGN KEY (`user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=22322 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `global_comments`;
CREATE TABLE `global_comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `comment` varchar(255) NOT NULL,
  `post` int NOT NULL,
  `user` int NOT NULL,
  `like_count` int NOT NULL DEFAULT '0',
  `datetime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('0','1') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `post` (`post`),
  KEY `user` (`user`),
  CONSTRAINT `global_comments_ibfk_3` FOREIGN KEY (`post`) REFERENCES `global_lounge` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `global_comments_ibfk_4` FOREIGN KEY (`user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `global_comments_reply`;
CREATE TABLE `global_comments_reply` (
  `id` int NOT NULL AUTO_INCREMENT,
  `reply` varchar(255) NOT NULL,
  `to_reply` int DEFAULT NULL,
  `to_comment` int DEFAULT NULL,
  `user` int NOT NULL,
  `like_count` int NOT NULL DEFAULT '0',
  `datetime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('0','1') NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `user` (`user`),
  CONSTRAINT `global_comments_reply_ibfk_2` FOREIGN KEY (`user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `global_lounge`;
CREATE TABLE `global_lounge` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user` int NOT NULL,
  `message` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `upVoteCount` int NOT NULL DEFAULT '0',
  `downVoteCount` int NOT NULL DEFAULT '0',
  `date_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('0','1') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `user` (`user`),
  CONSTRAINT `global_lounge_ibfk_4` FOREIGN KEY (`user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=543 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `liked_global_comment_replies`;
CREATE TABLE `liked_global_comment_replies` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user` int NOT NULL,
  `reply` int NOT NULL,
  `status` enum('0','1') NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `user` (`user`),
  KEY `reply` (`reply`),
  CONSTRAINT `liked_global_comment_replies_ibfk_4` FOREIGN KEY (`user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `liked_global_comment_replies_ibfk_5` FOREIGN KEY (`reply`) REFERENCES `global_comments_reply` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `liked_global_comments`;
CREATE TABLE `liked_global_comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `comment` int NOT NULL,
  `user` int NOT NULL,
  `status` enum('0','1') NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `user` (`user`),
  KEY `comment` (`comment`),
  CONSTRAINT `liked_global_comments_ibfk_3` FOREIGN KEY (`user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `liked_global_comments_ibfk_4` FOREIGN KEY (`comment`) REFERENCES `global_comments` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `status` enum('0','1') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `upvoted_posts`;
CREATE TABLE `upvoted_posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `global` int NOT NULL,
  `college` int DEFAULT NULL,
  `user` int NOT NULL,
  `status` enum('0','1') NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `college` (`college`),
  KEY `global` (`global`),
  KEY `user` (`user`),
  CONSTRAINT `upvoted_posts_ibfk_2` FOREIGN KEY (`college`) REFERENCES `college_lounge_announcement` (`id`),
  CONSTRAINT `upvoted_posts_ibfk_4` FOREIGN KEY (`global`) REFERENCES `global_lounge` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `upvoted_posts_ibfk_5` FOREIGN KEY (`user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=1645 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `college` int NOT NULL,
  `age` int NOT NULL,
  `phone` varchar(255) NOT NULL,
  `role` int NOT NULL,
  `profile_photo` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'nil',
  `status` enum('0','1') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `college` (`college`),
  KEY `role` (`role`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`college`) REFERENCES `college` (`id`),
  CONSTRAINT `users_ibfk_2` FOREIGN KEY (`role`) REFERENCES `role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

TRUNCATE `users`;
INSERT INTO `users` (`id`, `username`, `name`, `password`, `college`, `age`, `phone`, `role`, `profile_photo`, `status`) VALUES
(29,	'global-Sabareesh',	'Sabaressh',	'1234',	1,	19,	'+91 99999999',	2,	'nil',	'1');

-- 2024-05-02 08:53:01
