<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json');

require_once __DIR__ . '/config.php';

$res = [
    'php_version' => PHP_VERSION,
    'db_user' => DB_USER,
    'db_name' => DB_NAME,
    'db_host' => DB_HOST,
];

try {
    $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4";
    $pdo = new PDO($dsn, DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
    $res['connection'] = 'SUCCESS';
    
    // Check if bookings table exists
    $stmt = $pdo->query("SHOW TABLES LIKE 'bookings'");
    $tableExists = $stmt->fetch();
    $res['table_exists'] = (bool)$tableExists;

    if ($tableExists) {
        $stmt = $pdo->query("DESCRIBE bookings");
        $res['columns'] = $stmt->fetchAll();
    }
} catch (Exception $e) {
        $res['connection'] = 'FAILED';
        $res['error'] = $e->getMessage();
}

echo json_encode($res, JSON_PRETTY_PRINT);
