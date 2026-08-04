<?php
require_once __DIR__ . '/includes/i18n.php';
require_once __DIR__ . '/includes/pricing.php';

$lang = isset($_GET['lang']) && $_GET['lang'] === 'en' ? 'en' : 'de';
$dict = get_translations($lang);
$is_en = ($lang === 'en');
$base_url = $is_en ? '/en' : '';

// Get parameters
$direction = isset($_REQUEST['direction']) ? $_REQUEST['direction'] : 'toAirport';
$tripType = isset($_REQUEST['tripType']) ? $_REQUEST['tripType'] : 'oneWay';
$pickup = isset($_REQUEST['pickup']) ? trim($_REQUEST['pickup']) : 'Augsburg';
$destination = isset($_REQUEST['destination']) ? $_REQUEST['destination'] : 'MUC';
$date = isset($_REQUEST['date']) && !empty($_REQUEST['date']) ? $_REQUEST['date'] : date('Y-m-d');
$time = isset($_REQUEST['time']) ? $_REQUEST['time'] : '08:00';
$returnDate = isset($_REQUEST['returnDate']) ? $_REQUEST['returnDate'] : '';
$returnTime = isset($_REQUEST['returnTime']) ? $_REQUEST['returnTime'] : '12:00';
$passengers = isset($_REQUEST['passengers']) ? (int)$_REQUEST['passengers'] : 1;
$luggage = isset($_REQUEST['luggage']) ? (int)$_REQUEST['luggage'] : 1;
$childSeats = isset($_REQUEST['childSeats']) ? (int)$_REQUEST['childSeats'] : 0;
$flightNumber = isset($_REQUEST['flightNumber']) ? trim($_REQUEST['flightNumber']) : '';
$fullName = isset($_REQUEST['fullName']) ? trim($_REQUEST['fullName']) : '';
$phone = isset($_REQUEST['phone']) ? trim($_REQUEST['phone']) : '';
$email = isset($_REQUEST['email']) ? trim($_REQUEST['email']) : '';
$notes = isset($_REQUEST['notes']) ? trim($_REQUEST['notes']) : '';

$step = isset($_REQUEST['step']) ? (int)$_REQUEST['step'] : 1;
$is_submitted = ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['submit_booking']));
$booking_id = '';

if ($is_submitted) {
    $booking_id = 'FS-' . rand(100000, 999999);
}

$dest_name = get_destination_name($destination, $lang);
$calculated_price = calculate_trip_price($destination, $passengers, $tripType);

$route_text = ($direction === 'toAirport') ? "{$pickup} ➔ {$dest_name}" : "{$dest_name} ➔ {$pickup}";
?>
<!DOCTYPE html>
<html lang="<?php echo $lang; ?>">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
  <title><?php echo $dict['booking']['title']; ?> | Fahrdienst Schwabia</title>
  <meta name="description" content="Buchen Sie Ihren Flughafentransfer ab Augsburg bequem online. Festpreisgarantie & 24/7 Service.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@600;700;800&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="/assets/css/style.css">
</head>
<body style="background-color: #070d18; color: #f1f5f9; min-height: 100vh; display: flex; flex-direction: column;">

  <?php include __DIR__ . '/includes/header.php'; ?>

  <main style="flex: 1; padding: 2.5rem 1rem 6rem;">
    <div style="max-width: 56rem; margin: 0 auto;">
      
      <!-- Page Header -->
      <div style="text-align: center; margin-bottom: 2rem;">
        <span style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: #e6c675; background: #0a1628; padding: 0.25rem 0.75rem; border-radius: 9999px; border: 1px solid rgba(212, 168, 83, 0.3);">
          Online Booking
        </span>
        <h1 style="font-family: 'Montserrat', sans-serif; font-weight: 800; font-size: 2rem; color: #ffffff; margin: 0.75rem 0 0.5rem;">
          <?php echo $dict['booking']['title']; ?>
        </h1>
        <p style="font-size: 0.875rem; color: #cbd5e1; margin: 0;">
          <?php echo $dict['booking']['fixedPriceNotice']; ?>
        </p>
      </div>

      <?php if ($is_submitted): ?>
        <!-- Success Confirmation Card -->
        <div style="background: #0a1628; border: 1px solid rgba(52, 211, 153, 0.4); padding: 2.5rem 1.5rem; border-radius: 1.5rem; text-align: center; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);">
          <div style="width: 4rem; height: 4rem; border-radius: 9999px; background: rgba(52, 211, 153, 0.2); color: #34d399; font-size: 2rem; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem;">
            ✓
          </div>

          <h2 style="font-family: 'Montserrat', sans-serif; font-weight: 800; font-size: 1.5rem; color: #ffffff; margin: 0 0 1rem;">
            <?php echo $dict['booking']['successTitle']; ?>
          </h2>

          <p style="font-size: 0.875rem; color: #cbd5e1; max-width: 32rem; margin: 0 auto 1.5rem; line-height: 1.6;">
            <?php echo $dict['booking']['successDesc']; ?>
          </p>

          <div style="background: #070d18; border: 1px solid #0f213d; padding: 1.25rem; border-radius: 1rem; display: inline-block; text-align: left; margin-bottom: 1.5rem;">
            <div style="font-size: 0.75rem; color: #94a3b8;"><?php echo $dict['booking']['bookingId']; ?>:</div>
            <div style="font-family: monospace; font-weight: 700; font-size: 1.25rem; color: #e6c675;"><?php echo $booking_id; ?></div>
            <div style="font-size: 0.875rem; color: #ffffff; margin-top: 0.5rem;">Strecke: <strong><?php echo htmlspecialchars($route_text); ?></strong></div>
            <div style="font-size: 0.875rem; color: #ffffff;">Datum: <strong><?php echo htmlspecialchars($date); ?> um <?php echo htmlspecialchars($time); ?> Uhr</strong></div>
            <div style="font-size: 0.875rem; color: #34d399; font-weight: 700; margin-top: 0.5rem;">Garantieter Festpreis: <?php echo $calculated_price; ?> €</div>
          </div>

          <?php
          $wa_text = urlencode("Hallo Fahrdienst Schwabia, ich habe eine Buchungsanfrage (ID: {$booking_id}) für {$route_text} am {$date} um {$time} Uhr. Name: {$fullName}, Tel: {$phone}. Festpreis: {$calculated_price} €.");
          ?>
          <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 1rem;">
            <a href="https://wa.me/4915201487887?text=<?php echo $wa_text; ?>" target="_blank" rel="noopener" style="background: #25d366; color: #ffffff; font-weight: 700; padding: 0.75rem 1.5rem; border-radius: 0.75rem; text-decoration: none; font-size: 0.875rem;">
              💬 Details per WhatsApp senden
            </a>
            <a href="<?php echo $base_url; ?>/" class="gold-gradient-bg" style="color: #070d18; font-weight: 700; padding: 0.75rem 1.5rem; border-radius: 0.75rem; text-decoration: none; font-size: 0.875rem;">
              Zurück zur Startseite
            </a>
          </div>
        </div>

      <?php else: ?>

        <!-- Multi-Step Booking Form Container -->
        <div style="background: #0a1628; border: 1px solid rgba(212, 168, 83, 0.3); border-radius: 1.5rem; padding: 1.5rem; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);">
          
          <!-- Progress Indicator -->
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.5rem; border-bottom: 1px solid #0f213d; padding-bottom: 1rem; margin-bottom: 1.5rem; text-align: center; font-size: 0.75rem;">
            <div style="color: <?php echo ($step >= 1) ? '#e6c675; font-weight: 700;' : '#64748b;'; ?>">
              <span style="display: inline-block; width: 1.5rem; height: 1.5rem; border-radius: 9999px; background: #070d18; border: 1px solid currentColor; line-height: 1.5rem;">1</span>
              <div><?php echo $dict['booking']['step1']; ?></div>
            </div>
            <div style="color: <?php echo ($step >= 2) ? '#e6c675; font-weight: 700;' : '#64748b;'; ?>">
              <span style="display: inline-block; width: 1.5rem; height: 1.5rem; border-radius: 9999px; background: #070d18; border: 1px solid currentColor; line-height: 1.5rem;">2</span>
              <div><?php echo $dict['booking']['step2']; ?></div>
            </div>
            <div style="color: <?php echo ($step >= 3) ? '#e6c675; font-weight: 700;' : '#64748b;'; ?>">
              <span style="display: inline-block; width: 1.5rem; height: 1.5rem; border-radius: 9999px; background: #070d18; border: 1px solid currentColor; line-height: 1.5rem;">3</span>
              <div><?php echo $dict['booking']['step3']; ?></div>
            </div>
            <div style="color: <?php echo ($step >= 4) ? '#e6c675; font-weight: 700;' : '#64748b;'; ?>">
              <span style="display: inline-block; width: 1.5rem; height: 1.5rem; border-radius: 9999px; background: #070d18; border: 1px solid currentColor; line-height: 1.5rem;">4</span>
              <div><?php echo $dict['booking']['step4']; ?></div>
            </div>
          </div>

          <form action="buchung.php" method="POST">
            <input type="hidden" name="direction" value="<?php echo htmlspecialchars($direction); ?>">
            <input type="hidden" name="tripType" value="<?php echo htmlspecialchars($tripType); ?>">

            <?php if ($step === 1): ?>
              <!-- STEP 1: Route & Direction -->
              <input type="hidden" name="step" value="2">
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.25rem; margin-bottom: 1.5rem;">
                
                <div>
                  <label style="font-size: 0.75rem; font-weight: 600; color: #cbd5e1; display: block; margin-bottom: 0.5rem;">Fahrtart</label>
                  <div style="display: flex; gap: 0.5rem;">
                    <a href="?tripType=oneWay&direction=<?php echo $direction; ?>&pickup=<?php echo urlencode($pickup); ?>&destination=<?php echo $destination; ?>&step=1" style="flex: 1; padding: 0.75rem; text-align: center; border-radius: 0.75rem; font-weight: 700; font-size: 0.75rem; text-decoration: none; <?php echo ($tripType === 'oneWay') ? 'background: linear-gradient(135deg, #e6c675 0%, #d4a853 50%, #c3933c 100%); color: #070d18;' : 'background: #070d18; color: #cbd5e1; border: 1px solid #0f213d;'; ?>">
                      Einzelfahrt
                    </a>
                    <a href="?tripType=roundTrip&direction=<?php echo $direction; ?>&pickup=<?php echo urlencode($pickup); ?>&destination=<?php echo $destination; ?>&step=1" style="flex: 1; padding: 0.75rem; text-align: center; border-radius: 0.75rem; font-weight: 700; font-size: 0.75rem; text-decoration: none; <?php echo ($tripType === 'roundTrip') ? 'background: linear-gradient(135deg, #e6c675 0%, #d4a853 50%, #c3933c 100%); color: #070d18;' : 'background: #070d18; color: #cbd5e1; border: 1px solid #0f213d;'; ?>">
                      Hin- &amp; Rückfahrt
                    </a>
                  </div>
                </div>

                <div>
                  <label style="font-size: 0.75rem; font-weight: 600; color: #cbd5e1; display: block; margin-bottom: 0.5rem;">Richtung</label>
                  <div style="display: flex; gap: 0.5rem;">
                    <a href="?direction=toAirport&tripType=<?php echo $tripType; ?>&pickup=<?php echo urlencode($pickup); ?>&destination=<?php echo $destination; ?>&step=1" style="flex: 1; padding: 0.75rem; text-align: center; border-radius: 0.75rem; font-weight: 700; font-size: 0.75rem; text-decoration: none; <?php echo ($direction === 'toAirport') ? 'background: linear-gradient(135deg, #e6c675 0%, #d4a853 50%, #c3933c 100%); color: #070d18;' : 'background: #070d18; color: #cbd5e1; border: 1px solid #0f213d;'; ?>">
                      Zum Flughafen
                    </a>
                    <a href="?direction=fromAirport&tripType=<?php echo $tripType; ?>&pickup=<?php echo urlencode($pickup); ?>&destination=<?php echo $destination; ?>&step=1" style="flex: 1; padding: 0.75rem; text-align: center; border-radius: 0.75rem; font-weight: 700; font-size: 0.75rem; text-decoration: none; <?php echo ($direction === 'fromAirport') ? 'background: linear-gradient(135deg, #e6c675 0%, #d4a853 50%, #c3933c 100%); color: #070d18;' : 'background: #070d18; color: #cbd5e1; border: 1px solid #0f213d;'; ?>">
                      Vom Flughafen
                    </a>
                  </div>
                </div>

              </div>

              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.25rem; margin-bottom: 1.5rem;">
                <div>
                  <label style="font-size: 0.75rem; font-weight: 600; color: #cbd5e1; display: block; margin-bottom: 0.375rem;"><?php echo $dict['booking']['pickupLocation']; ?></label>
                  <input type="text" name="pickup" value="<?php echo htmlspecialchars($pickup); ?>" required style="width: 100%; background: #070d18; border: 1px solid #162c52; color: #ffffff; border-radius: 0.75rem; padding: 0.75rem; font-size: 0.75rem; box-sizing: border-box;">
                </div>

                <div>
                  <label style="font-size: 0.75rem; font-weight: 600; color: #cbd5e1; display: block; margin-bottom: 0.375rem;"><?php echo $dict['booking']['destination']; ?></label>
                  <select name="destination" style="width: 100%; background: #070d18; border: 1px solid #162c52; color: #ffffff; border-radius: 0.75rem; padding: 0.75rem; font-size: 0.75rem; box-sizing: border-box;">
                    <option value="MUC" <?php if ($destination === 'MUC') echo 'selected'; ?>><?php echo $dict['airports']['munich']; ?></option>
                    <option value="FMM" <?php if ($destination === 'FMM') echo 'selected'; ?>><?php echo $dict['airports']['memmingen']; ?></option>
                    <option value="NUE" <?php if ($destination === 'NUE') echo 'selected'; ?>><?php echo $dict['airports']['nuremberg']; ?></option>
                    <option value="STR" <?php if ($destination === 'STR') echo 'selected'; ?>><?php echo $dict['airports']['stuttgart']; ?></option>
                  </select>
                </div>
              </div>

              <div style="display: flex; justify-content: flex-end; border-top: 1px solid #0f213d; padding-top: 1rem;">
                <button type="submit" class="gold-gradient-bg" style="border: none; color: #070d18; font-weight: 800; font-size: 0.875rem; padding: 0.75rem 1.75rem; border-radius: 0.75rem; cursor: pointer;">
                  Weiter: Datum &amp; Zeit →
                </button>
              </div>

            <?php elseif ($step === 2): ?>
              <!-- STEP 2: Date & Time -->
              <input type="hidden" name="step" value="3">
              <input type="hidden" name="pickup" value="<?php echo htmlspecialchars($pickup); ?>">
              <input type="hidden" name="destination" value="<?php echo htmlspecialchars($destination); ?>">

              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.25rem; margin-bottom: 1.5rem;">
                <div>
                  <label style="font-size: 0.75rem; font-weight: 600; color: #cbd5e1; display: block; margin-bottom: 0.375rem;"><?php echo $dict['booking']['date']; ?></label>
                  <input type="date" name="date" value="<?php echo htmlspecialchars($date); ?>" required style="width: 100%; background: #070d18; border: 1px solid #162c52; color: #ffffff; border-radius: 0.75rem; padding: 0.75rem; font-size: 0.75rem; color-scheme: dark; box-sizing: border-box;">
                </div>

                <div>
                  <label style="font-size: 0.75rem; font-weight: 600; color: #cbd5e1; display: block; margin-bottom: 0.375rem;"><?php echo $dict['booking']['time']; ?></label>
                  <input type="time" name="time" value="<?php echo htmlspecialchars($time); ?>" required style="width: 100%; background: #070d18; border: 1px solid #162c52; color: #ffffff; border-radius: 0.75rem; padding: 0.75rem; font-size: 0.75rem; color-scheme: dark; box-sizing: border-box;">
                </div>
              </div>

              <?php if ($tripType === 'roundTrip'): ?>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1.25rem; margin-bottom: 1.5rem; background: #070d18; border: 1px solid #0f213d; padding: 1rem; border-radius: 0.75rem;">
                  <div>
                    <label style="font-size: 0.75rem; font-weight: 600; color: #e6c675; display: block; margin-bottom: 0.375rem;">Rückfahrt Datum</label>
                    <input type="date" name="returnDate" value="<?php echo htmlspecialchars($returnDate ?: $date); ?>" required style="width: 100%; background: #0a1628; border: 1px solid #162c52; color: #ffffff; border-radius: 0.75rem; padding: 0.75rem; font-size: 0.75rem; color-scheme: dark; box-sizing: border-box;">
                  </div>

                  <div>
                    <label style="font-size: 0.75rem; font-weight: 600; color: #e6c675; display: block; margin-bottom: 0.375rem;">Rückfahrt Uhrzeit</label>
                    <input type="time" name="returnTime" value="<?php echo htmlspecialchars($returnTime); ?>" required style="width: 100%; background: #0a1628; border: 1px solid #162c52; color: #ffffff; border-radius: 0.75rem; padding: 0.75rem; font-size: 0.75rem; color-scheme: dark; box-sizing: border-box;">
                  </div>
                </div>
              <?php endif; ?>

              <div style="display: flex; justify-content: space-between; border-top: 1px solid #0f213d; padding-top: 1rem;">
                <a href="?step=1&direction=<?php echo $direction; ?>&tripType=<?php echo $tripType; ?>&pickup=<?php echo urlencode($pickup); ?>&destination=<?php echo $destination; ?>" style="background: #070d18; color: #cbd5e1; border: 1px solid #162c52; font-weight: 600; font-size: 0.875rem; padding: 0.75rem 1.25rem; border-radius: 0.75rem; text-decoration: none;">
                  ← Zurück
                </a>
                <button type="submit" class="gold-gradient-bg" style="border: none; color: #070d18; font-weight: 800; font-size: 0.875rem; padding: 0.75rem 1.75rem; border-radius: 0.75rem; cursor: pointer;">
                  Weiter: Passagiere →
                </button>
              </div>

            <?php elseif ($step === 3): ?>
              <!-- STEP 3: Passengers & Luggage -->
              <input type="hidden" name="step" value="4">
              <input type="hidden" name="pickup" value="<?php echo htmlspecialchars($pickup); ?>">
              <input type="hidden" name="destination" value="<?php echo htmlspecialchars($destination); ?>">
              <input type="hidden" name="date" value="<?php echo htmlspecialchars($date); ?>">
              <input type="hidden" name="time" value="<?php echo htmlspecialchars($time); ?>">
              <input type="hidden" name="returnDate" value="<?php echo htmlspecialchars($returnDate); ?>">
              <input type="hidden" name="returnTime" value="<?php echo htmlspecialchars($returnTime); ?>">

              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.25rem; margin-bottom: 1.5rem;">
                <div>
                  <label style="font-size: 0.75rem; font-weight: 600; color: #cbd5e1; display: block; margin-bottom: 0.375rem;"><?php echo $dict['booking']['passengers']; ?></label>
                  <select name="passengers" style="width: 100%; background: #070d18; border: 1px solid #162c52; color: #ffffff; border-radius: 0.75rem; padding: 0.75rem; font-size: 0.75rem; box-sizing: border-box;">
                    <option value="1" <?php if ($passengers == 1) echo 'selected'; ?>>1 Person</option>
                    <option value="2" <?php if ($passengers == 2) echo 'selected'; ?>>2 Personen</option>
                    <option value="3" <?php if ($passengers == 3) echo 'selected'; ?>>3 Personen</option>
                    <option value="4" <?php if ($passengers == 4) echo 'selected'; ?>>4 Personen</option>
                    <option value="5" <?php if ($passengers == 5) echo 'selected'; ?>>5 Personen (Großraum)</option>
                    <option value="6" <?php if ($passengers == 6) echo 'selected'; ?>>6–8 Personen (VIP Van)</option>
                  </select>
                </div>

                <div>
                  <label style="font-size: 0.75rem; font-weight: 600; color: #cbd5e1; display: block; margin-bottom: 0.375rem;">Koffer / Gepäckstücke</label>
                  <select name="luggage" style="width: 100%; background: #070d18; border: 1px solid #162c52; color: #ffffff; border-radius: 0.75rem; padding: 0.75rem; font-size: 0.75rem; box-sizing: border-box;">
                    <option value="1">1 Koffer</option>
                    <option value="2">2 Koffer</option>
                    <option value="3">3 Koffer</option>
                    <option value="4">4+ Koffer</option>
                  </select>
                </div>

                <div>
                  <label style="font-size: 0.75rem; font-weight: 600; color: #cbd5e1; display: block; margin-bottom: 0.375rem;">Kindersitze</label>
                  <select name="childSeats" style="width: 100%; background: #070d18; border: 1px solid #162c52; color: #ffffff; border-radius: 0.75rem; padding: 0.75rem; font-size: 0.75rem; box-sizing: border-box;">
                    <option value="0">Keine</option>
                    <option value="1">1 Kindersitz</option>
                    <option value="2">2 Kindersitze</option>
                  </select>
                </div>
              </div>

              <div style="margin-bottom: 1.5rem;">
                <label style="font-size: 0.75rem; font-weight: 600; color: #cbd5e1; display: block; margin-bottom: 0.375rem;">Flugnummer (optional)</label>
                <input type="text" name="flightNumber" value="<?php echo htmlspecialchars($flightNumber); ?>" placeholder="z. B. LH 2042" style="width: 100%; background: #070d18; border: 1px solid #162c52; color: #ffffff; border-radius: 0.75rem; padding: 0.75rem; font-size: 0.75rem; box-sizing: border-box;">
              </div>

              <div style="display: flex; justify-content: space-between; border-top: 1px solid #0f213d; padding-top: 1rem;">
                <a href="?step=2&direction=<?php echo $direction; ?>&tripType=<?php echo $tripType; ?>&pickup=<?php echo urlencode($pickup); ?>&destination=<?php echo $destination; ?>&date=<?php echo urlencode($date); ?>&time=<?php echo urlencode($time); ?>" style="background: #070d18; color: #cbd5e1; border: 1px solid #162c52; font-weight: 600; font-size: 0.875rem; padding: 0.75rem 1.25rem; border-radius: 0.75rem; text-decoration: none;">
                  ← Zurück
                </a>
                <button type="submit" class="gold-gradient-bg" style="border: none; color: #070d18; font-weight: 800; font-size: 0.875rem; padding: 0.75rem 1.75rem; border-radius: 0.75rem; cursor: pointer;">
                  Weiter: Kontaktdaten →
                </button>
              </div>

            <?php elseif ($step === 4): ?>
              <!-- STEP 4: Contact Info & Submission -->
              <input type="hidden" name="step" value="4">
              <input type="hidden" name="submit_booking" value="1">
              <input type="hidden" name="pickup" value="<?php echo htmlspecialchars($pickup); ?>">
              <input type="hidden" name="destination" value="<?php echo htmlspecialchars($destination); ?>">
              <input type="hidden" name="date" value="<?php echo htmlspecialchars($date); ?>">
              <input type="hidden" name="time" value="<?php echo htmlspecialchars($time); ?>">
              <input type="hidden" name="returnDate" value="<?php echo htmlspecialchars($returnDate); ?>">
              <input type="hidden" name="returnTime" value="<?php echo htmlspecialchars($returnTime); ?>">
              <input type="hidden" name="passengers" value="<?php echo htmlspecialchars($passengers); ?>">
              <input type="hidden" name="luggage" value="<?php echo htmlspecialchars($luggage); ?>">
              <input type="hidden" name="childSeats" value="<?php echo htmlspecialchars($childSeats); ?>">
              <input type="hidden" name="flightNumber" value="<?php echo htmlspecialchars($flightNumber); ?>">

              <div style="background: #070d18; border: 1px solid #0f213d; padding: 1rem; border-radius: 0.75rem; margin-bottom: 1.5rem;">
                <div style="font-size: 0.75rem; color: #e6c675; font-weight: 700; margin-bottom: 0.5rem;">Zusammenfassung:</div>
                <div style="font-size: 0.875rem; color: #ffffff; font-weight: 600;"><?php echo htmlspecialchars($route_text); ?></div>
                <div style="font-size: 0.75rem; color: #cbd5e1; margin-top: 0.25rem;">Datum: <?php echo htmlspecialchars($date); ?> um <?php echo htmlspecialchars($time); ?> Uhr • <?php echo $passengers; ?> Person(en)</div>
                <div style="font-size: 1rem; font-weight: 800; color: #34d399; margin-top: 0.5rem;">Festpreis: <?php echo $calculated_price; ?> €</div>
              </div>

              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1.25rem; margin-bottom: 1.5rem;">
                <div>
                  <label style="font-size: 0.75rem; font-weight: 600; color: #cbd5e1; display: block; margin-bottom: 0.375rem;">Vor- &amp; Nachname *</label>
                  <input type="text" name="fullName" required placeholder="Max Mustermann" style="width: 100%; background: #070d18; border: 1px solid #162c52; color: #ffffff; border-radius: 0.75rem; padding: 0.75rem; font-size: 0.75rem; box-sizing: border-box;">
                </div>

                <div>
                  <label style="font-size: 0.75rem; font-weight: 600; color: #cbd5e1; display: block; margin-bottom: 0.375rem;">Telefonnummer / Mobil *</label>
                  <input type="tel" name="phone" required placeholder="+49 170 1234567" style="width: 100%; background: #070d18; border: 1px solid #162c52; color: #ffffff; border-radius: 0.75rem; padding: 0.75rem; font-size: 0.75rem; box-sizing: border-box;">
                </div>

                <div>
                  <label style="font-size: 0.75rem; font-weight: 600; color: #cbd5e1; display: block; margin-bottom: 0.375rem;">E-Mail Adresse *</label>
                  <input type="email" name="email" required placeholder="max@beispiel.de" style="width: 100%; background: #070d18; border: 1px solid #162c52; color: #ffffff; border-radius: 0.75rem; padding: 0.75rem; font-size: 0.75rem; box-sizing: border-box;">
                </div>
              </div>

              <div style="margin-bottom: 1.5rem;">
                <label style="font-size: 0.75rem; font-weight: 600; color: #cbd5e1; display: block; margin-bottom: 0.375rem;">Anmerkungen (optional)</label>
                <textarea name="notes" rows="3" placeholder="Sonderwünsche, Abholort Details..." style="width: 100%; background: #070d18; border: 1px solid #162c52; color: #ffffff; border-radius: 0.75rem; padding: 0.75rem; font-size: 0.75rem; box-sizing: border-box;"></textarea>
              </div>

              <div style="margin-bottom: 1.5rem; display: flex; align-items: flex-start; gap: 0.5rem; font-size: 0.75rem; color: #cbd5e1;">
                <input type="checkbox" name="privacyConsent" id="privacy" required style="margin-top: 0.2rem;">
                <label for="privacy">Ich akzeptiere die <a href="/datenschutz.php" target="_blank" style="color: #e6c675;">Datenschutzerklärung</a> und willige in die Datenverarbeitung ein.</label>
              </div>

              <div style="display: flex; justify-content: space-between; border-top: 1px solid #0f213d; padding-top: 1rem;">
                <a href="?step=3&direction=<?php echo $direction; ?>&tripType=<?php echo $tripType; ?>&pickup=<?php echo urlencode($pickup); ?>&destination=<?php echo $destination; ?>&date=<?php echo urlencode($date); ?>&time=<?php echo urlencode($time); ?>" style="background: #070d18; color: #cbd5e1; border: 1px solid #162c52; font-weight: 600; font-size: 0.875rem; padding: 0.75rem 1.25rem; border-radius: 0.75rem; text-decoration: none;">
                  ← Zurück
                </a>
                <button type="submit" class="gold-gradient-bg" style="border: none; color: #070d18; font-weight: 800; font-size: 0.875rem; padding: 0.875rem 2rem; border-radius: 0.75rem; cursor: pointer; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.3);">
                  Jetzt Verbindlich Anfragen ✓
                </button>
              </div>

            <?php endif; ?>
          </form>

        </div>

      <?php endif; ?>

    </div>
  </main>

  <?php include __DIR__ . '/includes/footer.php'; ?>
  <?php include __DIR__ . '/includes/mobile_bottom_bar.php'; ?>

</body>
</html>
