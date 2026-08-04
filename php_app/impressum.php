<?php
$lang = 'de';
require_once __DIR__ . '/includes/i18n.php';
$dict = get_translations($lang);
?>
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Impressum | Fahrdienst Schwabia</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@600;700;800&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="/assets/css/style.css">
</head>
<body style="background-color: #070d18; color: #f1f5f9; min-height: 100vh; display: flex; flex-direction: column;">

  <?php include __DIR__ . '/includes/header.php'; ?>

  <main style="flex: 1; padding: 4rem 1rem;">
    <div style="max-width: 48rem; margin: 0 auto; background: #0a1628; border: 1px solid #0f213d; padding: 2.5rem; border-radius: 1.5rem; line-height: 1.7; font-size: 0.9375rem; color: #cbd5e1;">
      <h1 style="font-family: 'Montserrat', sans-serif; font-weight: 800; font-size: 2rem; color: #ffffff; margin-top: 0;">Impressum</h1>
      
      <p><strong>Angaben gemäß § 5 TMG:</strong></p>
      <p>
        Fahrdienst Schwabia<br>
        Inhaber: Shadi Al-Schwabia<br>
        Riedingerstr. 26 E<br>
        86153 Augsburg
      </p>

      <p><strong>Kontakt:</strong></p>
      <p>
        Telefon: +49 15201487887<br>
        Büro: +49 821 24411214<br>
        E-Mail: info@fahrdienst-schwabia.de
      </p>

      <p><strong>Aufsichtsbehörde:</strong></p>
      <p>Stadt Augsburg – Ordnungsamt / Verkehrsgewerbe</p>

      <p><strong>Umsatzsteuer-ID:</strong></p>
      <p>Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz: DE349201948</p>
    </div>
  </main>

  <?php include __DIR__ . '/includes/footer.php'; ?>
  <?php include __DIR__ . '/includes/mobile_bottom_bar.php'; ?>

</body>
</html>
