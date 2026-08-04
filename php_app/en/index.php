<?php
$lang = 'en';
require_once __DIR__ . '/../includes/i18n.php';
require_once __DIR__ . '/../includes/pricing.php';

$dict = get_translations($lang);
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
  <title>Airport Transfer Augsburg | Munich, Memmingen, Nuremberg &amp; Stuttgart | Fahrdienst Schwabia</title>
  <meta name="description" content="Reliable airport transfer from Augsburg to Munich, Memmingen, Nuremberg & Stuttgart. Guaranteed fixed prices, 24/7 service & easy online booking.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@600;700;800&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="/assets/css/style.css">
</head>
<body style="background-color: #070d18; color: #f1f5f9; min-height: 100vh; display: flex; flex-direction: column;">

  <?php include __DIR__ . '/../includes/header.php'; ?>

  <main style="flex: 1;">
    
    <!-- Hero Section -->
    <section style="position: relative; background: #070d18; color: #ffffff; padding: 2.5rem 1rem 5rem; overflow: hidden; min-height: 85vh; display: flex; flex-direction: column; justify-content: center;">
      
      <!-- Background Image -->
      <div style="position: absolute; inset: 0; width: 100%; height: 100%; overflow: hidden; z-index: 0; pointer-events: none;">
        <img src="/assets/images/hero-bg.jpg" alt="Luxury Chauffeur Car" style="width: 100%; height: 100%; object-fit: cover; object-position: center; filter: brightness(0.65) contrast(1.05);">
        <div style="position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(7,13,24,0.85) 0%, rgba(7,13,24,0.75) 50%, rgba(7,13,24,0.95) 100%);"></div>
      </div>

      <div style="max-width: 80rem; margin: 0 auto; padding: 0 1rem; position: relative; z-index: 10; width: 100%; box-sizing: border-box;">
        
        <!-- Trust Badge -->
        <div style="display: flex; justify-content: center; margin-bottom: 1.5rem;">
          <div style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.375rem 1rem; border-radius: 9999px; background: rgba(7, 13, 24, 0.9); border: 1px solid rgba(212, 168, 83, 0.4); font-size: 0.75rem; font-weight: 600; color: #e6c675; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5); backdrop-filter: blur(8px);">
            <span>🛡️ <?php echo $dict['hero']['badge']; ?></span>
            <span style="color: #475569;">•</span>
            <span style="color: #f1f5f9;">★ 4.9 Google Rating</span>
          </div>
        </div>

        <!-- Headline -->
        <div style="text-align: center; max-width: 56rem; margin: 0 auto 2rem;">
          <h1 style="font-family: 'Montserrat', sans-serif; font-size: 2.25rem; line-height: 1.2; font-weight: 800; color: #ffffff; margin: 0 0 1rem;">
            Your Reliable Airport Transfer from <span class="gold-gradient-text">Augsburg</span>
          </h1>

          <p style="font-size: 1rem; color: #e2e8f0; max-width: 42rem; margin: 0 auto 1.5rem; line-height: 1.6; font-weight: 500;">
            <?php echo $dict['hero']['subtitle']; ?>
          </p>

          <!-- Action Buttons -->
          <?php $wa_msg = urlencode("Hello Fahrdienst Schwabia, I would like to inquire about an airport transfer from Augsburg."); ?>
          <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 0.75rem;">
            <a href="https://wa.me/4915201487887?text=<?php echo $wa_msg; ?>" target="_blank" rel="noopener" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.25rem; border-radius: 0.75rem; background: #25d366; color: #ffffff; font-weight: 700; font-size: 0.875rem; text-decoration: none; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.3);">
              💬 <?php echo $dict['hero']['whatsappBtn']; ?>
            </a>

            <a href="tel:+4915201487887" style="display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.25rem; border-radius: 0.75rem; background: rgba(7, 13, 24, 0.9); border: 1px solid rgba(212, 168, 83, 0.4); color: #e6c675; font-weight: 700; font-size: 0.875rem; text-decoration: none; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.3);">
              📞 <?php echo $dict['hero']['phoneBtn']; ?>
            </a>
          </div>
        </div>

        <!-- Embedded Booking Widget -->
        <div style="max-width: 64rem; margin: 0 auto;">
          <?php include __DIR__ . '/../includes/booking_widget.php'; ?>
        </div>

      </div>
    </section>

  </main>

  <?php include __DIR__ . '/../includes/footer.php'; ?>
  <?php include __DIR__ . '/../includes/mobile_bottom_bar.php'; ?>

</body>
</html>
