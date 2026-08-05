<?php
// Production MySQL Database Configuration
define('DB_HOST', 'localhost');
define('DB_PORT', '3306');
define('DB_NAME', 'giyjdcmy_fahrdienst_schwabia');
define('DB_USER', 'giyjdcmy_shadi');
define('DB_PASS', 'y~N3cokNi@rr');

/**
 * Returns a PDO connection or throws an Exception with details
 */
function getDbConnection() {
    static $pdo = null;
    static $connectionError = null;

    if ($pdo !== null) {
        return $pdo;
    }

    $hostsToTry = [DB_HOST, '127.0.0.1', 'localhost'];
    $uniqueHosts = array_unique($hostsToTry);

    foreach ($uniqueHosts as $host) {
        try {
            $dsn = "mysql:host={$host};dbname=" . DB_NAME . ";charset=utf8mb4";
            $options = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_TIMEOUT => 5,
            ];
            $conn = new PDO($dsn, DB_USER, DB_PASS, $options);

            // Auto-create bookings table if it doesn't exist
            $conn->exec("
                CREATE TABLE IF NOT EXISTS `bookings` (
                  `id` varchar(191) NOT NULL,
                  `booking_number` varchar(191) NOT NULL,
                  `route_id` varchar(191) DEFAULT NULL,
                  `trip_type` varchar(191) NOT NULL DEFAULT 'oneWay',
                  `pickup_location` varchar(191) NOT NULL,
                  `destination` varchar(191) NOT NULL,
                  `pickup_date` varchar(191) NOT NULL,
                  `pickup_time` varchar(191) NOT NULL,
                  `return_date` varchar(191) DEFAULT NULL,
                  `return_time` varchar(191) DEFAULT NULL,
                  `passenger_name` varchar(191) NOT NULL,
                  `phone` varchar(191) NOT NULL,
                  `email` varchar(191) NOT NULL,
                  `passengers_count` int NOT NULL DEFAULT 1,
                  `luggage_count` int NOT NULL DEFAULT 1,
                  `child_seats` int NOT NULL DEFAULT 0,
                  `flight_number` varchar(191) DEFAULT NULL,
                  `special_requests` text,
                  `price` decimal(10,2) NOT NULL,
                  `status` enum('NEW','CONFIRMED','DRIVER_ASSIGNED','COMPLETED','CANCELLED','NO_SHOW') NOT NULL DEFAULT 'NEW',
                  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
                  `updated_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
                  `deleted_at` datetime(3) DEFAULT NULL,
                  PRIMARY KEY (`id`),
                  UNIQUE KEY `bookings_booking_number_key` (`booking_number`)
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
            ");

            $pdo = $conn;
            return $pdo;
        } catch (PDOException $e) {
            $connectionError = "Host '{$host}': " . $e->getMessage();
        } catch (Throwable $t) {
            $connectionError = "Host '{$host}': " . $t->getMessage();
        }
    }

    $GLOBALS['DB_CONNECT_ERROR'] = $connectionError;
    return null;
}
