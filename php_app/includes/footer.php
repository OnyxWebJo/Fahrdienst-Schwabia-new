<?php
if (!isset($lang)) $lang = 'de';
$dict = get_translations($lang);
$is_en = ($lang === 'en');
$base_url = $is_en ? '/en' : '';
?>
<footer style="background: #070d18; border-top: 1px solid #0f213d; color: #94a3b8; font-size: 0.875rem; padding: 3rem 1rem 6rem;">
  <div style="max-width: 80rem; margin: 0 auto; display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 2rem;">
    
    <div>
      <h4 style="font-family: 'Montserrat', sans-serif; font-weight: 800; color: #ffffff; font-size: 1.125rem; margin: 0 0 1rem;">
        Fahrdienst <span class="gold-gradient-text">Schwabia</span>
      </h4>
      <p style="font-size: 0.8125rem; line-height: 1.6; color: #cbd5e1;">
        Ihr erstklassiger Partner für zuverlässigen Flughafentransfer ab Augsburg nach München, Memmingen, Nürnberg &amp; Stuttgart.
      </p>
    </div>

    <div>
      <h5 style="font-family: 'Montserrat', sans-serif; font-weight: 700; color: #e6c675; font-size: 0.875rem; text-transform: uppercase; margin: 0 0 1rem;">
        Flughäfen
      </h5>
      <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.8125rem;">
        <li><a href="<?php echo $base_url; ?>/flughafentransfer-augsburg-muenchen-flughafen.php" style="color: #cbd5e1; text-decoration: none;">Flughafen München (MUC)</a></li>
        <li><a href="<?php echo $base_url; ?>/flughafentransfer-augsburg-memmingen-flughafen.php" style="color: #cbd5e1; text-decoration: none;">Flughafen Memmingen (FMM)</a></li>
        <li><a href="<?php echo $base_url; ?>/flughafentransfer-augsburg-nuernberg-flughafen.php" style="color: #cbd5e1; text-decoration: none;">Flughafen Nürnberg (NUE)</a></li>
        <li><a href="<?php echo $base_url; ?>/flughafentransfer-augsburg-stuttgart-flughafen.php" style="color: #cbd5e1; text-decoration: none;">Flughafen Stuttgart (STR)</a></li>
      </ul>
    </div>

    <div>
      <h5 style="font-family: 'Montserrat', sans-serif; font-weight: 700; color: #e6c675; font-size: 0.875rem; text-transform: uppercase; margin: 0 0 1rem;">
        Kontakt &amp; Adresse
      </h5>
      <p style="font-size: 0.8125rem; line-height: 1.6; color: #cbd5e1; margin: 0;">
        Fahrdienst Schwabia<br>
        Riedingerstr. 26 E, 86153 Augsburg<br>
        24/7 Hotline: <a href="tel:+4915201487887" style="color: #e6c675; text-decoration: none; font-weight: 700;">+49 15201487887</a><br>
        E-Mail: <a href="mailto:info@fahrdienst-schwabia.de" style="color: #e6c675; text-decoration: none;">info@fahrdienst-schwabia.de</a>
      </p>
    </div>

    <div>
      <h5 style="font-family: 'Montserrat', sans-serif; font-weight: 700; color: #e6c675; font-size: 0.875rem; text-transform: uppercase; margin: 0 0 1rem;">
        Rechtliches
      </h5>
      <ul style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.8125rem;">
        <li><a href="<?php echo $base_url; ?>/impressum.php" style="color: #cbd5e1; text-decoration: none;"><?php echo $dict['footer']['imprint']; ?></a></li>
        <li><a href="<?php echo $base_url; ?>/datenschutz.php" style="color: #cbd5e1; text-decoration: none;"><?php echo $dict['footer']['privacy']; ?></a></li>
        <li><a href="<?php echo $base_url; ?>/agb.php" style="color: #cbd5e1; text-decoration: none;"><?php echo $dict['footer']['terms']; ?></a></li>
      </ul>
    </div>

  </div>

  <div style="max-width: 80rem; margin: 2rem auto 0; padding-top: 1.5rem; border-top: 1px solid #0f213d; text-align: center; font-size: 0.75rem; color: #64748b;">
    © <?php echo date('Y'); ?> Fahrdienst Schwabia. <?php echo $dict['footer']['rights']; ?>
  </div>
</footer>
