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
  <title>Datenschutzerklärung | Fahrdienst Schwabia</title>
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
      <h1 style="font-family: 'Montserrat', sans-serif; font-weight: 800; font-size: 2rem; color: #ffffff; margin-top: 0;">Datenschutzerklärung</h1>
      
      <h2 style="color: #e6c675; font-size: 1.25rem;">1. Datenschutz auf einen Blick</h2>
      <p>Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften (DSGVO) sowie dieser Datenschutzerklärung.</p>

      <h2 style="color: #e6c675; font-size: 1.25rem; margin-top: 1.5rem;">2. Datenerfassung auf unserer Website</h2>
      <p>Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Wenn Sie ein Buchungsformular ausfüllen, werden Name, Telefonnummer, E-Mail-Adresse sowie Abhol- und Zieldaten zur Erfüllung des Beförderungsvertrages verarbeitet.</p>
    </div>
  </main>

  <?php include __DIR__ . '/includes/footer.php'; ?>
  <?php include __DIR__ . '/includes/mobile_bottom_bar.php'; ?>

</body>
</html>
