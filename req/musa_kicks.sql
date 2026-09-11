-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Sep 10, 2026 at 03:47 PM
-- Server version: 8.3.0
-- PHP Version: 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `musa_kicks`
--

-- --------------------------------------------------------

--
-- Table structure for table `addresses`
--

DROP TABLE IF EXISTS `addresses`;
CREATE TABLE IF NOT EXISTS `addresses` (
  `id` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `label` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Home',
  `recipientName` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `line1` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `line2` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `province` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `postalCode` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'Pakistan',
  `isDefault` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `addresses_userId_idx` (`userId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `addresses`
--

INSERT INTO `addresses` (`id`, `userId`, `label`, `recipientName`, `phone`, `line1`, `line2`, `city`, `province`, `postalCode`, `country`, `isDefault`, `createdAt`, `updatedAt`) VALUES
('cmtt2emws00a1vbs43awbxhmg', 'cmtt2emju000ivbs4pfg43t6q', 'Home', 'Ali Hassan', '+923011234567', 'House 12, Street 5, F-7/2', NULL, 'Islamabad', 'Federal Capital Territory', NULL, 'Pakistan', 1, '2026-09-08 19:30:59.068', '2026-09-08 19:30:59.068'),
('cmtt2emwx00a3vbs4r93wqjs8', 'cmtt2emjx000jvbs4nq54c75r', 'Home', 'Sara Ahmed', '+923021234567', 'Flat 3A, Bahria Town Phase 4', NULL, 'Rawalpindi', 'Punjab', NULL, 'Pakistan', 1, '2026-09-08 19:30:59.073', '2026-09-08 19:30:59.073');

-- --------------------------------------------------------

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
CREATE TABLE IF NOT EXISTS `carts` (
  `id` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sessionId` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `carts_userId_key` (`userId`),
  UNIQUE KEY `carts_sessionId_key` (`sessionId`),
  KEY `carts_sessionId_idx` (`sessionId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `carts`
--

INSERT INTO `carts` (`id`, `userId`, `sessionId`, `createdAt`, `updatedAt`) VALUES
('cmtt2emx000a5vbs4at1bvbcp', 'cmtt2emju000ivbs4pfg43t6q', NULL, '2026-09-08 19:30:59.076', '2026-09-08 19:30:59.076');

-- --------------------------------------------------------

--
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
CREATE TABLE IF NOT EXISTS `cart_items` (
  `id` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cartId` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `productId` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `variantId` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cart_items_cartId_variantId_key` (`cartId`,`variantId`),
  KEY `cart_items_cartId_idx` (`cartId`),
  KEY `cart_items_productId_fkey` (`productId`),
  KEY `cart_items_variantId_fkey` (`variantId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cart_items`
--

INSERT INTO `cart_items` (`id`, `cartId`, `productId`, `variantId`, `quantity`, `createdAt`, `updatedAt`) VALUES
('cmtt2emx600a7vbs4rg49wkom', 'cmtt2emx000a5vbs4at1bvbcp', 'cmtt2emmi002kvbs4y7gx5j9u', 'cmtt2emmj002mvbs424deee1j', 1, '2026-09-08 19:30:59.083', '2026-09-08 19:30:59.083');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `id` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `imageUrl` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `publicId` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `altText` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `sortOrder` int NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `categories_slug_key` (`slug`),
  KEY `categories_slug_idx` (`slug`),
  KEY `categories_isActive_idx` (`isActive`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `imageUrl`, `publicId`, `altText`, `isActive`, `sortOrder`, `createdAt`, `updatedAt`) VALUES
('cmtt2emk2000kvbs4ciovv61e', 'Sneakerssssssss', 'sneakerssssssss', 'Urban and sporty sneakers for everyday style', NULL, NULL, NULL, 1, 1, '2026-09-08 19:30:58.611', '2026-09-10 14:14:01.894'),
('cmtt2emka000lvbs482nsh2lx', 'Casual', 'casual', 'Comfortable casual shoes for relaxed occasions', NULL, NULL, NULL, 1, 2, '2026-09-08 19:30:58.611', '2026-09-08 19:30:58.611'),
('cmtt2emkd000mvbs4lsnfkax5', 'Running', 'running', 'Performance running shoes for active lifestyles', NULL, NULL, NULL, 1, 3, '2026-09-08 19:30:58.611', '2026-09-08 19:30:58.611'),
('cmtt2emkg000nvbs4k43a90c1', 'Slides', 'slides', 'Easy-to-wear slides and sandals', NULL, NULL, NULL, 1, 6, '2026-09-08 19:30:58.611', '2026-09-08 19:30:58.611'),
('cmtt2emkj000ovbs4pwijill7', 'Formal', 'formal', 'Elegant formal shoes for professional settings', NULL, NULL, NULL, 1, 4, '2026-09-08 19:30:58.611', '2026-09-08 19:30:58.611'),
('cmtt2emko000pvbs4kkogaw4w', 'Boots', 'boots', 'Durable boots for all seasons and terrains', NULL, NULL, NULL, 1, 5, '2026-09-08 19:30:58.611', '2026-09-08 19:30:58.611'),
('cmtvgkyzq0000vbgo2zajrtpy', 'Nike', 'nike', 'This is the nikey shoes', NULL, NULL, NULL, 1, 1, '2026-09-10 11:43:21.639', '2026-09-10 11:43:21.639');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `id` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `orderNumber` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `guestName` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `guestEmail` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `guestPhone` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `addressId` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `status` enum('PENDING','CONFIRMED','PROCESSING','SHIPPED','DELIVERED','CANCELLED','RETURNED') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PENDING',
  `paymentStatus` enum('PENDING','PAID','FAILED','REFUNDED','COD') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'PENDING',
  `subtotal` decimal(10,2) NOT NULL,
  `shippingFee` decimal(10,2) NOT NULL DEFAULT '0.00',
  `total` decimal(10,2) NOT NULL,
  `notes` text COLLATE utf8mb4_unicode_ci,
  `whatsappSent` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `orders_orderNumber_key` (`orderNumber`),
  KEY `orders_orderNumber_idx` (`orderNumber`),
  KEY `orders_userId_idx` (`userId`),
  KEY `orders_status_idx` (`status`),
  KEY `orders_paymentStatus_idx` (`paymentStatus`),
  KEY `orders_createdAt_idx` (`createdAt`),
  KEY `orders_addressId_fkey` (`addressId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `orderNumber`, `userId`, `guestName`, `guestEmail`, `guestPhone`, `addressId`, `status`, `paymentStatus`, `subtotal`, `shippingFee`, `total`, `notes`, `whatsappSent`, `createdAt`, `updatedAt`) VALUES
('cmtt2emuw0094vbs42jxoso38', 'MK-95858993-3KGT', 'cmtt2emju000ivbs4pfg43t6q', NULL, NULL, NULL, NULL, 'DELIVERED', 'PAID', 6500.00, 0.00, 6500.00, NULL, 1, '2026-06-10 19:30:58.994', '2026-06-10 19:30:58.994'),
('cmtt2emvd0098vbs4hjw8xydv', 'MK-95859012-YFEB', 'cmtt2emju000ivbs4pfg43t6q', NULL, NULL, NULL, NULL, 'DELIVERED', 'PAID', 5500.00, 0.00, 5500.00, NULL, 1, '2026-07-10 19:30:59.014', '2026-07-10 19:30:59.014'),
('cmtt2emvm009cvbs4asdygewj', 'MK-95859022-1LBN', 'cmtt2emju000ivbs4pfg43t6q', NULL, NULL, NULL, NULL, 'DELIVERED', 'PAID', 8400.00, 0.00, 8400.00, NULL, 1, '2026-08-09 19:30:59.022', '2026-08-09 19:30:59.022'),
('cmtt2emvt009gvbs4qcs9xziq', 'MK-95859031-MSUC', 'cmtt2emju000ivbs4pfg43t6q', NULL, NULL, NULL, NULL, 'PENDING', 'PENDING', 8500.00, 0.00, 8500.00, NULL, 1, '2026-09-06 19:30:59.031', '2026-09-06 19:30:59.031'),
('cmtt2emvz009kvbs456rlvh2z', 'MK-95859037-PNRC', 'cmtt2emjx000jvbs4nq54c75r', NULL, NULL, NULL, NULL, 'DELIVERED', 'PAID', 9500.00, 0.00, 9500.00, NULL, 1, '2026-07-25 19:30:59.037', '2026-07-25 19:30:59.037'),
('cmtt2emw4009ovbs4c94ybfgo', 'MK-95859042-MDZK', 'cmtt2emjx000jvbs4nq54c75r', NULL, NULL, NULL, NULL, 'SHIPPED', 'PENDING', 7800.00, 0.00, 7800.00, NULL, 1, '2026-09-03 19:30:59.042', '2026-09-03 19:30:59.042'),
('cmtudbym50001vbt4cztmiim0', 'MK-20260909-MKPJUR', NULL, 'Zahid Test Buyer', 'zahid@example.com', '+923001234567', NULL, 'PENDING', 'PENDING', 6500.00, 250.00, 6750.00, 'Please call on arrival', 0, '2026-09-09 17:24:36.216', '2026-09-09 17:24:36.216');

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
CREATE TABLE IF NOT EXISTS `order_items` (
  `id` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `orderId` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `productId` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `variantId` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `productName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `productSku` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `size` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `color` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `imageUrl` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity` int NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `order_items_orderId_idx` (`orderId`),
  KEY `order_items_productId_fkey` (`productId`),
  KEY `order_items_variantId_fkey` (`variantId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `orderId`, `productId`, `variantId`, `productName`, `productSku`, `size`, `color`, `imageUrl`, `price`, `quantity`, `createdAt`) VALUES
('cmtt2emux0096vbs4n1gxifsj', 'cmtt2emuw0094vbs42jxoso38', 'cmtt2emkw000rvbs4jmh4gs52', 'cmtt2emkw000vvbs4ehamhha1', 'Musa Runner Pro', 'MK-SNE-001-BL-40', '40', 'Black', NULL, 6500.00, 1, '2026-09-08 19:30:59.000'),
('cmtt2emve009avbs4uwyvyyqc', 'cmtt2emvd0098vbs4hjw8xydv', 'cmtt2emlc001avbs45aedi3w7', 'cmtt2emld001cvbs4mg7uunf1', 'Musa Air Classic', 'MK-SNE-002-WH-38', '38', 'White', NULL, 5500.00, 1, '2026-09-08 19:30:59.017'),
('cmtt2emvn009evbs437y4e9ib', 'cmtt2emvm009cvbs4asdygewj', 'cmtt2emmu0033vbs4u6zih2hy', 'cmtt2emmv0036vbs4xtyd68dm', 'Musa Comfort Walk', 'MK-CAS-005-TA-39', '39', 'Tan', NULL, 4200.00, 2, '2026-09-08 19:30:59.026'),
('cmtt2emvt009ivbs4rpk3x1f8', 'cmtt2emvt009gvbs4qcs9xziq', 'cmtt2emnt004ovbs4tqi9pt8p', 'cmtt2emnt004qvbs48g9iuari', 'Musa Sprint X', 'MK-RUN-008-OR-38', '38', 'Orange', NULL, 8500.00, 1, '2026-09-08 19:30:59.033'),
('cmtt2emw0009mvbs4bgnv0s7k', 'cmtt2emvz009kvbs456rlvh2z', 'cmtt2emoh005qvbs477xh7m5j', 'cmtt2emoi005svbs4husv473x', 'Musa Executive', 'MK-FOR-010-BL-38', '38', 'Black', NULL, 9500.00, 1, '2026-09-08 19:30:59.040'),
('cmtt2emw4009qvbs4zjrwybk3', 'cmtt2emw4009ovbs4c94ybfgo', 'cmtt2empp006svbs4cm51p8or', 'cmtt2empr006wvbs4jzkg000l', 'Musa Desert Boot', 'MK-BOO-012-SA-40', '40', 'Sand', NULL, 7800.00, 1, '2026-09-08 19:30:59.044'),
('cmtudbym50003vbt4ngtgvd84', 'cmtudbym50001vbt4cztmiim0', 'cmtt2emkw000rvbs4jmh4gs52', 'cmtt2emkw000tvbs4x5hfjlnr', 'Musa Runner Pro', 'MK-SNE-001-BL-38', '38', 'Black', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800', 6500.00, 1, '2026-09-09 17:24:36.216');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `id` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sku` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `shortDescription` text COLLATE utf8mb4_unicode_ci,
  `price` decimal(10,2) NOT NULL,
  `compareAtPrice` decimal(10,2) DEFAULT NULL,
  `categoryId` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `isFeatured` tinyint(1) NOT NULL DEFAULT '0',
  `isNewArrival` tinyint(1) NOT NULL DEFAULT '0',
  `isBestSeller` tinyint(1) NOT NULL DEFAULT '0',
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `products_slug_key` (`slug`),
  UNIQUE KEY `products_sku_key` (`sku`),
  KEY `products_slug_idx` (`slug`),
  KEY `products_sku_idx` (`sku`),
  KEY `products_categoryId_idx` (`categoryId`),
  KEY `products_isActive_idx` (`isActive`),
  KEY `products_isFeatured_idx` (`isFeatured`),
  KEY `products_isNewArrival_idx` (`isNewArrival`),
  KEY `products_isBestSeller_idx` (`isBestSeller`),
  KEY `products_createdAt_idx` (`createdAt`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `slug`, `sku`, `description`, `shortDescription`, `price`, `compareAtPrice`, `categoryId`, `isFeatured`, `isNewArrival`, `isBestSeller`, `isActive`, `createdAt`, `updatedAt`) VALUES
('cmtt2emkw000rvbs4jmh4gs52', 'Musa Runner Pro', 'musa-runner-pro', 'MK-SNE-001', 'The Musa Runner Pro combines cutting-edge cushioning technology with a sleek urban aesthetic. Built for those who demand performance without sacrificing style.', 'Premium urban sneaker with superior cushioning', 6500.00, 8000.00, 'cmtt2emk2000kvbs4ciovv61e', 1, 1, 0, 1, '2026-09-08 19:30:58.640', '2026-09-08 19:30:58.640'),
('cmtt2emlc001avbs45aedi3w7', 'Musa Air Classic', 'musa-air-classic', 'MK-SNE-002', 'A timeless classic reborn with modern comfort. The Musa Air Classic is the shoe that goes with everything — from casual Fridays to weekend hangouts.', 'Timeless classic sneaker with modern comfort', 5500.00, 7000.00, 'cmtt2emk2000kvbs4ciovv61e', 1, 0, 1, 1, '2026-09-08 19:30:58.656', '2026-09-08 19:30:58.656'),
('cmtt2emls0021vbs4f9i3dgeu', 'Musa Street King', 'musa-street-king', 'MK-SNE-003', 'Rule the streets. The Street King features a bold silhouette, premium leather upper, and cloud-like cushioning that keeps you comfortable all day.', 'Bold streetwear sneaker with premium leather', 7200.00, NULL, 'cmtt2emk2000kvbs4ciovv61e', 1, 1, 0, 1, '2026-09-08 19:30:58.672', '2026-09-08 19:30:58.672'),
('cmtt2emmi002kvbs4y7gx5j9u', 'Musa Metro Lite', 'musa-metro-lite', 'MK-SNE-004', 'Lightweight and breathable, the Metro Lite is your go-to for long days on your feet. Mesh upper keeps you cool while the memory foam insole provides all-day support.', 'Lightweight breathable sneaker for all-day wear', 4800.00, 5500.00, 'cmtt2emk2000kvbs4ciovv61e', 0, 1, 0, 1, '2026-09-08 19:30:58.698', '2026-09-08 19:30:58.698'),
('cmtt2emmu0033vbs4u6zih2hy', 'Musa Comfort Walk', 'musa-comfort-walk', 'MK-CAS-005', 'Every step feels like walking on clouds. The Comfort Walk is engineered for those who prioritize comfort without compromising on style.', 'Ultra-comfortable everyday casual shoe', 4200.00, 5000.00, 'cmtt2emka000lvbs482nsh2lx', 0, 0, 1, 1, '2026-09-08 19:30:58.710', '2026-09-08 19:30:58.710'),
('cmtt2emn6003mvbs40jywn6sv', 'Musa Weekend Slip', 'musa-weekend-slip', 'MK-CAS-006', 'Perfect for lazy weekends and casual outings. The Weekend Slip features an easy slip-on design with a cushioned footbed for lasting comfort.', 'Easy slip-on casual shoe for weekends', 3800.00, NULL, 'cmtt2emka000lvbs482nsh2lx', 0, 1, 0, 1, '2026-09-08 19:30:58.721', '2026-09-08 19:30:58.721'),
('cmtt2emnh0045vbs4nr9ymycn', 'Musa Linen Loafer', 'musa-linen-loafer', 'MK-CAS-007', 'Sophisticated casual comfort in a premium linen construction. The Linen Loafer bridges the gap between casual and smart, making it versatile enough for any occasion.', 'Premium linen loafer for sophisticated casual', 5200.00, 6200.00, 'cmtt2emka000lvbs482nsh2lx', 1, 0, 0, 1, '2026-09-08 19:30:58.733', '2026-09-08 19:30:58.733'),
('cmtt2emnt004ovbs4tqi9pt8p', 'Musa Sprint X', 'musa-sprint-x', 'MK-RUN-008', 'Break your personal records with the Musa Sprint X. Featuring responsive foam technology and a carbon fiber plate for explosive energy return in every stride.', 'High-performance running shoe with carbon fiber', 8500.00, 10000.00, 'cmtt2emkd000mvbs4lsnfkax5', 1, 1, 1, 1, '2026-09-08 19:30:58.745', '2026-09-08 19:30:58.745'),
('cmtt2emo40057vbs4ihzrzlcc', 'Musa Trail Blazer', 'musa-trail-blazer', 'MK-RUN-009', 'Conquer any terrain with the Trail Blazer. Aggressive lug pattern provides superior grip on dirt, gravel, and grass, while the waterproof upper keeps you dry.', 'Trail running shoe with waterproof upper', 7500.00, NULL, 'cmtt2emkd000mvbs4lsnfkax5', 0, 0, 0, 1, '2026-09-08 19:30:58.756', '2026-09-08 19:30:58.756'),
('cmtt2emoh005qvbs477xh7m5j', 'Musa Executive', 'musa-executive', 'MK-FOR-010', 'Command the boardroom with the Musa Executive. Handcrafted from full-grain leather with a cushioned insole and a classic Oxford silhouette that never goes out of style.', 'Handcrafted full-grain leather Oxford', 9500.00, 12000.00, 'cmtt2emkj000ovbs4pwijill7', 1, 0, 1, 1, '2026-09-08 19:30:58.769', '2026-09-08 19:30:58.769'),
('cmtt2emp00069vbs4vr77bl5r', 'Musa Derby Elite', 'musa-derby-elite', 'MK-FOR-011', 'The Derby Elite is the perfect blend of traditional craftsmanship and contemporary design. Goodyear welted construction ensures long-lasting durability.', 'Goodyear welted Derby shoe for professionals', 8200.00, 9500.00, 'cmtt2emkj000ovbs4pwijill7', 0, 1, 0, 1, '2026-09-08 19:30:58.788', '2026-09-08 19:30:58.788'),
('cmtt2empp006svbs4cm51p8or', 'Musa Desert Boot', 'musa-desert-boot', 'MK-BOO-012', 'The desert boot reinvented. Soft suede upper, crepe rubber sole, and a simple silhouette that works with jeans, chinos, or even smart-casual trousers.', 'Classic desert boot in soft suede', 7800.00, 9000.00, 'cmtt2emko000pvbs4kkogaw4w', 0, 0, 1, 1, '2026-09-08 19:30:58.813', '2026-09-08 19:30:58.813'),
('cmtt2emqa007bvbs42vm7zotg', 'Musa Chelsea Pro', 'musa-chelsea-pro', 'MK-BOO-013', 'The ultimate Chelsea boot — clean silhouette, elastic side panels for easy on-and-off, and a leather sole that ages beautifully with every wear.', 'Premium Chelsea boot with elastic side panels', 8900.00, NULL, 'cmtt2emko000pvbs4kkogaw4w', 1, 1, 0, 1, '2026-09-08 19:30:58.833', '2026-09-08 19:30:58.833'),
('cmtt2emqu007uvbs4li4dtxbh', 'Musa Pool Slide', 'musa-pool-slide', 'MK-SLI-014', 'The premium slide you\'ve been waiting for. Contoured footbed, adjustable strap, and non-slip outsole make the Pool Slide your new summer essential.', 'Contoured pool slide with non-slip outsole', 2500.00, 3000.00, 'cmtt2emkg000nvbs4k43a90c1', 0, 0, 1, 1, '2026-09-08 19:30:58.853', '2026-09-08 19:30:58.853'),
('cmtt2emrl008lvbs4a10wq3lm', 'Musa Sport Sandal', 'musa-sport-sandal', 'MK-SLI-015', 'Adventure-ready sport sandal with adjustable webbing straps, EVA midsole for cushioning, and a grippy rubber outsole for confident footing on any surface.', 'Sport sandal with adjustable straps and EVA sole', 3200.00, 4000.00, 'cmtt2emkg000nvbs4k43a90c1', 0, 1, 0, 1, '2026-09-08 19:30:58.880', '2026-09-08 19:30:58.880'),
('cmtvfa7200001vbjww27iivdt', 'Shoes of Mansoor', 'shoes-of-mansoor', 'SKU 2', 'This is full desc', 'This is showrt dest', 2500.00, 2000.00, 'cmtt2emk2000kvbs4ciovv61e', 0, 1, 0, 1, '2026-09-10 11:06:59.256', '2026-09-10 11:06:59.256'),
('cmtvghbvu0007vbjw6ez9q4tq', 'dfgdfg', 'dfgdfg', '552', 'fdsfdsf', 'dfdsfasf', 2000.00, 1000.00, 'cmtt2emk2000kvbs4ciovv61e', 1, 1, 1, 1, '2026-09-10 11:40:31.722', '2026-09-10 11:40:31.722'),
('cmtvmd4au0001vb2knmfzbtaj', 'Addidas', 'addidas', 'SKU2', 'This is addidas brands from swabi with low and fix price.', 'This is addiadas brand', 5000.00, 1500.00, 'cmtt2emko000pvbs4kkogaw4w', 1, 1, 1, 1, '2026-09-10 14:25:12.965', '2026-09-10 14:28:10.921');

-- --------------------------------------------------------

--
-- Table structure for table `product_images`
--

DROP TABLE IF EXISTS `product_images`;
CREATE TABLE IF NOT EXISTS `product_images` (
  `id` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `productId` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `imageUrl` varchar(500) COLLATE utf8mb4_unicode_ci NOT NULL,
  `publicId` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `altText` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sortOrder` int NOT NULL DEFAULT '0',
  `isPrimary` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_images_productId_idx` (`productId`),
  KEY `product_images_productId_isPrimary_idx` (`productId`,`isPrimary`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product_images`
--

INSERT INTO `product_images` (`id`, `productId`, `imageUrl`, `publicId`, `altText`, `sortOrder`, `isPrimary`, `createdAt`, `updatedAt`) VALUES
('cmtt2emkw000svbs4gmim3rmw', 'cmtt2emkw000rvbs4jmh4gs52', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800', 'musa-kicks/products/sneakers/shoe-1', 'Musa Runner Pro', 0, 1, '2026-09-08 19:30:58.640', '2026-09-08 19:30:58.640'),
('cmtt2emlc001bvbs4366r47jn', 'cmtt2emlc001avbs45aedi3w7', 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800', 'musa-kicks/products/sneakers/shoe-2', 'Musa Air Classic', 0, 1, '2026-09-08 19:30:58.656', '2026-09-08 19:30:58.656'),
('cmtt2emlt0022vbs43vy0wd9k', 'cmtt2emls0021vbs4f9i3dgeu', 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800', 'musa-kicks/products/sneakers/shoe-3', 'Musa Street King', 0, 1, '2026-09-08 19:30:58.672', '2026-09-08 19:30:58.672'),
('cmtt2emmi002lvbs4ax91jlbo', 'cmtt2emmi002kvbs4y7gx5j9u', 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800', 'musa-kicks/products/sneakers/shoe-12', 'Musa Metro Lite', 0, 1, '2026-09-08 19:30:58.698', '2026-09-08 19:30:58.698'),
('cmtt2emmu0034vbs4u7z478ru', 'cmtt2emmu0033vbs4u6zih2hy', 'https://images.unsplash.com/photo-1512374382149-233c42b6a83b?w=800&q=80', 'musa-kicks/products/casual/shoe-6', 'Musa Comfort Walk', 0, 1, '2026-09-08 19:30:58.710', '2026-09-09 18:09:06.590'),
('cmtt2emn6003nvbs48dyygllc', 'cmtt2emn6003mvbs40jywn6sv', 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800', 'musa-kicks/products/casual/shoe-7', 'Musa Weekend Slip', 0, 1, '2026-09-08 19:30:58.721', '2026-09-08 19:30:58.721'),
('cmtt2emnh0046vbs4jg38t6zw', 'cmtt2emnh0045vbs4nr9ymycn', 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800', 'musa-kicks/products/casual/shoe-13', 'Musa Linen Loafer', 0, 1, '2026-09-08 19:30:58.733', '2026-09-08 19:30:58.733'),
('cmtt2emnt004pvbs4qerfwv5d', 'cmtt2emnt004ovbs4tqi9pt8p', 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=800&q=80', 'musa-kicks/products/running/shoe-8', 'Musa Sprint X', 0, 1, '2026-09-08 19:30:58.745', '2026-09-09 18:09:06.602'),
('cmtt2emo40058vbs45jw5txuy', 'cmtt2emo40057vbs4ihzrzlcc', 'https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?w=800', 'musa-kicks/products/running/shoe-14', 'Musa Trail Blazer', 0, 1, '2026-09-08 19:30:58.756', '2026-09-08 19:30:58.756'),
('cmtt2emoh005rvbs4lst6oxx2', 'cmtt2emoh005qvbs477xh7m5j', 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=800', 'musa-kicks/products/formal/shoe-9', 'Musa Executive', 0, 1, '2026-09-08 19:30:58.769', '2026-09-08 19:30:58.769'),
('cmtt2emp1006avbs4d2b1eiod', 'cmtt2emp00069vbs4vr77bl5r', 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=800', 'musa-kicks/products/formal/shoe-9', 'Musa Derby Elite', 0, 1, '2026-09-08 19:30:58.788', '2026-09-08 19:30:58.788'),
('cmtt2empq006tvbs4nc40vuzj', 'cmtt2empp006svbs4cm51p8or', 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=800&q=80', 'musa-kicks/products/boots/shoe-10', 'Musa Desert Boot', 0, 1, '2026-09-08 19:30:58.813', '2026-09-09 18:09:06.603'),
('cmtt2emqa007cvbs4uzo6t0ba', 'cmtt2emqa007bvbs42vm7zotg', 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=800&q=80', 'musa-kicks/products/boots/shoe-10', 'Musa Chelsea Pro', 0, 1, '2026-09-08 19:30:58.833', '2026-09-09 18:09:06.603'),
('cmtt2emqu007vvbs49lrbwl5s', 'cmtt2emqu007uvbs4li4dtxbh', 'https://images.unsplash.com/photo-1517438476312-10d79c077509?w=800', 'musa-kicks/products/slides/shoe-11', 'Musa Pool Slide', 0, 1, '2026-09-08 19:30:58.853', '2026-09-08 19:30:58.853'),
('cmtt2emrm008mvbs4hw2owc5a', 'cmtt2emrl008lvbs4a10wq3lm', 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=800', 'musa-kicks/products/sneakers/shoe-15', 'Musa Sport Sandal', 0, 1, '2026-09-08 19:30:58.880', '2026-09-08 19:30:58.880');

-- --------------------------------------------------------

--
-- Table structure for table `product_variants`
--

DROP TABLE IF EXISTS `product_variants`;
CREATE TABLE IF NOT EXISTS `product_variants` (
  `id` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `productId` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `size` varchar(32) COLLATE utf8mb4_unicode_ci NOT NULL,
  `color` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `colorHex` varchar(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sku` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `stock` int NOT NULL DEFAULT '0',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `product_variants_sku_key` (`sku`),
  KEY `product_variants_productId_idx` (`productId`),
  KEY `product_variants_sku_idx` (`sku`),
  KEY `product_variants_productId_size_color_idx` (`productId`,`size`,`color`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product_variants`
--

INSERT INTO `product_variants` (`id`, `productId`, `size`, `color`, `colorHex`, `sku`, `stock`, `createdAt`, `updatedAt`) VALUES
('cmtt2emkw000tvbs4x5hfjlnr', 'cmtt2emkw000rvbs4jmh4gs52', '38', 'Black', '#1a1a1a', 'MK-SNE-001-BL-38', 7, '2026-09-08 19:30:58.640', '2026-09-09 17:24:36.248'),
('cmtt2emkw000uvbs4xhl26h7m', 'cmtt2emkw000rvbs4jmh4gs52', '39', 'Black', '#1a1a1a', 'MK-SNE-001-BL-39', 12, '2026-09-08 19:30:58.640', '2026-09-08 19:30:58.640'),
('cmtt2emkw000vvbs4ehamhha1', 'cmtt2emkw000rvbs4jmh4gs52', '40', 'Black', '#1a1a1a', 'MK-SNE-001-BL-40', 15, '2026-09-08 19:30:58.640', '2026-09-08 19:30:58.640'),
('cmtt2emkw000wvbs4kriugoe0', 'cmtt2emkw000rvbs4jmh4gs52', '41', 'Black', '#1a1a1a', 'MK-SNE-001-BL-41', 10, '2026-09-08 19:30:58.640', '2026-09-08 19:30:58.640'),
('cmtt2emkw000xvbs4599qsxs7', 'cmtt2emkw000rvbs4jmh4gs52', '42', 'Black', '#1a1a1a', 'MK-SNE-001-BL-42', 6, '2026-09-08 19:30:58.640', '2026-09-08 19:30:58.640'),
('cmtt2emkw000yvbs4vu8p0a8g', 'cmtt2emkw000rvbs4jmh4gs52', '43', 'Black', '#1a1a1a', 'MK-SNE-001-BL-43', 4, '2026-09-08 19:30:58.640', '2026-09-08 19:30:58.640'),
('cmtt2emkw000zvbs4r2ghr6p4', 'cmtt2emkw000rvbs4jmh4gs52', '44', 'Black', '#1a1a1a', 'MK-SNE-001-BL-44', 2, '2026-09-08 19:30:58.640', '2026-09-08 19:30:58.640'),
('cmtt2emkw0010vbs4a8anedjy', 'cmtt2emkw000rvbs4jmh4gs52', '45', 'Black', '#1a1a1a', 'MK-SNE-001-BL-45', 1, '2026-09-08 19:30:58.640', '2026-09-08 19:30:58.640'),
('cmtt2emkx0011vbs4uv76pksp', 'cmtt2emkw000rvbs4jmh4gs52', '38', 'White', '#f5f5f5', 'MK-SNE-001-WH-38', 6, '2026-09-08 19:30:58.640', '2026-09-08 19:30:58.640'),
('cmtt2emkx0012vbs4qvokt3tw', 'cmtt2emkw000rvbs4jmh4gs52', '39', 'White', '#f5f5f5', 'MK-SNE-001-WH-39', 10, '2026-09-08 19:30:58.640', '2026-09-08 19:30:58.640'),
('cmtt2emkx0013vbs4y7vpu3a3', 'cmtt2emkw000rvbs4jmh4gs52', '40', 'White', '#f5f5f5', 'MK-SNE-001-WH-40', 13, '2026-09-08 19:30:58.640', '2026-09-08 19:30:58.640'),
('cmtt2emkx0014vbs4su6hh5y4', 'cmtt2emkw000rvbs4jmh4gs52', '41', 'White', '#f5f5f5', 'MK-SNE-001-WH-41', 8, '2026-09-08 19:30:58.640', '2026-09-08 19:30:58.640'),
('cmtt2emkx0015vbs4a16oocwj', 'cmtt2emkw000rvbs4jmh4gs52', '42', 'White', '#f5f5f5', 'MK-SNE-001-WH-42', 4, '2026-09-08 19:30:58.640', '2026-09-08 19:30:58.640'),
('cmtt2emkx0016vbs48ox6nget', 'cmtt2emkw000rvbs4jmh4gs52', '43', 'White', '#f5f5f5', 'MK-SNE-001-WH-43', 2, '2026-09-08 19:30:58.640', '2026-09-08 19:30:58.640'),
('cmtt2emkx0017vbs4sek8yz5g', 'cmtt2emkw000rvbs4jmh4gs52', '44', 'White', '#f5f5f5', 'MK-SNE-001-WH-44', 0, '2026-09-08 19:30:58.640', '2026-09-08 19:30:58.640'),
('cmtt2emkx0018vbs4e0x3nssh', 'cmtt2emkw000rvbs4jmh4gs52', '45', 'White', '#f5f5f5', 'MK-SNE-001-WH-45', 0, '2026-09-08 19:30:58.640', '2026-09-08 19:30:58.640'),
('cmtt2emld001cvbs4mg7uunf1', 'cmtt2emlc001avbs45aedi3w7', '38', 'White', '#f5f5f5', 'MK-SNE-002-WH-38', 8, '2026-09-08 19:30:58.656', '2026-09-08 19:30:58.656'),
('cmtt2emld001dvbs4oxorb8oq', 'cmtt2emlc001avbs45aedi3w7', '39', 'White', '#f5f5f5', 'MK-SNE-002-WH-39', 12, '2026-09-08 19:30:58.656', '2026-09-08 19:30:58.656'),
('cmtt2emld001evbs4g00lbcbm', 'cmtt2emlc001avbs45aedi3w7', '40', 'White', '#f5f5f5', 'MK-SNE-002-WH-40', 15, '2026-09-08 19:30:58.656', '2026-09-08 19:30:58.656'),
('cmtt2emld001fvbs4b2rhljeo', 'cmtt2emlc001avbs45aedi3w7', '41', 'White', '#f5f5f5', 'MK-SNE-002-WH-41', 10, '2026-09-08 19:30:58.656', '2026-09-08 19:30:58.656'),
('cmtt2emld001gvbs4i9pnv8bg', 'cmtt2emlc001avbs45aedi3w7', '42', 'White', '#f5f5f5', 'MK-SNE-002-WH-42', 6, '2026-09-08 19:30:58.656', '2026-09-08 19:30:58.656'),
('cmtt2emld001hvbs4i9yvlmdm', 'cmtt2emlc001avbs45aedi3w7', '43', 'White', '#f5f5f5', 'MK-SNE-002-WH-43', 4, '2026-09-08 19:30:58.656', '2026-09-08 19:30:58.656'),
('cmtt2emld001ivbs40o2tuyn2', 'cmtt2emlc001avbs45aedi3w7', '44', 'White', '#f5f5f5', 'MK-SNE-002-WH-44', 2, '2026-09-08 19:30:58.656', '2026-09-08 19:30:58.656'),
('cmtt2emld001jvbs4y0g9w569', 'cmtt2emlc001avbs45aedi3w7', '45', 'White', '#f5f5f5', 'MK-SNE-002-WH-45', 1, '2026-09-08 19:30:58.656', '2026-09-08 19:30:58.656'),
('cmtt2emld001kvbs4y0azywy7', 'cmtt2emlc001avbs45aedi3w7', '38', 'Navy', '#1a237e', 'MK-SNE-002-NA-38', 6, '2026-09-08 19:30:58.656', '2026-09-08 19:30:58.656'),
('cmtt2emld001lvbs44t2qr9zj', 'cmtt2emlc001avbs45aedi3w7', '39', 'Navy', '#1a237e', 'MK-SNE-002-NA-39', 10, '2026-09-08 19:30:58.656', '2026-09-08 19:30:58.656'),
('cmtt2emld001mvbs44lesb31v', 'cmtt2emlc001avbs45aedi3w7', '40', 'Navy', '#1a237e', 'MK-SNE-002-NA-40', 13, '2026-09-08 19:30:58.656', '2026-09-08 19:30:58.656'),
('cmtt2emld001nvbs4uhst0kjp', 'cmtt2emlc001avbs45aedi3w7', '41', 'Navy', '#1a237e', 'MK-SNE-002-NA-41', 8, '2026-09-08 19:30:58.656', '2026-09-08 19:30:58.656'),
('cmtt2emle001ovbs4bsvfgg2f', 'cmtt2emlc001avbs45aedi3w7', '42', 'Navy', '#1a237e', 'MK-SNE-002-NA-42', 4, '2026-09-08 19:30:58.656', '2026-09-08 19:30:58.656'),
('cmtt2emle001pvbs4ywp6rsdr', 'cmtt2emlc001avbs45aedi3w7', '43', 'Navy', '#1a237e', 'MK-SNE-002-NA-43', 2, '2026-09-08 19:30:58.656', '2026-09-08 19:30:58.656'),
('cmtt2emle001qvbs4ojqb310u', 'cmtt2emlc001avbs45aedi3w7', '44', 'Navy', '#1a237e', 'MK-SNE-002-NA-44', 0, '2026-09-08 19:30:58.656', '2026-09-08 19:30:58.656'),
('cmtt2emle001rvbs4pey0nwba', 'cmtt2emlc001avbs45aedi3w7', '45', 'Navy', '#1a237e', 'MK-SNE-002-NA-45', 0, '2026-09-08 19:30:58.656', '2026-09-08 19:30:58.656'),
('cmtt2emle001svbs4930ioh32', 'cmtt2emlc001avbs45aedi3w7', '38', 'Red', '#c62828', 'MK-SNE-002-RE-38', 6, '2026-09-08 19:30:58.656', '2026-09-08 19:30:58.656'),
('cmtt2emle001tvbs4vpt5d1by', 'cmtt2emlc001avbs45aedi3w7', '39', 'Red', '#c62828', 'MK-SNE-002-RE-39', 10, '2026-09-08 19:30:58.656', '2026-09-08 19:30:58.656'),
('cmtt2emle001uvbs4podthut5', 'cmtt2emlc001avbs45aedi3w7', '40', 'Red', '#c62828', 'MK-SNE-002-RE-40', 13, '2026-09-08 19:30:58.656', '2026-09-08 19:30:58.656'),
('cmtt2emle001vvbs4us0pad6q', 'cmtt2emlc001avbs45aedi3w7', '41', 'Red', '#c62828', 'MK-SNE-002-RE-41', 8, '2026-09-08 19:30:58.656', '2026-09-08 19:30:58.656'),
('cmtt2emle001wvbs40lx7a5gc', 'cmtt2emlc001avbs45aedi3w7', '42', 'Red', '#c62828', 'MK-SNE-002-RE-42', 4, '2026-09-08 19:30:58.656', '2026-09-08 19:30:58.656'),
('cmtt2emle001xvbs4awvwjj9v', 'cmtt2emlc001avbs45aedi3w7', '43', 'Red', '#c62828', 'MK-SNE-002-RE-43', 2, '2026-09-08 19:30:58.656', '2026-09-08 19:30:58.656'),
('cmtt2emle001yvbs4zk0isf9i', 'cmtt2emlc001avbs45aedi3w7', '44', 'Red', '#c62828', 'MK-SNE-002-RE-44', 0, '2026-09-08 19:30:58.656', '2026-09-08 19:30:58.656'),
('cmtt2emle001zvbs4cyes07b1', 'cmtt2emlc001avbs45aedi3w7', '45', 'Red', '#c62828', 'MK-SNE-002-RE-45', 0, '2026-09-08 19:30:58.656', '2026-09-08 19:30:58.656'),
('cmtt2emlt0023vbs4t8bnc6sn', 'cmtt2emls0021vbs4f9i3dgeu', '38', 'Brown', '#5D4037', 'MK-SNE-003-BR-38', 8, '2026-09-08 19:30:58.672', '2026-09-08 19:30:58.672'),
('cmtt2emlt0024vbs4f31jt6mt', 'cmtt2emls0021vbs4f9i3dgeu', '39', 'Brown', '#5D4037', 'MK-SNE-003-BR-39', 12, '2026-09-08 19:30:58.672', '2026-09-08 19:30:58.672'),
('cmtt2emlt0025vbs4ozuixann', 'cmtt2emls0021vbs4f9i3dgeu', '40', 'Brown', '#5D4037', 'MK-SNE-003-BR-40', 15, '2026-09-08 19:30:58.672', '2026-09-08 19:30:58.672'),
('cmtt2emlt0026vbs4anyqy8ar', 'cmtt2emls0021vbs4f9i3dgeu', '41', 'Brown', '#5D4037', 'MK-SNE-003-BR-41', 10, '2026-09-08 19:30:58.672', '2026-09-08 19:30:58.672'),
('cmtt2emlt0027vbs40majd4ks', 'cmtt2emls0021vbs4f9i3dgeu', '42', 'Brown', '#5D4037', 'MK-SNE-003-BR-42', 6, '2026-09-08 19:30:58.672', '2026-09-08 19:30:58.672'),
('cmtt2emlt0028vbs4xui0mkk8', 'cmtt2emls0021vbs4f9i3dgeu', '43', 'Brown', '#5D4037', 'MK-SNE-003-BR-43', 4, '2026-09-08 19:30:58.672', '2026-09-08 19:30:58.672'),
('cmtt2emlt0029vbs4capsvjwc', 'cmtt2emls0021vbs4f9i3dgeu', '44', 'Brown', '#5D4037', 'MK-SNE-003-BR-44', 2, '2026-09-08 19:30:58.672', '2026-09-08 19:30:58.672'),
('cmtt2emlu002avbs4d90yizps', 'cmtt2emls0021vbs4f9i3dgeu', '45', 'Brown', '#5D4037', 'MK-SNE-003-BR-45', 1, '2026-09-08 19:30:58.672', '2026-09-08 19:30:58.672'),
('cmtt2emlu002bvbs47a69bc3e', 'cmtt2emls0021vbs4f9i3dgeu', '38', 'Black', '#1a1a1a', 'MK-SNE-003-BL-38', 6, '2026-09-08 19:30:58.672', '2026-09-08 19:30:58.672'),
('cmtt2emlu002cvbs4ggl84plf', 'cmtt2emls0021vbs4f9i3dgeu', '39', 'Black', '#1a1a1a', 'MK-SNE-003-BL-39', 10, '2026-09-08 19:30:58.672', '2026-09-08 19:30:58.672'),
('cmtt2emlu002dvbs4qam3h34a', 'cmtt2emls0021vbs4f9i3dgeu', '40', 'Black', '#1a1a1a', 'MK-SNE-003-BL-40', 13, '2026-09-08 19:30:58.672', '2026-09-08 19:30:58.672'),
('cmtt2emlu002evbs4i3h5p8f6', 'cmtt2emls0021vbs4f9i3dgeu', '41', 'Black', '#1a1a1a', 'MK-SNE-003-BL-41', 8, '2026-09-08 19:30:58.672', '2026-09-08 19:30:58.672'),
('cmtt2emlu002fvbs47bo90dy5', 'cmtt2emls0021vbs4f9i3dgeu', '42', 'Black', '#1a1a1a', 'MK-SNE-003-BL-42', 4, '2026-09-08 19:30:58.672', '2026-09-08 19:30:58.672'),
('cmtt2emlu002gvbs4k7vs7kg5', 'cmtt2emls0021vbs4f9i3dgeu', '43', 'Black', '#1a1a1a', 'MK-SNE-003-BL-43', 2, '2026-09-08 19:30:58.672', '2026-09-08 19:30:58.672'),
('cmtt2emlu002hvbs4w47q0bpi', 'cmtt2emls0021vbs4f9i3dgeu', '44', 'Black', '#1a1a1a', 'MK-SNE-003-BL-44', 0, '2026-09-08 19:30:58.672', '2026-09-08 19:30:58.672'),
('cmtt2emlu002ivbs4fsgmcful', 'cmtt2emls0021vbs4f9i3dgeu', '45', 'Black', '#1a1a1a', 'MK-SNE-003-BL-45', 0, '2026-09-08 19:30:58.672', '2026-09-08 19:30:58.672'),
('cmtt2emmj002mvbs424deee1j', 'cmtt2emmi002kvbs4y7gx5j9u', '38', 'Grey', '#9e9e9e', 'MK-SNE-004-GR-38', 8, '2026-09-08 19:30:58.698', '2026-09-08 19:30:58.698'),
('cmtt2emmj002nvbs4uo0kd5es', 'cmtt2emmi002kvbs4y7gx5j9u', '39', 'Grey', '#9e9e9e', 'MK-SNE-004-GR-39', 12, '2026-09-08 19:30:58.698', '2026-09-08 19:30:58.698'),
('cmtt2emmj002ovbs4sg0fxxog', 'cmtt2emmi002kvbs4y7gx5j9u', '40', 'Grey', '#9e9e9e', 'MK-SNE-004-GR-40', 15, '2026-09-08 19:30:58.698', '2026-09-08 19:30:58.698'),
('cmtt2emmj002pvbs40ojws6ww', 'cmtt2emmi002kvbs4y7gx5j9u', '41', 'Grey', '#9e9e9e', 'MK-SNE-004-GR-41', 10, '2026-09-08 19:30:58.698', '2026-09-08 19:30:58.698'),
('cmtt2emmj002qvbs4460pa0dq', 'cmtt2emmi002kvbs4y7gx5j9u', '42', 'Grey', '#9e9e9e', 'MK-SNE-004-GR-42', 6, '2026-09-08 19:30:58.698', '2026-09-08 19:30:58.698'),
('cmtt2emmj002rvbs4qdg6akpl', 'cmtt2emmi002kvbs4y7gx5j9u', '43', 'Grey', '#9e9e9e', 'MK-SNE-004-GR-43', 4, '2026-09-08 19:30:58.698', '2026-09-08 19:30:58.698'),
('cmtt2emmj002svbs4elac7yfq', 'cmtt2emmi002kvbs4y7gx5j9u', '44', 'Grey', '#9e9e9e', 'MK-SNE-004-GR-44', 2, '2026-09-08 19:30:58.698', '2026-09-08 19:30:58.698'),
('cmtt2emmj002tvbs4sfx5spv5', 'cmtt2emmi002kvbs4y7gx5j9u', '45', 'Grey', '#9e9e9e', 'MK-SNE-004-GR-45', 1, '2026-09-08 19:30:58.698', '2026-09-08 19:30:58.698'),
('cmtt2emmj002uvbs4nhgxboh7', 'cmtt2emmi002kvbs4y7gx5j9u', '38', 'White', '#f5f5f5', 'MK-SNE-004-WH-38', 6, '2026-09-08 19:30:58.698', '2026-09-08 19:30:58.698'),
('cmtt2emmj002vvbs4q0bx0czl', 'cmtt2emmi002kvbs4y7gx5j9u', '39', 'White', '#f5f5f5', 'MK-SNE-004-WH-39', 10, '2026-09-08 19:30:58.698', '2026-09-08 19:30:58.698'),
('cmtt2emmk002wvbs47m31awco', 'cmtt2emmi002kvbs4y7gx5j9u', '40', 'White', '#f5f5f5', 'MK-SNE-004-WH-40', 13, '2026-09-08 19:30:58.698', '2026-09-08 19:30:58.698'),
('cmtt2emmk002xvbs455bn6pi2', 'cmtt2emmi002kvbs4y7gx5j9u', '41', 'White', '#f5f5f5', 'MK-SNE-004-WH-41', 8, '2026-09-08 19:30:58.698', '2026-09-08 19:30:58.698'),
('cmtt2emmk002yvbs4n7fy38c9', 'cmtt2emmi002kvbs4y7gx5j9u', '42', 'White', '#f5f5f5', 'MK-SNE-004-WH-42', 4, '2026-09-08 19:30:58.698', '2026-09-08 19:30:58.698'),
('cmtt2emmk002zvbs4c9n424m3', 'cmtt2emmi002kvbs4y7gx5j9u', '43', 'White', '#f5f5f5', 'MK-SNE-004-WH-43', 2, '2026-09-08 19:30:58.698', '2026-09-08 19:30:58.698'),
('cmtt2emmk0030vbs46uz1834e', 'cmtt2emmi002kvbs4y7gx5j9u', '44', 'White', '#f5f5f5', 'MK-SNE-004-WH-44', 0, '2026-09-08 19:30:58.698', '2026-09-08 19:30:58.698'),
('cmtt2emmk0031vbs4rdr8ceru', 'cmtt2emmi002kvbs4y7gx5j9u', '45', 'White', '#f5f5f5', 'MK-SNE-004-WH-45', 0, '2026-09-08 19:30:58.698', '2026-09-08 19:30:58.698'),
('cmtt2emmv0035vbs40r8r9i5x', 'cmtt2emmu0033vbs4u6zih2hy', '38', 'Tan', '#D7CCC8', 'MK-CAS-005-TA-38', 8, '2026-09-08 19:30:58.710', '2026-09-08 19:30:58.710'),
('cmtt2emmv0036vbs4xtyd68dm', 'cmtt2emmu0033vbs4u6zih2hy', '39', 'Tan', '#D7CCC8', 'MK-CAS-005-TA-39', 12, '2026-09-08 19:30:58.710', '2026-09-08 19:30:58.710'),
('cmtt2emmv0037vbs4kwf78uko', 'cmtt2emmu0033vbs4u6zih2hy', '40', 'Tan', '#D7CCC8', 'MK-CAS-005-TA-40', 15, '2026-09-08 19:30:58.710', '2026-09-08 19:30:58.710'),
('cmtt2emmv0038vbs4ndke4pnc', 'cmtt2emmu0033vbs4u6zih2hy', '41', 'Tan', '#D7CCC8', 'MK-CAS-005-TA-41', 10, '2026-09-08 19:30:58.710', '2026-09-08 19:30:58.710'),
('cmtt2emmv0039vbs47f69i5bh', 'cmtt2emmu0033vbs4u6zih2hy', '42', 'Tan', '#D7CCC8', 'MK-CAS-005-TA-42', 6, '2026-09-08 19:30:58.710', '2026-09-08 19:30:58.710'),
('cmtt2emmv003avbs4h9qntvc2', 'cmtt2emmu0033vbs4u6zih2hy', '43', 'Tan', '#D7CCC8', 'MK-CAS-005-TA-43', 4, '2026-09-08 19:30:58.710', '2026-09-08 19:30:58.710'),
('cmtt2emmv003bvbs4ivdxk5uz', 'cmtt2emmu0033vbs4u6zih2hy', '44', 'Tan', '#D7CCC8', 'MK-CAS-005-TA-44', 2, '2026-09-08 19:30:58.710', '2026-09-08 19:30:58.710'),
('cmtt2emmv003cvbs4d29atuxi', 'cmtt2emmu0033vbs4u6zih2hy', '45', 'Tan', '#D7CCC8', 'MK-CAS-005-TA-45', 1, '2026-09-08 19:30:58.710', '2026-09-08 19:30:58.710'),
('cmtt2emmv003dvbs42et6z11h', 'cmtt2emmu0033vbs4u6zih2hy', '38', 'Dark Brown', '#4E342E', 'MK-CAS-005-DA-38', 6, '2026-09-08 19:30:58.710', '2026-09-08 19:30:58.710'),
('cmtt2emmv003evbs401kzxq9v', 'cmtt2emmu0033vbs4u6zih2hy', '39', 'Dark Brown', '#4E342E', 'MK-CAS-005-DA-39', 10, '2026-09-08 19:30:58.710', '2026-09-08 19:30:58.710'),
('cmtt2emmv003fvbs48b7hq0oc', 'cmtt2emmu0033vbs4u6zih2hy', '40', 'Dark Brown', '#4E342E', 'MK-CAS-005-DA-40', 13, '2026-09-08 19:30:58.710', '2026-09-08 19:30:58.710'),
('cmtt2emmv003gvbs40k4einkl', 'cmtt2emmu0033vbs4u6zih2hy', '41', 'Dark Brown', '#4E342E', 'MK-CAS-005-DA-41', 8, '2026-09-08 19:30:58.710', '2026-09-08 19:30:58.710'),
('cmtt2emmv003hvbs4lv3k2bbq', 'cmtt2emmu0033vbs4u6zih2hy', '42', 'Dark Brown', '#4E342E', 'MK-CAS-005-DA-42', 4, '2026-09-08 19:30:58.710', '2026-09-08 19:30:58.710'),
('cmtt2emmv003ivbs4wlin54py', 'cmtt2emmu0033vbs4u6zih2hy', '43', 'Dark Brown', '#4E342E', 'MK-CAS-005-DA-43', 2, '2026-09-08 19:30:58.710', '2026-09-08 19:30:58.710'),
('cmtt2emmv003jvbs4b4723vu7', 'cmtt2emmu0033vbs4u6zih2hy', '44', 'Dark Brown', '#4E342E', 'MK-CAS-005-DA-44', 0, '2026-09-08 19:30:58.710', '2026-09-08 19:30:58.710'),
('cmtt2emmv003kvbs446o5v3rv', 'cmtt2emmu0033vbs4u6zih2hy', '45', 'Dark Brown', '#4E342E', 'MK-CAS-005-DA-45', 0, '2026-09-08 19:30:58.710', '2026-09-08 19:30:58.710'),
('cmtt2emn6003ovbs41wttra19', 'cmtt2emn6003mvbs40jywn6sv', '38', 'Navy', '#1a237e', 'MK-CAS-006-NA-38', 8, '2026-09-08 19:30:58.721', '2026-09-08 19:30:58.721'),
('cmtt2emn6003pvbs491br0hdd', 'cmtt2emn6003mvbs40jywn6sv', '39', 'Navy', '#1a237e', 'MK-CAS-006-NA-39', 12, '2026-09-08 19:30:58.721', '2026-09-08 19:30:58.721'),
('cmtt2emn6003qvbs4s0t8e59r', 'cmtt2emn6003mvbs40jywn6sv', '40', 'Navy', '#1a237e', 'MK-CAS-006-NA-40', 15, '2026-09-08 19:30:58.721', '2026-09-08 19:30:58.721'),
('cmtt2emn6003rvbs4myxii4lh', 'cmtt2emn6003mvbs40jywn6sv', '41', 'Navy', '#1a237e', 'MK-CAS-006-NA-41', 10, '2026-09-08 19:30:58.721', '2026-09-08 19:30:58.721'),
('cmtt2emn7003svbs4gggv0y4m', 'cmtt2emn6003mvbs40jywn6sv', '42', 'Navy', '#1a237e', 'MK-CAS-006-NA-42', 6, '2026-09-08 19:30:58.721', '2026-09-08 19:30:58.721'),
('cmtt2emn7003tvbs40w5a4cmr', 'cmtt2emn6003mvbs40jywn6sv', '43', 'Navy', '#1a237e', 'MK-CAS-006-NA-43', 4, '2026-09-08 19:30:58.721', '2026-09-08 19:30:58.721'),
('cmtt2emn7003uvbs4mxeo7fuy', 'cmtt2emn6003mvbs40jywn6sv', '44', 'Navy', '#1a237e', 'MK-CAS-006-NA-44', 2, '2026-09-08 19:30:58.721', '2026-09-08 19:30:58.721'),
('cmtt2emn7003vvbs4ucttsov7', 'cmtt2emn6003mvbs40jywn6sv', '45', 'Navy', '#1a237e', 'MK-CAS-006-NA-45', 1, '2026-09-08 19:30:58.721', '2026-09-08 19:30:58.721'),
('cmtt2emn7003wvbs4jlco5bv4', 'cmtt2emn6003mvbs40jywn6sv', '38', 'Brown', '#5D4037', 'MK-CAS-006-BR-38', 6, '2026-09-08 19:30:58.721', '2026-09-08 19:30:58.721'),
('cmtt2emn7003xvbs4z6qnk5kj', 'cmtt2emn6003mvbs40jywn6sv', '39', 'Brown', '#5D4037', 'MK-CAS-006-BR-39', 10, '2026-09-08 19:30:58.721', '2026-09-08 19:30:58.721'),
('cmtt2emn7003yvbs4vn403234', 'cmtt2emn6003mvbs40jywn6sv', '40', 'Brown', '#5D4037', 'MK-CAS-006-BR-40', 13, '2026-09-08 19:30:58.721', '2026-09-08 19:30:58.721'),
('cmtt2emn7003zvbs4dtb4meqo', 'cmtt2emn6003mvbs40jywn6sv', '41', 'Brown', '#5D4037', 'MK-CAS-006-BR-41', 8, '2026-09-08 19:30:58.721', '2026-09-08 19:30:58.721'),
('cmtt2emn70040vbs4acs1lv69', 'cmtt2emn6003mvbs40jywn6sv', '42', 'Brown', '#5D4037', 'MK-CAS-006-BR-42', 4, '2026-09-08 19:30:58.721', '2026-09-08 19:30:58.721'),
('cmtt2emn70041vbs4hrmocgi9', 'cmtt2emn6003mvbs40jywn6sv', '43', 'Brown', '#5D4037', 'MK-CAS-006-BR-43', 2, '2026-09-08 19:30:58.721', '2026-09-08 19:30:58.721'),
('cmtt2emn70042vbs4wey37hhk', 'cmtt2emn6003mvbs40jywn6sv', '44', 'Brown', '#5D4037', 'MK-CAS-006-BR-44', 0, '2026-09-08 19:30:58.721', '2026-09-08 19:30:58.721'),
('cmtt2emn70043vbs4kic90vzr', 'cmtt2emn6003mvbs40jywn6sv', '45', 'Brown', '#5D4037', 'MK-CAS-006-BR-45', 0, '2026-09-08 19:30:58.721', '2026-09-08 19:30:58.721'),
('cmtt2emnh0047vbs4iu1anilk', 'cmtt2emnh0045vbs4nr9ymycn', '38', 'Beige', '#D8C3A5', 'MK-CAS-007-BE-38', 8, '2026-09-08 19:30:58.733', '2026-09-08 19:30:58.733'),
('cmtt2emnh0048vbs4resbnkha', 'cmtt2emnh0045vbs4nr9ymycn', '39', 'Beige', '#D8C3A5', 'MK-CAS-007-BE-39', 12, '2026-09-08 19:30:58.733', '2026-09-08 19:30:58.733'),
('cmtt2emni0049vbs45xe4hduh', 'cmtt2emnh0045vbs4nr9ymycn', '40', 'Beige', '#D8C3A5', 'MK-CAS-007-BE-40', 15, '2026-09-08 19:30:58.733', '2026-09-08 19:30:58.733'),
('cmtt2emni004avbs4zs45ojbr', 'cmtt2emnh0045vbs4nr9ymycn', '41', 'Beige', '#D8C3A5', 'MK-CAS-007-BE-41', 10, '2026-09-08 19:30:58.733', '2026-09-08 19:30:58.733'),
('cmtt2emni004bvbs436743tsg', 'cmtt2emnh0045vbs4nr9ymycn', '42', 'Beige', '#D8C3A5', 'MK-CAS-007-BE-42', 6, '2026-09-08 19:30:58.733', '2026-09-08 19:30:58.733'),
('cmtt2emni004cvbs43p2xof0c', 'cmtt2emnh0045vbs4nr9ymycn', '43', 'Beige', '#D8C3A5', 'MK-CAS-007-BE-43', 4, '2026-09-08 19:30:58.733', '2026-09-08 19:30:58.733'),
('cmtt2emni004dvbs44f3sc57j', 'cmtt2emnh0045vbs4nr9ymycn', '44', 'Beige', '#D8C3A5', 'MK-CAS-007-BE-44', 2, '2026-09-08 19:30:58.733', '2026-09-08 19:30:58.733'),
('cmtt2emni004evbs4tfvgul7n', 'cmtt2emnh0045vbs4nr9ymycn', '45', 'Beige', '#D8C3A5', 'MK-CAS-007-BE-45', 1, '2026-09-08 19:30:58.733', '2026-09-08 19:30:58.733'),
('cmtt2emni004fvbs4mdqtip62', 'cmtt2emnh0045vbs4nr9ymycn', '38', 'Olive', '#558B2F', 'MK-CAS-007-OL-38', 6, '2026-09-08 19:30:58.733', '2026-09-08 19:30:58.733'),
('cmtt2emni004gvbs4vz2h5de4', 'cmtt2emnh0045vbs4nr9ymycn', '39', 'Olive', '#558B2F', 'MK-CAS-007-OL-39', 10, '2026-09-08 19:30:58.733', '2026-09-08 19:30:58.733'),
('cmtt2emni004hvbs4mfc0dz80', 'cmtt2emnh0045vbs4nr9ymycn', '40', 'Olive', '#558B2F', 'MK-CAS-007-OL-40', 13, '2026-09-08 19:30:58.733', '2026-09-08 19:30:58.733'),
('cmtt2emni004ivbs4b48oofkw', 'cmtt2emnh0045vbs4nr9ymycn', '41', 'Olive', '#558B2F', 'MK-CAS-007-OL-41', 8, '2026-09-08 19:30:58.733', '2026-09-08 19:30:58.733'),
('cmtt2emni004jvbs4qz8pcnpe', 'cmtt2emnh0045vbs4nr9ymycn', '42', 'Olive', '#558B2F', 'MK-CAS-007-OL-42', 4, '2026-09-08 19:30:58.733', '2026-09-08 19:30:58.733'),
('cmtt2emni004kvbs424uklwad', 'cmtt2emnh0045vbs4nr9ymycn', '43', 'Olive', '#558B2F', 'MK-CAS-007-OL-43', 2, '2026-09-08 19:30:58.733', '2026-09-08 19:30:58.733'),
('cmtt2emni004lvbs4luhmpyo9', 'cmtt2emnh0045vbs4nr9ymycn', '44', 'Olive', '#558B2F', 'MK-CAS-007-OL-44', 0, '2026-09-08 19:30:58.733', '2026-09-08 19:30:58.733'),
('cmtt2emni004mvbs4w5iibf4i', 'cmtt2emnh0045vbs4nr9ymycn', '45', 'Olive', '#558B2F', 'MK-CAS-007-OL-45', 0, '2026-09-08 19:30:58.733', '2026-09-08 19:30:58.733'),
('cmtt2emnt004qvbs48g9iuari', 'cmtt2emnt004ovbs4tqi9pt8p', '38', 'Orange', '#FF6D00', 'MK-RUN-008-OR-38', 8, '2026-09-08 19:30:58.745', '2026-09-08 19:30:58.745'),
('cmtt2emnt004rvbs4ry4c5zuj', 'cmtt2emnt004ovbs4tqi9pt8p', '39', 'Orange', '#FF6D00', 'MK-RUN-008-OR-39', 12, '2026-09-08 19:30:58.745', '2026-09-08 19:30:58.745'),
('cmtt2emnt004svbs4b577bfv4', 'cmtt2emnt004ovbs4tqi9pt8p', '40', 'Orange', '#FF6D00', 'MK-RUN-008-OR-40', 15, '2026-09-08 19:30:58.745', '2026-09-08 19:30:58.745'),
('cmtt2emnt004tvbs4gg22g1an', 'cmtt2emnt004ovbs4tqi9pt8p', '41', 'Orange', '#FF6D00', 'MK-RUN-008-OR-41', 10, '2026-09-08 19:30:58.745', '2026-09-08 19:30:58.745'),
('cmtt2emnt004uvbs4mah21xpz', 'cmtt2emnt004ovbs4tqi9pt8p', '42', 'Orange', '#FF6D00', 'MK-RUN-008-OR-42', 6, '2026-09-08 19:30:58.745', '2026-09-08 19:30:58.745'),
('cmtt2emnt004vvbs4si4vo19p', 'cmtt2emnt004ovbs4tqi9pt8p', '43', 'Orange', '#FF6D00', 'MK-RUN-008-OR-43', 4, '2026-09-08 19:30:58.745', '2026-09-08 19:30:58.745'),
('cmtt2emnt004wvbs4glzy5iux', 'cmtt2emnt004ovbs4tqi9pt8p', '44', 'Orange', '#FF6D00', 'MK-RUN-008-OR-44', 2, '2026-09-08 19:30:58.745', '2026-09-08 19:30:58.745'),
('cmtt2emnt004xvbs4rp6bt3la', 'cmtt2emnt004ovbs4tqi9pt8p', '45', 'Orange', '#FF6D00', 'MK-RUN-008-OR-45', 1, '2026-09-08 19:30:58.745', '2026-09-08 19:30:58.745'),
('cmtt2emnt004yvbs4yhg04v4q', 'cmtt2emnt004ovbs4tqi9pt8p', '38', 'Black', '#1a1a1a', 'MK-RUN-008-BL-38', 6, '2026-09-08 19:30:58.745', '2026-09-08 19:30:58.745'),
('cmtt2emnu004zvbs4mg15603k', 'cmtt2emnt004ovbs4tqi9pt8p', '39', 'Black', '#1a1a1a', 'MK-RUN-008-BL-39', 10, '2026-09-08 19:30:58.745', '2026-09-08 19:30:58.745'),
('cmtt2emnu0050vbs47tw1ip95', 'cmtt2emnt004ovbs4tqi9pt8p', '40', 'Black', '#1a1a1a', 'MK-RUN-008-BL-40', 13, '2026-09-08 19:30:58.745', '2026-09-08 19:30:58.745'),
('cmtt2emnu0051vbs497hbq6co', 'cmtt2emnt004ovbs4tqi9pt8p', '41', 'Black', '#1a1a1a', 'MK-RUN-008-BL-41', 8, '2026-09-08 19:30:58.745', '2026-09-08 19:30:58.745'),
('cmtt2emnu0052vbs4sqrmt4as', 'cmtt2emnt004ovbs4tqi9pt8p', '42', 'Black', '#1a1a1a', 'MK-RUN-008-BL-42', 4, '2026-09-08 19:30:58.745', '2026-09-08 19:30:58.745'),
('cmtt2emnu0053vbs4dkq42jpm', 'cmtt2emnt004ovbs4tqi9pt8p', '43', 'Black', '#1a1a1a', 'MK-RUN-008-BL-43', 2, '2026-09-08 19:30:58.745', '2026-09-08 19:30:58.745'),
('cmtt2emnu0054vbs4hfx9x85e', 'cmtt2emnt004ovbs4tqi9pt8p', '44', 'Black', '#1a1a1a', 'MK-RUN-008-BL-44', 0, '2026-09-08 19:30:58.745', '2026-09-08 19:30:58.745'),
('cmtt2emnu0055vbs4s1h73nh3', 'cmtt2emnt004ovbs4tqi9pt8p', '45', 'Black', '#1a1a1a', 'MK-RUN-008-BL-45', 0, '2026-09-08 19:30:58.745', '2026-09-08 19:30:58.745'),
('cmtt2emo40059vbs4ttle6y2j', 'cmtt2emo40057vbs4ihzrzlcc', '38', 'Olive', '#558B2F', 'MK-RUN-009-OL-38', 8, '2026-09-08 19:30:58.756', '2026-09-08 19:30:58.756'),
('cmtt2emo4005avbs45zo907a9', 'cmtt2emo40057vbs4ihzrzlcc', '39', 'Olive', '#558B2F', 'MK-RUN-009-OL-39', 12, '2026-09-08 19:30:58.756', '2026-09-08 19:30:58.756'),
('cmtt2emo4005bvbs4o09ywh5u', 'cmtt2emo40057vbs4ihzrzlcc', '40', 'Olive', '#558B2F', 'MK-RUN-009-OL-40', 15, '2026-09-08 19:30:58.756', '2026-09-08 19:30:58.756'),
('cmtt2emo4005cvbs4k3d88wjt', 'cmtt2emo40057vbs4ihzrzlcc', '41', 'Olive', '#558B2F', 'MK-RUN-009-OL-41', 10, '2026-09-08 19:30:58.756', '2026-09-08 19:30:58.756'),
('cmtt2emo4005dvbs40g5krvee', 'cmtt2emo40057vbs4ihzrzlcc', '42', 'Olive', '#558B2F', 'MK-RUN-009-OL-42', 6, '2026-09-08 19:30:58.756', '2026-09-08 19:30:58.756'),
('cmtt2emo4005evbs47gagj3y2', 'cmtt2emo40057vbs4ihzrzlcc', '43', 'Olive', '#558B2F', 'MK-RUN-009-OL-43', 4, '2026-09-08 19:30:58.756', '2026-09-08 19:30:58.756'),
('cmtt2emo4005fvbs41po0020s', 'cmtt2emo40057vbs4ihzrzlcc', '44', 'Olive', '#558B2F', 'MK-RUN-009-OL-44', 2, '2026-09-08 19:30:58.756', '2026-09-08 19:30:58.756'),
('cmtt2emo4005gvbs4qg3zrwp2', 'cmtt2emo40057vbs4ihzrzlcc', '45', 'Olive', '#558B2F', 'MK-RUN-009-OL-45', 1, '2026-09-08 19:30:58.756', '2026-09-08 19:30:58.756'),
('cmtt2emo4005hvbs4fxerrm3c', 'cmtt2emo40057vbs4ihzrzlcc', '38', 'Grey', '#9e9e9e', 'MK-RUN-009-GR-38', 6, '2026-09-08 19:30:58.756', '2026-09-08 19:30:58.756'),
('cmtt2emo4005ivbs4c97mqww9', 'cmtt2emo40057vbs4ihzrzlcc', '39', 'Grey', '#9e9e9e', 'MK-RUN-009-GR-39', 10, '2026-09-08 19:30:58.756', '2026-09-08 19:30:58.756'),
('cmtt2emo4005jvbs4ypoyd0tj', 'cmtt2emo40057vbs4ihzrzlcc', '40', 'Grey', '#9e9e9e', 'MK-RUN-009-GR-40', 13, '2026-09-08 19:30:58.756', '2026-09-08 19:30:58.756'),
('cmtt2emo4005kvbs41qlgr4k9', 'cmtt2emo40057vbs4ihzrzlcc', '41', 'Grey', '#9e9e9e', 'MK-RUN-009-GR-41', 8, '2026-09-08 19:30:58.756', '2026-09-08 19:30:58.756'),
('cmtt2emo4005lvbs44kphbgjr', 'cmtt2emo40057vbs4ihzrzlcc', '42', 'Grey', '#9e9e9e', 'MK-RUN-009-GR-42', 4, '2026-09-08 19:30:58.756', '2026-09-08 19:30:58.756'),
('cmtt2emo4005mvbs4d173vu84', 'cmtt2emo40057vbs4ihzrzlcc', '43', 'Grey', '#9e9e9e', 'MK-RUN-009-GR-43', 2, '2026-09-08 19:30:58.756', '2026-09-08 19:30:58.756'),
('cmtt2emo4005nvbs4ecpuvfsr', 'cmtt2emo40057vbs4ihzrzlcc', '44', 'Grey', '#9e9e9e', 'MK-RUN-009-GR-44', 0, '2026-09-08 19:30:58.756', '2026-09-08 19:30:58.756'),
('cmtt2emo4005ovbs49a5vms6j', 'cmtt2emo40057vbs4ihzrzlcc', '45', 'Grey', '#9e9e9e', 'MK-RUN-009-GR-45', 0, '2026-09-08 19:30:58.756', '2026-09-08 19:30:58.756'),
('cmtt2emoi005svbs4husv473x', 'cmtt2emoh005qvbs477xh7m5j', '38', 'Black', '#1a1a1a', 'MK-FOR-010-BL-38', 8, '2026-09-08 19:30:58.769', '2026-09-08 19:30:58.769'),
('cmtt2emoi005tvbs4ezypaxz4', 'cmtt2emoh005qvbs477xh7m5j', '39', 'Black', '#1a1a1a', 'MK-FOR-010-BL-39', 12, '2026-09-08 19:30:58.769', '2026-09-08 19:30:58.769'),
('cmtt2emoi005uvbs40cmz3bvq', 'cmtt2emoh005qvbs477xh7m5j', '40', 'Black', '#1a1a1a', 'MK-FOR-010-BL-40', 15, '2026-09-08 19:30:58.769', '2026-09-08 19:30:58.769'),
('cmtt2emoi005vvbs4ctlos7si', 'cmtt2emoh005qvbs477xh7m5j', '41', 'Black', '#1a1a1a', 'MK-FOR-010-BL-41', 10, '2026-09-08 19:30:58.769', '2026-09-08 19:30:58.769'),
('cmtt2emoi005wvbs4jrx3pqld', 'cmtt2emoh005qvbs477xh7m5j', '42', 'Black', '#1a1a1a', 'MK-FOR-010-BL-42', 6, '2026-09-08 19:30:58.769', '2026-09-08 19:30:58.769'),
('cmtt2emoi005xvbs4kckqbevf', 'cmtt2emoh005qvbs477xh7m5j', '43', 'Black', '#1a1a1a', 'MK-FOR-010-BL-43', 4, '2026-09-08 19:30:58.769', '2026-09-08 19:30:58.769'),
('cmtt2emoi005yvbs4p568lkhp', 'cmtt2emoh005qvbs477xh7m5j', '44', 'Black', '#1a1a1a', 'MK-FOR-010-BL-44', 2, '2026-09-08 19:30:58.769', '2026-09-08 19:30:58.769'),
('cmtt2emoi005zvbs43c9ui1r7', 'cmtt2emoh005qvbs477xh7m5j', '45', 'Black', '#1a1a1a', 'MK-FOR-010-BL-45', 1, '2026-09-08 19:30:58.769', '2026-09-08 19:30:58.769'),
('cmtt2emoj0060vbs40wnfl6lv', 'cmtt2emoh005qvbs477xh7m5j', '38', 'Dark Brown', '#4E342E', 'MK-FOR-010-DA-38', 6, '2026-09-08 19:30:58.769', '2026-09-08 19:30:58.769'),
('cmtt2emoj0061vbs43c7a1sce', 'cmtt2emoh005qvbs477xh7m5j', '39', 'Dark Brown', '#4E342E', 'MK-FOR-010-DA-39', 10, '2026-09-08 19:30:58.769', '2026-09-08 19:30:58.769'),
('cmtt2emoj0062vbs4iotvzce2', 'cmtt2emoh005qvbs477xh7m5j', '40', 'Dark Brown', '#4E342E', 'MK-FOR-010-DA-40', 13, '2026-09-08 19:30:58.769', '2026-09-08 19:30:58.769'),
('cmtt2emoj0063vbs4w5qyv50b', 'cmtt2emoh005qvbs477xh7m5j', '41', 'Dark Brown', '#4E342E', 'MK-FOR-010-DA-41', 8, '2026-09-08 19:30:58.769', '2026-09-08 19:30:58.769'),
('cmtt2emoj0064vbs4rcnolhlr', 'cmtt2emoh005qvbs477xh7m5j', '42', 'Dark Brown', '#4E342E', 'MK-FOR-010-DA-42', 4, '2026-09-08 19:30:58.769', '2026-09-08 19:30:58.769'),
('cmtt2emoj0065vbs4c5uqbk3k', 'cmtt2emoh005qvbs477xh7m5j', '43', 'Dark Brown', '#4E342E', 'MK-FOR-010-DA-43', 2, '2026-09-08 19:30:58.769', '2026-09-08 19:30:58.769'),
('cmtt2emoj0066vbs4ksvgd3fx', 'cmtt2emoh005qvbs477xh7m5j', '44', 'Dark Brown', '#4E342E', 'MK-FOR-010-DA-44', 0, '2026-09-08 19:30:58.769', '2026-09-08 19:30:58.769'),
('cmtt2emoj0067vbs40rzarymy', 'cmtt2emoh005qvbs477xh7m5j', '45', 'Dark Brown', '#4E342E', 'MK-FOR-010-DA-45', 0, '2026-09-08 19:30:58.769', '2026-09-08 19:30:58.769'),
('cmtt2emp1006bvbs4o9h7su8r', 'cmtt2emp00069vbs4vr77bl5r', '38', 'Cognac', '#8D4E1A', 'MK-FOR-011-CO-38', 8, '2026-09-08 19:30:58.788', '2026-09-08 19:30:58.788'),
('cmtt2emp1006cvbs4w3pb184z', 'cmtt2emp00069vbs4vr77bl5r', '39', 'Cognac', '#8D4E1A', 'MK-FOR-011-CO-39', 12, '2026-09-08 19:30:58.788', '2026-09-08 19:30:58.788'),
('cmtt2emp1006dvbs4rxpt164j', 'cmtt2emp00069vbs4vr77bl5r', '40', 'Cognac', '#8D4E1A', 'MK-FOR-011-CO-40', 15, '2026-09-08 19:30:58.788', '2026-09-08 19:30:58.788'),
('cmtt2emp1006evbs47kv2xd6i', 'cmtt2emp00069vbs4vr77bl5r', '41', 'Cognac', '#8D4E1A', 'MK-FOR-011-CO-41', 10, '2026-09-08 19:30:58.788', '2026-09-08 19:30:58.788'),
('cmtt2emp1006fvbs4j0gw30dh', 'cmtt2emp00069vbs4vr77bl5r', '42', 'Cognac', '#8D4E1A', 'MK-FOR-011-CO-42', 6, '2026-09-08 19:30:58.788', '2026-09-08 19:30:58.788'),
('cmtt2emp1006gvbs46w6g5lug', 'cmtt2emp00069vbs4vr77bl5r', '43', 'Cognac', '#8D4E1A', 'MK-FOR-011-CO-43', 4, '2026-09-08 19:30:58.788', '2026-09-08 19:30:58.788'),
('cmtt2emp1006hvbs4n3pqx1ea', 'cmtt2emp00069vbs4vr77bl5r', '44', 'Cognac', '#8D4E1A', 'MK-FOR-011-CO-44', 2, '2026-09-08 19:30:58.788', '2026-09-08 19:30:58.788'),
('cmtt2emp1006ivbs40aoarvew', 'cmtt2emp00069vbs4vr77bl5r', '45', 'Cognac', '#8D4E1A', 'MK-FOR-011-CO-45', 1, '2026-09-08 19:30:58.788', '2026-09-08 19:30:58.788'),
('cmtt2emp1006jvbs4m5til8df', 'cmtt2emp00069vbs4vr77bl5r', '38', 'Black', '#1a1a1a', 'MK-FOR-011-BL-38', 6, '2026-09-08 19:30:58.788', '2026-09-08 19:30:58.788'),
('cmtt2emp2006kvbs4rjxcyxuk', 'cmtt2emp00069vbs4vr77bl5r', '39', 'Black', '#1a1a1a', 'MK-FOR-011-BL-39', 10, '2026-09-08 19:30:58.788', '2026-09-08 19:30:58.788'),
('cmtt2emp2006lvbs41vu1udba', 'cmtt2emp00069vbs4vr77bl5r', '40', 'Black', '#1a1a1a', 'MK-FOR-011-BL-40', 13, '2026-09-08 19:30:58.788', '2026-09-08 19:30:58.788'),
('cmtt2emp2006mvbs4sgj5torw', 'cmtt2emp00069vbs4vr77bl5r', '41', 'Black', '#1a1a1a', 'MK-FOR-011-BL-41', 8, '2026-09-08 19:30:58.788', '2026-09-08 19:30:58.788'),
('cmtt2emp2006nvbs432h8c2ib', 'cmtt2emp00069vbs4vr77bl5r', '42', 'Black', '#1a1a1a', 'MK-FOR-011-BL-42', 4, '2026-09-08 19:30:58.788', '2026-09-08 19:30:58.788'),
('cmtt2emp2006ovbs4lk4hh7zm', 'cmtt2emp00069vbs4vr77bl5r', '43', 'Black', '#1a1a1a', 'MK-FOR-011-BL-43', 2, '2026-09-08 19:30:58.788', '2026-09-08 19:30:58.788'),
('cmtt2emp2006pvbs4602cariy', 'cmtt2emp00069vbs4vr77bl5r', '44', 'Black', '#1a1a1a', 'MK-FOR-011-BL-44', 0, '2026-09-08 19:30:58.788', '2026-09-08 19:30:58.788'),
('cmtt2emp2006qvbs4fihud4vi', 'cmtt2emp00069vbs4vr77bl5r', '45', 'Black', '#1a1a1a', 'MK-FOR-011-BL-45', 0, '2026-09-08 19:30:58.788', '2026-09-08 19:30:58.788'),
('cmtt2empq006uvbs4gbdqpkkc', 'cmtt2empp006svbs4cm51p8or', '38', 'Sand', '#C2A06A', 'MK-BOO-012-SA-38', 8, '2026-09-08 19:30:58.813', '2026-09-08 19:30:58.813'),
('cmtt2empq006vvbs4g7eh5qf8', 'cmtt2empp006svbs4cm51p8or', '39', 'Sand', '#C2A06A', 'MK-BOO-012-SA-39', 12, '2026-09-08 19:30:58.813', '2026-09-08 19:30:58.813'),
('cmtt2empr006wvbs4jzkg000l', 'cmtt2empp006svbs4cm51p8or', '40', 'Sand', '#C2A06A', 'MK-BOO-012-SA-40', 15, '2026-09-08 19:30:58.813', '2026-09-08 19:30:58.813'),
('cmtt2empr006xvbs41a1m29ye', 'cmtt2empp006svbs4cm51p8or', '41', 'Sand', '#C2A06A', 'MK-BOO-012-SA-41', 10, '2026-09-08 19:30:58.813', '2026-09-08 19:30:58.813'),
('cmtt2empr006yvbs41u1d1ktc', 'cmtt2empp006svbs4cm51p8or', '42', 'Sand', '#C2A06A', 'MK-BOO-012-SA-42', 6, '2026-09-08 19:30:58.813', '2026-09-08 19:30:58.813'),
('cmtt2empr006zvbs4ccwbsb18', 'cmtt2empp006svbs4cm51p8or', '43', 'Sand', '#C2A06A', 'MK-BOO-012-SA-43', 4, '2026-09-08 19:30:58.813', '2026-09-08 19:30:58.813'),
('cmtt2empr0070vbs43523fm5v', 'cmtt2empp006svbs4cm51p8or', '44', 'Sand', '#C2A06A', 'MK-BOO-012-SA-44', 2, '2026-09-08 19:30:58.813', '2026-09-08 19:30:58.813'),
('cmtt2empr0071vbs4sqsi9x9h', 'cmtt2empp006svbs4cm51p8or', '45', 'Sand', '#C2A06A', 'MK-BOO-012-SA-45', 1, '2026-09-08 19:30:58.813', '2026-09-08 19:30:58.813'),
('cmtt2empr0072vbs45t19ffbb', 'cmtt2empp006svbs4cm51p8or', '38', 'Navy', '#1a237e', 'MK-BOO-012-NA-38', 6, '2026-09-08 19:30:58.813', '2026-09-08 19:30:58.813'),
('cmtt2empr0073vbs40zfcakgw', 'cmtt2empp006svbs4cm51p8or', '39', 'Navy', '#1a237e', 'MK-BOO-012-NA-39', 10, '2026-09-08 19:30:58.813', '2026-09-08 19:30:58.813'),
('cmtt2empr0074vbs4ocvs55fz', 'cmtt2empp006svbs4cm51p8or', '40', 'Navy', '#1a237e', 'MK-BOO-012-NA-40', 13, '2026-09-08 19:30:58.813', '2026-09-08 19:30:58.813'),
('cmtt2empr0075vbs4f5f12re2', 'cmtt2empp006svbs4cm51p8or', '41', 'Navy', '#1a237e', 'MK-BOO-012-NA-41', 8, '2026-09-08 19:30:58.813', '2026-09-08 19:30:58.813'),
('cmtt2empr0076vbs4vmekh7nb', 'cmtt2empp006svbs4cm51p8or', '42', 'Navy', '#1a237e', 'MK-BOO-012-NA-42', 4, '2026-09-08 19:30:58.813', '2026-09-08 19:30:58.813'),
('cmtt2empr0077vbs48z3w9r0o', 'cmtt2empp006svbs4cm51p8or', '43', 'Navy', '#1a237e', 'MK-BOO-012-NA-43', 2, '2026-09-08 19:30:58.813', '2026-09-08 19:30:58.813'),
('cmtt2empr0078vbs4neqplp5g', 'cmtt2empp006svbs4cm51p8or', '44', 'Navy', '#1a237e', 'MK-BOO-012-NA-44', 0, '2026-09-08 19:30:58.813', '2026-09-08 19:30:58.813'),
('cmtt2empr0079vbs4vta509z5', 'cmtt2empp006svbs4cm51p8or', '45', 'Navy', '#1a237e', 'MK-BOO-012-NA-45', 0, '2026-09-08 19:30:58.813', '2026-09-08 19:30:58.813'),
('cmtt2emqa007dvbs4wbpg1b5j', 'cmtt2emqa007bvbs42vm7zotg', '38', 'Dark Brown', '#4E342E', 'MK-BOO-013-DA-38', 8, '2026-09-08 19:30:58.833', '2026-09-08 19:30:58.833'),
('cmtt2emqa007evbs45985qfn0', 'cmtt2emqa007bvbs42vm7zotg', '39', 'Dark Brown', '#4E342E', 'MK-BOO-013-DA-39', 12, '2026-09-08 19:30:58.833', '2026-09-08 19:30:58.833'),
('cmtt2emqb007fvbs46uuctwpd', 'cmtt2emqa007bvbs42vm7zotg', '40', 'Dark Brown', '#4E342E', 'MK-BOO-013-DA-40', 15, '2026-09-08 19:30:58.833', '2026-09-08 19:30:58.833'),
('cmtt2emqb007gvbs4kignujxh', 'cmtt2emqa007bvbs42vm7zotg', '41', 'Dark Brown', '#4E342E', 'MK-BOO-013-DA-41', 10, '2026-09-08 19:30:58.833', '2026-09-08 19:30:58.833'),
('cmtt2emqb007hvbs49pkvuqph', 'cmtt2emqa007bvbs42vm7zotg', '42', 'Dark Brown', '#4E342E', 'MK-BOO-013-DA-42', 6, '2026-09-08 19:30:58.833', '2026-09-08 19:30:58.833'),
('cmtt2emqb007ivbs4huiprpfu', 'cmtt2emqa007bvbs42vm7zotg', '43', 'Dark Brown', '#4E342E', 'MK-BOO-013-DA-43', 4, '2026-09-08 19:30:58.833', '2026-09-08 19:30:58.833'),
('cmtt2emqb007jvbs427ohxd2g', 'cmtt2emqa007bvbs42vm7zotg', '44', 'Dark Brown', '#4E342E', 'MK-BOO-013-DA-44', 2, '2026-09-08 19:30:58.833', '2026-09-08 19:30:58.833'),
('cmtt2emqb007kvbs4b8iwb9yb', 'cmtt2emqa007bvbs42vm7zotg', '45', 'Dark Brown', '#4E342E', 'MK-BOO-013-DA-45', 1, '2026-09-08 19:30:58.833', '2026-09-08 19:30:58.833'),
('cmtt2emqb007lvbs44ue4ftwu', 'cmtt2emqa007bvbs42vm7zotg', '38', 'Black', '#1a1a1a', 'MK-BOO-013-BL-38', 6, '2026-09-08 19:30:58.833', '2026-09-08 19:30:58.833'),
('cmtt2emqb007mvbs4dipc1f1n', 'cmtt2emqa007bvbs42vm7zotg', '39', 'Black', '#1a1a1a', 'MK-BOO-013-BL-39', 10, '2026-09-08 19:30:58.833', '2026-09-08 19:30:58.833'),
('cmtt2emqb007nvbs4jyyirbfm', 'cmtt2emqa007bvbs42vm7zotg', '40', 'Black', '#1a1a1a', 'MK-BOO-013-BL-40', 13, '2026-09-08 19:30:58.833', '2026-09-08 19:30:58.833'),
('cmtt2emqb007ovbs4i6df30i0', 'cmtt2emqa007bvbs42vm7zotg', '41', 'Black', '#1a1a1a', 'MK-BOO-013-BL-41', 8, '2026-09-08 19:30:58.833', '2026-09-08 19:30:58.833'),
('cmtt2emqb007pvbs4j1wgjphf', 'cmtt2emqa007bvbs42vm7zotg', '42', 'Black', '#1a1a1a', 'MK-BOO-013-BL-42', 4, '2026-09-08 19:30:58.833', '2026-09-08 19:30:58.833'),
('cmtt2emqb007qvbs4zahsi9o4', 'cmtt2emqa007bvbs42vm7zotg', '43', 'Black', '#1a1a1a', 'MK-BOO-013-BL-43', 2, '2026-09-08 19:30:58.833', '2026-09-08 19:30:58.833'),
('cmtt2emqb007rvbs4qitdykck', 'cmtt2emqa007bvbs42vm7zotg', '44', 'Black', '#1a1a1a', 'MK-BOO-013-BL-44', 0, '2026-09-08 19:30:58.833', '2026-09-08 19:30:58.833'),
('cmtt2emqb007svbs4e1w9wvg4', 'cmtt2emqa007bvbs42vm7zotg', '45', 'Black', '#1a1a1a', 'MK-BOO-013-BL-45', 0, '2026-09-08 19:30:58.833', '2026-09-08 19:30:58.833'),
('cmtt2emqu007wvbs4etu1mn3c', 'cmtt2emqu007uvbs4li4dtxbh', '38', 'White', '#f5f5f5', 'MK-SLI-014-WH-38', 8, '2026-09-08 19:30:58.853', '2026-09-08 19:30:58.853'),
('cmtt2emqv007xvbs4yr6vja4e', 'cmtt2emqu007uvbs4li4dtxbh', '39', 'White', '#f5f5f5', 'MK-SLI-014-WH-39', 12, '2026-09-08 19:30:58.853', '2026-09-08 19:30:58.853'),
('cmtt2emqv007yvbs4i4hrl3fi', 'cmtt2emqu007uvbs4li4dtxbh', '40', 'White', '#f5f5f5', 'MK-SLI-014-WH-40', 15, '2026-09-08 19:30:58.853', '2026-09-08 19:30:58.853'),
('cmtt2emqv007zvbs4rq7c953k', 'cmtt2emqu007uvbs4li4dtxbh', '41', 'White', '#f5f5f5', 'MK-SLI-014-WH-41', 10, '2026-09-08 19:30:58.853', '2026-09-08 19:30:58.853'),
('cmtt2emqv0080vbs4weizl5d2', 'cmtt2emqu007uvbs4li4dtxbh', '42', 'White', '#f5f5f5', 'MK-SLI-014-WH-42', 6, '2026-09-08 19:30:58.853', '2026-09-08 19:30:58.853'),
('cmtt2emqv0081vbs4qhae61c1', 'cmtt2emqu007uvbs4li4dtxbh', '43', 'White', '#f5f5f5', 'MK-SLI-014-WH-43', 4, '2026-09-08 19:30:58.853', '2026-09-08 19:30:58.853'),
('cmtt2emqv0082vbs4328rx7g4', 'cmtt2emqu007uvbs4li4dtxbh', '44', 'White', '#f5f5f5', 'MK-SLI-014-WH-44', 2, '2026-09-08 19:30:58.853', '2026-09-08 19:30:58.853'),
('cmtt2emqv0083vbs41i65ne4s', 'cmtt2emqu007uvbs4li4dtxbh', '45', 'White', '#f5f5f5', 'MK-SLI-014-WH-45', 1, '2026-09-08 19:30:58.853', '2026-09-08 19:30:58.853'),
('cmtt2emqv0084vbs4u5st25bo', 'cmtt2emqu007uvbs4li4dtxbh', '38', 'Black', '#1a1a1a', 'MK-SLI-014-BL-38', 6, '2026-09-08 19:30:58.853', '2026-09-08 19:30:58.853'),
('cmtt2emqv0085vbs4j3bh2aau', 'cmtt2emqu007uvbs4li4dtxbh', '39', 'Black', '#1a1a1a', 'MK-SLI-014-BL-39', 10, '2026-09-08 19:30:58.853', '2026-09-08 19:30:58.853'),
('cmtt2emqv0086vbs47mpvqyo5', 'cmtt2emqu007uvbs4li4dtxbh', '40', 'Black', '#1a1a1a', 'MK-SLI-014-BL-40', 13, '2026-09-08 19:30:58.853', '2026-09-08 19:30:58.853'),
('cmtt2emqv0087vbs4c0gd4nb9', 'cmtt2emqu007uvbs4li4dtxbh', '41', 'Black', '#1a1a1a', 'MK-SLI-014-BL-41', 8, '2026-09-08 19:30:58.853', '2026-09-08 19:30:58.853'),
('cmtt2emqv0088vbs4tvxrgw0c', 'cmtt2emqu007uvbs4li4dtxbh', '42', 'Black', '#1a1a1a', 'MK-SLI-014-BL-42', 4, '2026-09-08 19:30:58.853', '2026-09-08 19:30:58.853'),
('cmtt2emqv0089vbs4nb1gul4l', 'cmtt2emqu007uvbs4li4dtxbh', '43', 'Black', '#1a1a1a', 'MK-SLI-014-BL-43', 2, '2026-09-08 19:30:58.853', '2026-09-08 19:30:58.853'),
('cmtt2emqv008avbs4hek95yuv', 'cmtt2emqu007uvbs4li4dtxbh', '44', 'Black', '#1a1a1a', 'MK-SLI-014-BL-44', 0, '2026-09-08 19:30:58.853', '2026-09-08 19:30:58.853'),
('cmtt2emqv008bvbs47psp4v9v', 'cmtt2emqu007uvbs4li4dtxbh', '45', 'Black', '#1a1a1a', 'MK-SLI-014-BL-45', 0, '2026-09-08 19:30:58.853', '2026-09-08 19:30:58.853'),
('cmtt2emqv008cvbs4ae5xa5n9', 'cmtt2emqu007uvbs4li4dtxbh', '38', 'Sand', '#C2A06A', 'MK-SLI-014-SA-38', 6, '2026-09-08 19:30:58.853', '2026-09-08 19:30:58.853'),
('cmtt2emqv008dvbs4rretxy0n', 'cmtt2emqu007uvbs4li4dtxbh', '39', 'Sand', '#C2A06A', 'MK-SLI-014-SA-39', 10, '2026-09-08 19:30:58.853', '2026-09-08 19:30:58.853'),
('cmtt2emqv008evbs4eibx81wv', 'cmtt2emqu007uvbs4li4dtxbh', '40', 'Sand', '#C2A06A', 'MK-SLI-014-SA-40', 13, '2026-09-08 19:30:58.853', '2026-09-08 19:30:58.853'),
('cmtt2emqv008fvbs4fxfg0j4h', 'cmtt2emqu007uvbs4li4dtxbh', '41', 'Sand', '#C2A06A', 'MK-SLI-014-SA-41', 8, '2026-09-08 19:30:58.853', '2026-09-08 19:30:58.853'),
('cmtt2emqw008gvbs4l0s1qlv4', 'cmtt2emqu007uvbs4li4dtxbh', '42', 'Sand', '#C2A06A', 'MK-SLI-014-SA-42', 4, '2026-09-08 19:30:58.853', '2026-09-08 19:30:58.853'),
('cmtt2emqw008hvbs4jrtmby7t', 'cmtt2emqu007uvbs4li4dtxbh', '43', 'Sand', '#C2A06A', 'MK-SLI-014-SA-43', 2, '2026-09-08 19:30:58.853', '2026-09-08 19:30:58.853'),
('cmtt2emqw008ivbs4sixocpum', 'cmtt2emqu007uvbs4li4dtxbh', '44', 'Sand', '#C2A06A', 'MK-SLI-014-SA-44', 0, '2026-09-08 19:30:58.853', '2026-09-08 19:30:58.853'),
('cmtt2emqw008jvbs4ghb41ks3', 'cmtt2emqu007uvbs4li4dtxbh', '45', 'Sand', '#C2A06A', 'MK-SLI-014-SA-45', 0, '2026-09-08 19:30:58.853', '2026-09-08 19:30:58.853'),
('cmtt2emrn008nvbs4nkszube2', 'cmtt2emrl008lvbs4a10wq3lm', '38', 'Grey', '#9e9e9e', 'MK-SLI-015-GR-38', 8, '2026-09-08 19:30:58.880', '2026-09-08 19:30:58.880'),
('cmtt2emrn008ovbs4afsogjzl', 'cmtt2emrl008lvbs4a10wq3lm', '39', 'Grey', '#9e9e9e', 'MK-SLI-015-GR-39', 12, '2026-09-08 19:30:58.880', '2026-09-08 19:30:58.880'),
('cmtt2emrn008pvbs44zqcmaz6', 'cmtt2emrl008lvbs4a10wq3lm', '40', 'Grey', '#9e9e9e', 'MK-SLI-015-GR-40', 15, '2026-09-08 19:30:58.880', '2026-09-08 19:30:58.880'),
('cmtt2emrn008qvbs4qkm5ohat', 'cmtt2emrl008lvbs4a10wq3lm', '41', 'Grey', '#9e9e9e', 'MK-SLI-015-GR-41', 10, '2026-09-08 19:30:58.880', '2026-09-08 19:30:58.880'),
('cmtt2emrn008rvbs404sye6oe', 'cmtt2emrl008lvbs4a10wq3lm', '42', 'Grey', '#9e9e9e', 'MK-SLI-015-GR-42', 6, '2026-09-08 19:30:58.880', '2026-09-08 19:30:58.880'),
('cmtt2emrn008svbs4gjd0fhdp', 'cmtt2emrl008lvbs4a10wq3lm', '43', 'Grey', '#9e9e9e', 'MK-SLI-015-GR-43', 4, '2026-09-08 19:30:58.880', '2026-09-08 19:30:58.880'),
('cmtt2emrn008tvbs4tdhkxr8q', 'cmtt2emrl008lvbs4a10wq3lm', '44', 'Grey', '#9e9e9e', 'MK-SLI-015-GR-44', 2, '2026-09-08 19:30:58.880', '2026-09-08 19:30:58.880'),
('cmtt2emrn008uvbs48g5faeyo', 'cmtt2emrl008lvbs4a10wq3lm', '45', 'Grey', '#9e9e9e', 'MK-SLI-015-GR-45', 1, '2026-09-08 19:30:58.880', '2026-09-08 19:30:58.880'),
('cmtt2emrn008vvbs4mk2drkni', 'cmtt2emrl008lvbs4a10wq3lm', '38', 'Orange', '#FF6D00', 'MK-SLI-015-OR-38', 6, '2026-09-08 19:30:58.880', '2026-09-08 19:30:58.880'),
('cmtt2emrn008wvbs4d0xes7ia', 'cmtt2emrl008lvbs4a10wq3lm', '39', 'Orange', '#FF6D00', 'MK-SLI-015-OR-39', 10, '2026-09-08 19:30:58.880', '2026-09-08 19:30:58.880'),
('cmtt2emro008xvbs4iwsdczpb', 'cmtt2emrl008lvbs4a10wq3lm', '40', 'Orange', '#FF6D00', 'MK-SLI-015-OR-40', 13, '2026-09-08 19:30:58.880', '2026-09-08 19:30:58.880'),
('cmtt2emro008yvbs4ude8l5dh', 'cmtt2emrl008lvbs4a10wq3lm', '41', 'Orange', '#FF6D00', 'MK-SLI-015-OR-41', 8, '2026-09-08 19:30:58.880', '2026-09-08 19:30:58.880'),
('cmtt2emro008zvbs4rfefryno', 'cmtt2emrl008lvbs4a10wq3lm', '42', 'Orange', '#FF6D00', 'MK-SLI-015-OR-42', 4, '2026-09-08 19:30:58.880', '2026-09-08 19:30:58.880'),
('cmtt2emro0090vbs4nwn3g1cb', 'cmtt2emrl008lvbs4a10wq3lm', '43', 'Orange', '#FF6D00', 'MK-SLI-015-OR-43', 2, '2026-09-08 19:30:58.880', '2026-09-08 19:30:58.880'),
('cmtt2emro0091vbs4zsw0r6t6', 'cmtt2emrl008lvbs4a10wq3lm', '44', 'Orange', '#FF6D00', 'MK-SLI-015-OR-44', 0, '2026-09-08 19:30:58.880', '2026-09-08 19:30:58.880'),
('cmtt2emro0092vbs4h7k4706a', 'cmtt2emrl008lvbs4a10wq3lm', '45', 'Orange', '#FF6D00', 'MK-SLI-015-OR-45', 0, '2026-09-08 19:30:58.880', '2026-09-08 19:30:58.880'),
('cmtvfa7210002vbjwicg495ff', 'cmtvfa7200001vbjww27iivdt', '42', 'Black', NULL, 'SKU 2-BL-42', 10, '2026-09-10 11:06:59.256', '2026-09-10 11:06:59.256'),
('cmtvfa7210003vbjwqm22l6gj', 'cmtvfa7200001vbjww27iivdt', '43', 'Black', NULL, 'SKU 2-BL-43', 10, '2026-09-10 11:06:59.256', '2026-09-10 11:06:59.256'),
('cmtvfa7210004vbjwkmm2nzin', 'cmtvfa7200001vbjww27iivdt', '42', 'White', NULL, 'SKU 2-WH-42', 10, '2026-09-10 11:06:59.256', '2026-09-10 11:06:59.256'),
('cmtvghbvu0008vbjwxyanpiva', 'cmtvghbvu0007vbjw6ez9q4tq', '10', 'white', NULL, '552-WH-10', 10, '2026-09-10 11:40:31.722', '2026-09-10 11:40:31.722'),
('cmtvghbvu0009vbjw9nbnrzi6', 'cmtvghbvu0007vbjw6ez9q4tq', '10', 'Black', NULL, '552-BL-10', 10, '2026-09-10 11:40:31.722', '2026-09-10 11:40:31.722'),
('cmtvmgxm20005vb2kma7ksycc', 'cmtvmd4au0001vb2knmfzbtaj', '30', 'white', NULL, 'SKU2-WH-30', 10, '2026-09-10 14:28:10.921', '2026-09-10 14:28:10.921'),
('cmtvmgxm20004vb2kvx4p8b59', 'cmtvmd4au0001vb2knmfzbtaj', '25', 'Black', NULL, 'SKU2-BL-25', 10, '2026-09-10 14:28:10.921', '2026-09-10 14:28:10.921'),
('cmtvmgxm20006vb2kdtaogtwc', 'cmtvmd4au0001vb2knmfzbtaj', '42', 'blue', NULL, 'SKU2-BL-42', 10, '2026-09-10 14:28:10.921', '2026-09-10 14:28:10.921');

--
-- Table structure for table `site_settings`
--

DROP TABLE IF EXISTS `site_settings`;
CREATE TABLE IF NOT EXISTS `site_settings` (
  `id` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `key` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `site_settings_key_key` (`key`),
  KEY `site_settings_key_idx` (`key`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `site_settings`
--

INSERT INTO `site_settings` (`id`, `key`, `value`, `createdAt`, `updatedAt`) VALUES
('cmtt2ek5g0000vbs4swzo0ckh', 'brandName', 'Musa Kicks', '2026-09-08 19:30:55.492', '2026-09-08 19:30:55.492'),
('cmtt2ek5g0001vbs4k5h2p5xh', 'brandEmail', 'hello@musakicks.com', '2026-09-08 19:30:55.492', '2026-09-08 19:30:55.492'),
('cmtt2ek5g0002vbs46sannehq', 'brandPhone', '+923001234567', '2026-09-08 19:30:55.492', '2026-09-08 19:30:55.492'),
('cmtt2ek5g0003vbs4dz2uoe40', 'brandAddress', 'Islamabad, Pakistan', '2026-09-08 19:30:55.492', '2026-09-08 19:30:55.492'),
('cmtt2ek5g0004vbs4niii671h', 'whatsappNumber', '+923001234567', '2026-09-08 19:30:55.492', '2026-09-08 19:30:55.492'),
('cmtt2ek5g0005vbs4vda27am5', 'whatsappOrderMessageTemplate', 'Hello Musa Kicks,\n\nI would like to place an order.\n\n{orderDetails}\n\nThank you.', '2026-09-08 19:30:55.492', '2026-09-08 19:30:55.492'),
('cmtt2ek5g0006vbs4z9a0ku6r', 'shippingFee', '200', '2026-09-08 19:30:55.492', '2026-09-08 19:30:55.492'),
('cmtt2ek5h0007vbs42c9mni9m', 'freeShippingThreshold', '5000', '2026-09-08 19:30:55.492', '2026-09-08 19:30:55.492'),
('cmtt2ek5h000cvbs4viq43hyg', 'currency', 'PKR', '2026-09-08 19:30:55.492', '2026-09-08 19:30:55.492'),
('cmtt2ek5h000dvbs43rscfb4e', 'currencySymbol', 'Rs.', '2026-09-08 19:30:55.492', '2026-09-08 19:30:55.492'),
('cmtt2ek5h000evbs4mj4s0d6h', 'returnPeriodDays', '7', '2026-09-08 19:30:55.492', '2026-09-08 19:30:55.492'),
('cmtt2ek5h000fvbs45opmo1x2', 'socialInstagram', 'https://instagram.com/musakicks', '2026-09-08 19:30:55.492', '2026-09-08 19:30:55.492'),
('cmtt2ek5h000gvbs4cqwd2w08', 'socialFacebook', 'https://facebook.com/musakicks', '2026-09-08 19:30:55.492', '2026-09-08 19:30:55.492'),
('cmtvgqc8g0000vbugpe4748a0', 'site_name', 'Musa Kicks', '2026-09-10 11:47:32.080', '2026-09-10 11:47:53.545'),
('cmtvgqc8p0001vbugx79ybbzv', 'whatsapp_number', '+92300000000', '2026-09-10 11:47:32.090', '2026-09-10 11:47:53.549'),
('cmtvgqc8t0002vbugvgaztje4', 'shipping_fee', '250', '2026-09-10 11:47:32.094', '2026-09-10 11:47:53.556'),
('cmtvgqc8z0003vbug2fhyj37e', 'free_shipping_threshold', '10000', '2026-09-10 11:47:32.099', '2026-09-10 11:47:53.560'),
('cmtvgqc9l0007vbugv6l3oi47', 'store_address', 'Islamabad, Pakistan', '2026-09-10 11:47:32.121', '2026-09-10 11:47:53.579'),
('cmtvgqc9q0008vbugrroxndrd', 'currency_code', 'PKR', '2026-09-10 11:47:32.127', '2026-09-10 11:47:53.584'),
('cmtvgqc9v0009vbugw74xid40', 'currency_symbol', 'Rs.', '2026-09-10 11:47:32.131', '2026-09-10 11:47:53.589');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `passwordHash` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('CUSTOMER','ADMIN') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'CUSTOMER',
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_key` (`email`),
  KEY `users_email_idx` (`email`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `name`, `phone`, `passwordHash`, `role`, `isActive`, `createdAt`, `updatedAt`) VALUES
('cmtt2emjo000hvbs49lw6vtjz', 'admin@musakicks.com', 'Musa Khan', '+923001234567', '$2b$12$L/vD92VRsYBNOn7Bt8Ul/u2tdRK.ENdXNdfm5BhND.jNuhSJ5wVeK', 'ADMIN', 1, '2026-09-08 19:30:58.597', '2026-09-08 19:30:58.597'),
('cmtt2emju000ivbs4pfg43t6q', 'ali@example.com', 'Ali Hassan', '+923011234567', '$2b$12$C5gJxNM/OWqd2KNzczWAQe/VTze0X5BflliZaY92JrpiO5VJbK6MS', 'CUSTOMER', 1, '2026-09-08 19:30:58.602', '2026-09-08 19:30:58.602'),
('cmtt2emjx000jvbs4nq54c75r', 'sara@example.com', 'Sara Ahmed', '+923021234567', '$2b$12$XCgmoVGwfnnBJqeaufgBh.QvgYS0KRJ5oElcVQ6TfuXyAJmphRZq6', 'CUSTOMER', 1, '2026-09-08 19:30:58.605', '2026-09-08 19:30:58.605'),
('cmtvfg2q30005vbjwy3xyckd1', 'Zabbas4343@gmail.com', 'Zaheer Abbas', '+923139804929', '$2b$12$Na9bt7JiyVbkM7yEcat9D.vwic4SCAyVO1LeZcK8JK3Hp4nGVs.8m', 'CUSTOMER', 1, '2026-09-10 11:11:33.579', '2026-09-10 11:11:33.579');

-- --------------------------------------------------------

--
-- Table structure for table `wishlists`
--

DROP TABLE IF EXISTS `wishlists`;
CREATE TABLE IF NOT EXISTS `wishlists` (
  `id` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `wishlists_userId_key` (`userId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `wishlist_items`
--

DROP TABLE IF EXISTS `wishlist_items`;
CREATE TABLE IF NOT EXISTS `wishlist_items` (
  `id` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `wishlistId` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `productId` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `wishlist_items_wishlistId_productId_key` (`wishlistId`,`productId`),
  KEY `wishlist_items_wishlistId_idx` (`wishlistId`),
  KEY `wishlist_items_productId_fkey` (`productId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
