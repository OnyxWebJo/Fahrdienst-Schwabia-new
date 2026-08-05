<?php
// Disable display of PHP warnings/notices, enforce clean JSON output
error_reporting(E_ALL & ~E_NOTICE & ~E_WARNING);
ini_set('display_errors', 0);

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

try {
    require_once __DIR__ . '/config.php';
} catch (Throwable $t) {
    http_response_code(200);
    echo json_encode(['error' => 'Config load error', 'details' => $t->getMessage()]);
    exit;
}

$dataFile = __DIR__ . '/bookings.json';

function mapStatusToGerman($dbStatus) {
    switch ($dbStatus) {
        case 'CONFIRMED': return 'Bestätigt';
        case 'DRIVER_ASSIGNED': return 'Fahrer zugewiesen';
        case 'COMPLETED': return 'Abgeschlossen';
        case 'CANCELLED': return 'Storniert';
        case 'NEW':
        default: return 'Neu';
    }
}

function mapStatusToDb($deStatus) {
    switch ($deStatus) {
        case 'Bestätigt': return 'CONFIRMED';
        case 'Fahrer zugewiesen': return 'DRIVER_ASSIGNED';
        case 'Abgeschlossen': return 'COMPLETED';
        case 'Storniert': return 'CANCELLED';
        case 'Neu':
        default: return 'NEW';
    }
}

$pdo = getDbConnection();
$method = $_SERVER['REQUEST_METHOD'];

// Debug mode: /api/bookings.php?debug=1
if (isset($_GET['debug']) && $_GET['debug'] === '1') {
    echo json_encode([
        'db_connected' => ($pdo !== null),
        'db_name' => DB_NAME,
        'db_user' => DB_USER,
        'db_host' => DB_HOST,
        'db_error' => $GLOBALS['DB_CONNECT_ERROR'] ?? null,
        'file_exists' => file_exists($dataFile),
        'dir_writable' => is_writable(__DIR__),
        'php_version' => PHP_VERSION,
    ], JSON_PRETTY_PRINT);
    exit;
}

function formatBookingRow($r) {
    $pickup = $r['pickup_location'] ?? '';
    $dest = $r['destination'] ?? '';
    $route = "{$pickup} ➔ {$dest}";

    return [
        'id' => (string)$r['id'],
        'name' => (string)$r['passenger_name'],
        'phone' => (string)$r['phone'],
        'email' => (string)$r['email'],
        'direction' => ($r['trip_type'] === 'fromAirport') ? 'fromAirport' : 'toAirport',
        'tripType' => ($r['trip_type'] === 'roundTrip') ? 'roundTrip' : 'oneWay',
        'route' => $route,
        'pickupAddress' => (string)$r['pickup_location'],
        'dropoffAddress' => (string)$r['destination'],
        'date' => (string)$r['pickup_date'],
        'time' => (string)$r['pickup_time'],
        'returnDate' => !empty($r['return_date']) ? (string)$r['return_date'] : null,
        'returnTime' => !empty($r['return_time']) ? (string)$r['return_time'] : null,
        'price' => number_format((float)$r['price'], 0) . ' €',
        'passengers' => (int)$r['passengers_count'],
        'luggage' => (int)$r['luggage_count'],
        'childSeats' => (int)$r['child_seats'],
        'flightNumber' => !empty($r['flight_number']) ? (string)$r['flight_number'] : '',
        'notes' => !empty($r['special_requests']) ? (string)$r['special_requests'] : '',
        'status' => mapStatusToGerman($r['status']),
        'createdAt' => (string)$r['created_at'],
    ];
}

if ($method === 'GET') {
    if ($pdo) {
        try {
            $stmt = $pdo->query("SELECT * FROM bookings WHERE deleted_at IS NULL ORDER BY created_at DESC");
            $rows = $stmt->fetchAll();
            $result = [];
            foreach ($rows as $r) {
                $result[] = formatBookingRow($r);
            }
            echo json_encode($result, JSON_UNESCAPED_UNICODE);
            exit;
        } catch (Throwable $t) {
            error_log("DB Query Error: " . $t->getMessage());
        }
    }

    // File fallback
    if (file_exists($dataFile)) {
        $content = @file_get_contents($dataFile);
        if ($content && trim($content) !== '') {
            echo $content;
            exit;
        }
    }
    echo json_encode([]);
    exit;
}

if ($method === 'POST') {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    if (!$data) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid JSON input']);
        exit;
    }

    $dbSaved = false;
    $dbError = null;

    if ($pdo) {
        try {
            if (isset($data['action']) && $data['action'] === 'update_status') {
                $id = $data['id'] ?? '';
                $status = mapStatusToDb($data['status'] ?? 'Neu');
                $stmt = $pdo->prepare("UPDATE bookings SET status = :status, updated_at = NOW() WHERE id = :id");
                $stmt->execute(['status' => $status, 'id' => $id]);
                $dbSaved = true;
            } else if (isset($data['action']) && $data['action'] === 'delete') {
                $id = $data['id'] ?? '';
                $stmt = $pdo->prepare("UPDATE bookings SET deleted_at = NOW() WHERE id = :id");
                $stmt->execute(['id' => $id]);
                $dbSaved = true;
            } else if (isset($data['id'])) {
                $rawPrice = preg_replace('/[^\d.]/', '', $data['price'] ?? '0');
                $numPrice = floatval($rawPrice);

                $stmt = $pdo->prepare("
                    INSERT INTO bookings (
                        id, booking_number, trip_type, pickup_location, destination,
                        pickup_date, pickup_time, return_date, return_time,
                        passenger_name, phone, email, passengers_count, luggage_count,
                        child_seats, flight_number, special_requests, price, status
                    ) VALUES (
                        :id, :booking_number, :trip_type, :pickup_location, :destination,
                        :pickup_date, :pickup_time, :return_date, :return_time,
                        :passenger_name, :phone, :email, :passengers_count, :luggage_count,
                        :child_seats, :flight_number, :special_requests, :price, :status
                    ) ON DUPLICATE KEY UPDATE
                        status = VALUES(status),
                        updated_at = NOW()
                ");

                $stmt->execute([
                    'id' => (string)$data['id'],
                    'booking_number' => (string)$data['id'],
                    'trip_type' => (string)($data['tripType'] ?? 'oneWay'),
                    'pickup_location' => (string)($data['pickupAddress'] ?? ''),
                    'destination' => (string)($data['dropoffAddress'] ?? ''),
                    'pickup_date' => (string)($data['date'] ?? ''),
                    'pickup_time' => (string)($data['time'] ?? ''),
                    'return_date' => !empty($data['returnDate']) ? (string)$data['returnDate'] : null,
                    'return_time' => !empty($data['returnTime']) ? (string)$data['returnTime'] : null,
                    'passenger_name' => (string)($data['name'] ?? ''),
                    'phone' => (string)($data['phone'] ?? ''),
                    'email' => (string)($data['email'] ?? ''),
                    'passengers_count' => (int)($data['passengers'] ?? 1),
                    'luggage_count' => (int)($data['luggage'] ?? 1),
                    'child_seats' => (int)($data['childSeats'] ?? 0),
                    'flight_number' => !empty($data['flightNumber']) ? (string)$data['flightNumber'] : null,
                    'special_requests' => !empty($data['notes']) ? (string)$data['notes'] : null,
                    'price' => $numPrice,
                    'status' => mapStatusToDb($data['status'] ?? 'Neu'),
                ]);
                $dbSaved = true;
            }

            // Return updated list from Database
            $stmt = $pdo->query("SELECT * FROM bookings WHERE deleted_at IS NULL ORDER BY created_at DESC");
            $rows = $stmt->fetchAll();
            $result = [];
            foreach ($rows as $r) {
                $result[] = formatBookingRow($r);
            }
            echo json_encode($result, JSON_UNESCAPED_UNICODE);
            exit;
        } catch (Throwable $t) {
            $dbError = $t->getMessage();
            error_log("DB Save Error: " . $t->getMessage());
        }
    }

    // JSON file fallback (with safely checked permissions)
    if (is_writable(__DIR__) || file_exists($dataFile)) {
        if (!file_exists($dataFile)) {
            @file_put_contents($dataFile, json_encode([]), LOCK_EX);
        }
        $existingRaw = @file_get_contents($dataFile);
        $existing = json_decode($existingRaw, true);
        if (!is_array($existing)) {
            $existing = [];
        }

        if (isset($data['action']) && $data['action'] === 'update_status') {
            $id = $data['id'] ?? '';
            $status = $data['status'] ?? '';
            foreach ($existing as &$item) {
                if (isset($item['id']) && $item['id'] === $id) {
                    $item['status'] = $status;
                    break;
                }
            }
        } else if (isset($data['action']) && $data['action'] === 'delete') {
            $id = $data['id'] ?? '';
            $existing = array_values(array_filter($existing, function ($item) use ($id) {
                return isset($item['id']) && $item['id'] !== $id;
            }));
        } else if (isset($data['id'])) {
            $exists = false;
            foreach ($existing as $item) {
                if (isset($item['id']) && $item['id'] === $data['id']) {
                    $exists = true;
                    break;
                }
            }
            if (!$exists) {
                array_unshift($existing, $data);
            }
        }

        @file_put_contents($dataFile, json_encode($existing, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE), LOCK_EX);
        echo json_encode($existing, JSON_UNESCAPED_UNICODE);
        exit;
    }

    // Return response even if file storage is non-writable
    echo json_encode([
        'status' => 'error',
        'message' => 'Database connection failed and directory is not writable.',
        'db_error' => $dbError ?: ($GLOBALS['DB_CONNECT_ERROR'] ?? 'Database connection failed'),
    ], JSON_UNESCAPED_UNICODE);
    exit;
}
