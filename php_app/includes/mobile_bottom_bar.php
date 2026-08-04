<?php
if (!isset($lang)) $lang = 'de';
$dict = get_translations($lang);
$is_en = ($lang === 'en');
$base_url = $is_en ? '/en' : '';
$wa_msg = urlencode($is_en ? "Hello Fahrdienst Schwabia, I would like to inquire about an airport transfer from Augsburg." : "Hallo Fahrdienst Schwabia, ich möchte mich nach einem Flughafentransfer ab Augsburg erkundigen.");
?>
<!-- Mobile Bottom Action Bar (Fixed at bottom on phones/tablets) -->
<div style="position: fixed; bottom: 0; left: 0; right: 0; z-index: 40; background: rgba(7, 13, 24, 0.95); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-top: 1px solid #0f213d; padding: 0.625rem 0.75rem; box-shadow: 0 -10px 25px -5px rgba(0, 0, 0, 0.5);">
  <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.5rem; max-width: 28rem; margin: 0 auto;">
    
    <!-- WhatsApp -->
    <a href="https://wa.me/4915201487887?text=<?php echo $wa_msg; ?>" target="_blank" rel="noopener" style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 0.5rem 0.25rem; border-radius: 0.75rem; background: #25d366; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 0.625rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
      <span style="font-size: 0.875rem; line-height: 1;">💬</span>
      <span>WhatsApp</span>
    </a>

    <!-- Phone Call -->
    <a href="tel:+4915201487887" style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 0.5rem 0.25rem; border-radius: 0.75rem; background: #0f213d; border: 1px solid rgba(212, 168, 83, 0.3); color: #e6c675; text-decoration: none; font-weight: 700; font-size: 0.625rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
      <span style="font-size: 0.875rem; line-height: 1;">📞</span>
      <span><?php echo $dict['header']['callNow']; ?></span>
    </a>

    <!-- Book Now -->
    <a href="<?php echo $base_url; ?>/buchung.php" class="gold-gradient-bg" style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 0.5rem 0.25rem; border-radius: 0.75rem; color: #070d18; text-decoration: none; font-weight: 800; font-size: 0.625rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
      <span style="font-size: 0.875rem; line-height: 1;">📅</span>
      <span><?php echo $dict['header']['bookNow']; ?></span>
    </a>

  </div>
</div>
