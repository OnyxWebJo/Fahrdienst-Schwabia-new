<?php
$lang = 'de';
require_once __DIR__ . '/includes/i18n.php';
require_once __DIR__ . '/includes/pricing.php';

$dict = get_translations($lang);
?>
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
  <title>Flughafentransfer Augsburg nach München Flughafen (MUC) | Festpreis ab 90 €</title>
  <meta name="description" content="Zuverlässiger Flughafentransfer von Augsburg zum Flughafen München (MUC). Garantiere Festpreise ab 90 €, 24/7 Service, Haustürabholung. Online buchen!">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@600;700;800&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="/assets/css/style.css">
</head>
<body style="background-color: #070d18; color: #f1f5f9; min-height: 100vh; display: flex; flex-direction: column;">

  <?php include __DIR__ . '/includes/header.php'; ?>

  <main style="flex: 1;">
    <section style="position: relative; background: #070d18; padding: 3rem 1rem 4rem;">
      <div style="max-width: 80rem; margin: 0 auto; padding: 0 1rem;">
        
        <div style="text-align: center; max-width: 48rem; margin: 0 auto 2rem;">
          <span style="font-size: 0.75rem; font-weight: 700; color: #e6c675; text-transform: uppercase; letter-spacing: 0.1em; background: #0a1628; padding: 0.25rem 0.75rem; border-radius: 9999px; border: 1px solid rgba(212,168,83,0.3);">
            Augsburg ➔ Flughafen München (MUC)
          </span>
          <h1 style="font-family: 'Montserrat', sans-serif; font-weight: 800; font-size: 2.25rem; color: #ffffff; margin: 0.75rem 0 0.5rem;">
            Flughafentransfer Augsburg <span class="gold-gradient-text">München</span>
          </h1>
          <p style="font-size: 1rem; color: #cbd5e1; margin: 0;">
            Bequem, pünktlich und garantiert ohne versteckte Kosten direkt ab Ihrer Haustür in Augsburg zum Terminal 1 oder Terminal 2 in München.
          </p>
        </div>

        <div style="max-width: 64rem; margin: 0 auto;">
          <?php 
          $preselectedAirport = 'MUC';
          include __DIR__ . '/includes/booking_widget.php'; 
          ?>
        </div>

      </div>
    </section>

    <!-- Page Content Info -->
    <section style="padding: 4rem 1rem; background: #0a1628; border-top: 1px solid #0f213d;">
      <div style="max-width: 56rem; margin: 0 auto; font-size: 0.9375rem; line-height: 1.7; color: #cbd5e1;">
        <h2 style="font-family: 'Montserrat', sans-serif; font-size: 1.5rem; color: #ffffff; margin-bottom: 1rem;">Entspannt von Augsburg zum Flughafen München</h2>
        <p>Der Flughafen München (MUC) liegt ca. 85 bis 95 km östlich von Augsburg. Mit dem eigenen Auto zahlen Sie hohe Parkgebühren, mit der Bahn müssen Sie mehrmals umsteigen. Unser Chauffeurservice holt Sie direkt vor Ihrer Haustür in Augsburg ab und bringt Sie entspannt ans Terminal.</p>
        <div style="background: #070d18; border: 1px solid #162c52; padding: 1.25rem; border-radius: 1rem; margin: 1.5rem 0; font-weight: 700; color: #34d399;">
          Garantiere Festpreise nach München (MUC):<br>
          • 1 Person: 90 €<br>
          • 2 Personen: 100 €<br>
          • 3 Personen: 110 €<br>
          • 4 Personen: 120 €
        </div>
      </div>
    </section>
  </main>

  <?php include __DIR__ . '/includes/footer.php'; ?>
  <?php include __DIR__ . '/includes/mobile_bottom_bar.php'; ?>

</body>
</html>
