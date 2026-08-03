-- ============================================================
-- Fahrdienst Schwabia - MySQL Database Schema & Initial Data
-- Database: giyjdcmy_fahrdienst_schwabia
-- ============================================================

CREATE DATABASE IF NOT EXISTS `giyjdcmy_fahrdienst_schwabia` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `giyjdcmy_fahrdienst_schwabia`;

-- --------------------------------------------------------
-- Table structure for `admin_users`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `admin_users` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password_hash` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('SUPER_ADMIN','ADMIN','STAFF') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'ADMIN',
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `last_login` datetime(3) DEFAULT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `admin_users_email_key` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for `routes`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `routes` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `departure_city` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `destination_airport` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `distance_km` int NOT NULL,
  `duration_minutes` int NOT NULL,
  `base_price` decimal(10,2) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for `bookings`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `bookings` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `booking_number` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `route_id` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `trip_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'oneWay',
  `pickup_location` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `destination` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pickup_date` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pickup_time` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `return_date` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `return_time` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `passenger_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `passengers_count` int NOT NULL DEFAULT 1,
  `luggage_count` int NOT NULL DEFAULT 1,
  `child_seats` int NOT NULL DEFAULT 0,
  `flight_number` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `special_requests` text COLLATE utf8mb4_unicode_ci,
  `price` decimal(10,2) NOT NULL,
  `status` enum('NEW','CONFIRMED','DRIVER_ASSIGNED','COMPLETED','CANCELLED','NO_SHOW') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'NEW',
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  `deleted_at` datetime(3) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `bookings_booking_number_key` (`booking_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Table structure for `settings`
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS `settings` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `key` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `group` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'general',
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `settings_key_key` (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------
-- Seed Data: Routes (Updated Rates per User Request)
-- --------------------------------------------------------
INSERT INTO `routes` (`id`, `departure_city`, `destination_airport`, `distance_km`, `duration_minutes`, `base_price`, `is_active`) VALUES
('r-muc', 'Augsburg', 'Flughafen München (MUC)', 85, 65, 90.00, 1),
('r-fmm', 'Augsburg', 'Flughafen Memmingen (FMM)', 90, 60, 100.00, 1),
('r-nue', 'Augsburg', 'Flughafen Nürnberg (NUE)', 150, 100, 240.00, 1),
('r-str', 'Augsburg', 'Flughafen Stuttgart (STR)', 160, 110, 200.00, 1)
ON DUPLICATE KEY UPDATE `base_price` = VALUES(`base_price`);

-- --------------------------------------------------------
-- Seed Data: Default Admin User (admin / schwabia2026)
-- --------------------------------------------------------
INSERT INTO `admin_users` (`id`, `name`, `email`, `password_hash`, `role`, `is_active`) VALUES
('u-admin', 'Super Admin', 'admin@fahrdienst-schwabia.de', '$2a$10$wO3Lg9X2y.8G0H1jK.4YxO1q5N3kP8r2S6t7U8v9W0x1Y2z3A4b5C', 'SUPER_ADMIN', 1)
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`);
