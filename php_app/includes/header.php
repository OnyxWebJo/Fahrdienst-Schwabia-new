<?php
if (!isset($lang)) $lang = 'de';
$dict = get_translations($lang);
$is_en = ($lang === 'en');
$base_url = $is_en ? '/en' : '';
$current_page = $_SERVER['REQUEST_URI'];

$toggle_lang_url = $is_en ? str_replace('/en', '', $current_page) : '/en' . ($current_page === '/' ? '' : $current_page);
if (empty($toggle_lang_url)) $toggle_lang_url = '/';
?>
<!-- Top Bar — Desktop Only -->
<div className="bg-navy-950 text-slate-300 text-xs py-2 px-4 border-b border-navy-800/60 hidden md:block" style="background-color: #070d18; color: #cbd5e1; font-size: 0.75rem; padding: 0.5rem 1rem; border-bottom: 1px solid rgba(30,58,109,0.6);">
  <div style="max-width: 80rem; margin: 0 auto; display: flex; justify-content: space-between; align-items: center;">
    <div style="display: flex; align-items: center; gap: 1.5rem;">
      <span style="color: #e6c675; font-weight: 500; display: flex; align-items: center; gap: 0.375rem;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
        Festpreisgarantie &amp; 24/7 Service
      </span>
      <span style="color: #94a3b8;">Riedingerstr. 26 E, 86153 Augsburg</span>
    </div>
    <div style="display: flex; align-items: center; gap: 1rem;">
      <a href="tel:+4915201487887" style="color: #cbd5e1; text-decoration: none; font-weight: 600; display: flex; align-items: center; gap: 0.25rem;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d4a853" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        +49 15201487887
      </a>
      <span style="color: #1e3a6d;">|</span>
      <a href="tel:+4982124411214" style="color: #cbd5e1; text-decoration: none;">Büro: +49 821 24411214</a>
    </div>
  </div>
</div>

<!-- Main Sticky Header -->
<header className="sticky top-0 z-50 glass-navy border-b border-navy-800" style="position: sticky; top: 0; z-index: 50; background: rgba(10, 22, 40, 0.95); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-bottom: 1px solid #0f213d; padding: 0.75rem 1rem;">
  <div style="max-width: 80rem; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 0.5rem;">
    
    <!-- Logo -->
    <a href="<?php echo $base_url; ?>/" style="display: flex; align-items: center; gap: 0.75rem; text-decoration: none;">
      <img src="/assets/images/logo.png" alt="Fahrdienst Schwabia" style="height: 2.75rem; width: auto; object-fit: contain;">
      <div style="display: flex; flex-direction: column;">
        <span style="font-family: 'Montserrat', sans-serif; font-weight: 800; font-size: 1.125rem; color: #ffffff; letter-spacing: -0.025em;">
          Fahrdienst <span class="gold-gradient-text">Schwabia</span>
        </span>
        <span style="font-size: 0.625rem; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">
          Augsburg Airport Transfer
        </span>
      </div>
    </a>

    <!-- Desktop Nav Links -->
    <nav className="hidden lg:flex" style="display: flex; align-items: center; gap: 1.75rem;">
      <a href="<?php echo $base_url; ?>/" style="color: #e2e8f0; font-weight: 500; font-size: 0.875rem; text-decoration: none;"><?php echo $dict['header']['home']; ?></a>
      <a href="<?php echo $base_url; ?>/#services" style="color: #e2e8f0; font-weight: 500; font-size: 0.875rem; text-decoration: none;"><?php echo $dict['header']['services']; ?></a>
      <a href="<?php echo $base_url; ?>/#why-us" style="color: #e2e8f0; font-weight: 500; font-size: 0.875rem; text-decoration: none;"><?php echo $dict['whyUs']['title']; ?></a>
      <a href="<?php echo $base_url; ?>/#about" style="color: #e2e8f0; font-weight: 500; font-size: 0.875rem; text-decoration: none;"><?php echo $dict['header']['about']; ?></a>
      <a href="<?php echo $base_url; ?>/#contact" style="color: #e2e8f0; font-weight: 500; font-size: 0.875rem; text-decoration: none;"><?php echo $dict['header']['contact']; ?></a>
    </nav>

    <!-- Desktop Actions -->
    <div style="display: flex; align-items: center; gap: 0.75rem;">
      <a href="<?php echo $toggle_lang_url; ?>" style="padding: 0.375rem 0.75rem; border-radius: 0.5rem; border: 1px solid #334155; font-size: 0.75rem; font-weight: 700; color: #cbd5e1; text-decoration: none; display: flex; align-items: center; gap: 0.375rem;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#e6c675" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
        <span><?php echo $is_en ? 'DE' : 'EN'; ?></span>
      </a>

      <a href="tel:+4915201487887" style="padding: 0.625rem; border-radius: 0.75rem; background: #0f213d; border: 1px solid #162c52; color: #e6c675; display: flex; align-items: center; text-decoration: none;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
      </a>

      <a href="<?php echo $base_url; ?>/buchung.php" class="gold-gradient-bg" style="color: #070d18; font-family: 'Montserrat', sans-serif; font-weight: 700; font-size: 0.875rem; padding: 0.625rem 1.25rem; border-radius: 0.75rem; text-decoration: none; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
        <?php echo $dict['header']['bookNow']; ?>
      </a>

      <!-- PURE CSS CHECKBOX BURGER TOGGLE BUTTON — 100% Mobile & Tablet Compatible -->
      <input type="checkbox" id="menu-toggle" class="hidden" style="display: none;">
      <label for="menu-toggle" style="width: 2.5rem; height: 2.5rem; display: flex; align-items: center; justify-content: center; border-radius: 0.75rem; background: #0f213d; border: 1px solid #162c52; color: white; cursor: pointer; user-select: none; touch-action: manipulation;">
        <span style="display: flex; flex-direction: column; justify-content: center; align-items: center; width: 1.25rem; height: 1.25rem; gap: 4px;">
          <span class="hamburger-line-1" style="display: block; width: 1.25rem; height: 2px; background: currentColor; border-radius: 2px; transition: transform 0.2s;"></span>
          <span class="hamburger-line-2" style="display: block; width: 1.25rem; height: 2px; background: currentColor; border-radius: 2px; transition: opacity 0.2s;"></span>
          <span class="hamburger-line-3" style="display: block; width: 1.25rem; height: 2px; background: currentColor; border-radius: 2px; transition: transform 0.2s;"></span>
        </span>
      </label>
    </div>
  </div>

  <!-- PURE CSS MOBILE MENU DRAWER (Opens automatically when checkbox is checked) -->
  <div id="mobile-menu-drawer" style="display: none; background: #070d18; border-top: 1px solid #0f213d; padding: 1rem; margin-top: 0.75rem;">
    <div style="display: flex; flex-direction: column; gap: 0.5rem;">
      <a href="<?php echo $base_url; ?>/" style="padding: 0.75rem 1rem; border-radius: 0.75rem; color: #e2e8f0; font-weight: 600; text-decoration: none; background: #0a1628;"><?php echo $dict['header']['home']; ?></a>
      <a href="<?php echo $base_url; ?>/#services" style="padding: 0.75rem 1rem; border-radius: 0.75rem; color: #e2e8f0; font-weight: 600; text-decoration: none;"><?php echo $dict['header']['services']; ?></a>
      <a href="<?php echo $base_url; ?>/#why-us" style="padding: 0.75rem 1rem; border-radius: 0.75rem; color: #e2e8f0; font-weight: 600; text-decoration: none;"><?php echo $dict['whyUs']['title']; ?></a>
      <a href="<?php echo $base_url; ?>/#about" style="padding: 0.75rem 1rem; border-radius: 0.75rem; color: #e2e8f0; font-weight: 600; text-decoration: none;"><?php echo $dict['header']['about']; ?></a>
      <a href="<?php echo $base_url; ?>/#contact" style="padding: 0.75rem 1rem; border-radius: 0.75rem; color: #e2e8f0; font-weight: 600; text-decoration: none;"><?php echo $dict['header']['contact']; ?></a>
      
      <div style="border-top: 1px solid #0f213d; padding-top: 0.75rem; margin-top: 0.5rem;">
        <span style="font-size: 0.75rem; font-weight: 700; color: #e6c675; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 0.5rem; padding-left: 0.5rem;"><?php echo $dict['header']['airports']; ?></span>
        <a href="<?php echo $base_url; ?>/flughafentransfer-augsburg-muenchen-flughafen.php" style="display: block; padding: 0.5rem 1rem; color: #cbd5e1; text-decoration: none; font-size: 0.875rem;"><?php echo $dict['airports']['munich']; ?></a>
        <a href="<?php echo $base_url; ?>/flughafentransfer-augsburg-memmingen-flughafen.php" style="display: block; padding: 0.5rem 1rem; color: #cbd5e1; text-decoration: none; font-size: 0.875rem;"><?php echo $dict['airports']['memmingen']; ?></a>
        <a href="<?php echo $base_url; ?>/flughafentransfer-augsburg-nuernberg-flughafen.php" style="display: block; padding: 0.5rem 1rem; color: #cbd5e1; text-decoration: none; font-size: 0.875rem;"><?php echo $dict['airports']['nuremberg']; ?></a>
        <a href="<?php echo $base_url; ?>/flughafentransfer-augsburg-stuttgart-flughafen.php" style="display: block; padding: 0.5rem 1rem; color: #cbd5e1; text-decoration: none; font-size: 0.875rem;"><?php echo $dict['airports']['stuttgart']; ?></a>
      </div>

      <a href="<?php echo $base_url; ?>/buchung.php" class="gold-gradient-bg" style="display: block; text-align: center; color: #070d18; font-weight: 700; padding: 0.875rem; border-radius: 0.75rem; text-decoration: none; margin-top: 0.5rem;">
        <?php echo $dict['header']['bookNow']; ?>
      </a>
    </div>
  </div>
</header>
