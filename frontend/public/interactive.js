/**
 * Fahrdienst Schwabia — Instant Native Mobile & Tablet Interactions
 * Zero-dependency Vanilla JS that runs immediately on any phone/tablet/browser
 */
(function() {
  function initInteractions() {
    // ----------------------------------------------------
    // 1. MOBILE BURGER MENU TOGGLE
    // ----------------------------------------------------
    var burgerBtn = document.querySelector('button[aria-label="Open menu"]') || 
                     document.querySelector('button[aria-label="Close menu"]') ||
                     document.querySelector('header button');

    var header = document.querySelector('header');

    if (burgerBtn && header) {
      // Find or create mobile drawer container
      var mobileDrawer = document.getElementById('mobile-drawer-container');
      if (!mobileDrawer) {
        mobileDrawer = document.createElement('div');
        mobileDrawer.id = 'mobile-drawer-container';
        mobileDrawer.className = 'lg:hidden bg-navy-950 border-t border-navy-800 px-4 pt-4 pb-24 space-y-1';
        mobileDrawer.style.display = 'none';
        mobileDrawer.style.zIndex = '49';
        mobileDrawer.innerHTML = `
          <a href="/" class="block px-4 py-3 rounded-xl text-base font-semibold text-slate-200 hover:bg-navy-800 hover:text-gold-400">Startseite</a>
          <a href="/#services" class="block px-4 py-3 rounded-xl text-base font-semibold text-slate-200 hover:bg-navy-800 hover:text-gold-400">Leistungen</a>
          <a href="/#why-us" class="block px-4 py-3 rounded-xl text-base font-semibold text-slate-200 hover:bg-navy-800 hover:text-gold-400">Warum Fahrdienst</a>
          <a href="/#about" class="block px-4 py-3 rounded-xl text-base font-semibold text-slate-200 hover:bg-navy-800 hover:text-gold-400">Über uns</a>
          <a href="/#contact" class="block px-4 py-3 rounded-xl text-base font-semibold text-slate-200 hover:bg-navy-800 hover:text-gold-400">Kontakt</a>
          <div class="pt-3 border-t border-navy-800">
            <span class="block px-4 py-2 text-xs font-bold uppercase text-gold-400 tracking-wider">Flughäfen</span>
            <a href="/flughafentransfer-augsburg-muenchen-flughafen/" class="block px-4 py-2.5 text-sm text-slate-300 hover:text-gold-400">Flughafen München (MUC)</a>
            <a href="/flughafentransfer-augsburg-memmingen-flughafen/" class="block px-4 py-2.5 text-sm text-slate-300 hover:text-gold-400">Flughafen Memmingen (FMM)</a>
            <a href="/flughafentransfer-augsburg-nuernberg-flughafen/" class="block px-4 py-2.5 text-sm text-slate-300 hover:text-gold-400">Flughafen Nürnberg (NUE)</a>
            <a href="/flughafentransfer-augsburg-stuttgart-flughafen/" class="block px-4 py-2.5 text-sm text-slate-300 hover:text-gold-400">Flughafen Stuttgart (STR)</a>
          </div>
          <div class="pt-4 border-t border-navy-800">
            <a href="/buchung/" class="block w-full text-center gold-gradient-bg text-navy-950 font-bold py-3.5 rounded-xl shadow-md text-sm">Jetzt buchen</a>
          </div>
        `;
        header.appendChild(mobileDrawer);
      }

      function toggleMenu(e) {
        if (e) e.preventDefault();
        var isExpanded = burgerBtn.getAttribute('aria-expanded') === 'true';
        burgerBtn.setAttribute('aria-expanded', !isExpanded);
        burgerBtn.setAttribute('aria-label', !isExpanded ? 'Close menu' : 'Open menu');
        mobileDrawer.style.display = !isExpanded ? 'block' : 'none';
      }

      burgerBtn.addEventListener('click', toggleMenu);
      burgerBtn.addEventListener('touchstart', toggleMenu, { passive: false });

      // Close menu when clicking drawer links
      mobileDrawer.querySelectorAll('a').forEach(function(link) {
        link.addEventListener('click', function() {
          burgerBtn.setAttribute('aria-expanded', 'false');
          mobileDrawer.style.display = 'none';
        });
      });
    }

    // ----------------------------------------------------
    // 2. HERO BOOKING WIDGET TOGGLE BUTTONS
    // ----------------------------------------------------
    var directionGroup = document.querySelector('div[aria-label="Transfer direction"]');
    var tripTypeGroup = document.querySelector('div[aria-label="Trip type"]');

    var activeClass = "px-3 py-2.5 rounded-lg text-xs font-bold text-center transition-colors cursor-pointer select-none gold-gradient-bg text-navy-950 shadow-md";
    var inactiveClass = "px-3 py-2.5 rounded-lg text-xs font-bold text-center transition-colors cursor-pointer select-none text-slate-400 hover:text-white";

    if (directionGroup) {
      var dirButtons = directionGroup.querySelectorAll('button');
      if (dirButtons.length >= 2) {
        window.selectedDirection = 'toAirport';

        function setDir(isToAirport, e) {
          if (e) e.preventDefault();
          window.selectedDirection = isToAirport ? 'toAirport' : 'fromAirport';
          dirButtons[0].className = isToAirport ? activeClass : inactiveClass;
          dirButtons[0].setAttribute('aria-pressed', isToAirport);
          dirButtons[1].className = !isToAirport ? activeClass : inactiveClass;
          dirButtons[1].setAttribute('aria-pressed', !isToAirport);
        }

        dirButtons[0].addEventListener('click', function(e) { setDir(true, e); });
        dirButtons[0].addEventListener('touchstart', function(e) { setDir(true, e); }, { passive: false });

        dirButtons[1].addEventListener('click', function(e) { setDir(false, e); });
        dirButtons[1].addEventListener('touchstart', function(e) { setDir(false, e); }, { passive: false });
      }
    }

    if (tripTypeGroup) {
      var typeButtons = tripTypeGroup.querySelectorAll('button');
      if (typeButtons.length >= 2) {
        window.selectedTripType = 'oneWay';

        function setType(isOneWay, e) {
          if (e) e.preventDefault();
          window.selectedTripType = isOneWay ? 'oneWay' : 'roundTrip';
          typeButtons[0].className = isOneWay ? activeClass : inactiveClass;
          typeButtons[0].setAttribute('aria-pressed', isOneWay);
          typeButtons[1].className = !isOneWay ? activeClass : inactiveClass;
          typeButtons[1].setAttribute('aria-pressed', !isOneWay);
        }

        typeButtons[0].addEventListener('click', function(e) { setType(true, e); });
        typeButtons[0].addEventListener('touchstart', function(e) { setType(true, e); }, { passive: false });

        typeButtons[1].addEventListener('click', function(e) { setType(false, e); });
        typeButtons[1].addEventListener('touchstart', function(e) { setType(false, e); }, { passive: false });
      }
    }

    // ----------------------------------------------------
    // 3. BOOKING WIDGET FORM SUBMISSION
    // ----------------------------------------------------
    var bookingForm = document.querySelector('#booking form');
    if (bookingForm) {
      bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        var pickupInput = bookingForm.querySelector('input[type="text"]');
        var destSelect = bookingForm.querySelector('select');
        var dateInput = bookingForm.querySelector('input[type="date"]');
        var timeInput = bookingForm.querySelector('input[type="time"]');
        var paxSelect = bookingForm.querySelectorAll('select')[1] || bookingForm.querySelector('select');

        var pickupVal = pickupInput ? pickupInput.value : 'Augsburg';
        var destVal = destSelect ? destSelect.value : 'MUC';
        var dateVal = (dateInput && dateInput.value) ? dateInput.value : new Date().toISOString().split('T')[0];
        var timeVal = timeInput ? timeInput.value : '08:00';
        var paxVal = paxSelect ? paxSelect.value : '1';

        var dir = window.selectedDirection || 'toAirport';
        var type = window.selectedTripType || 'oneWay';

        var isEn = window.location.pathname.indexOf('/en') === 0;
        var basePath = isEn ? '/en' : '';

        var targetUrl = basePath + '/buchung/?tripType=' + encodeURIComponent(type) +
                        '&direction=' + encodeURIComponent(dir) +
                        '&pickup=' + encodeURIComponent(pickupVal) +
                        '&destination=' + encodeURIComponent(destVal) +
                        '&date=' + encodeURIComponent(dateVal) +
                        '&time=' + encodeURIComponent(timeVal) +
                        '&passengers=' + encodeURIComponent(paxVal);

        window.location.href = targetUrl;
      });
    }

    // ----------------------------------------------------
    // 4. MULTI-STEP BOOKING FORM ON /buchung
    // ----------------------------------------------------
    var buchungForms = document.querySelectorAll('.max-w-4xl form');
    if (buchungForms.length > 0) {
      buchungForms.forEach(function(f) {
        f.addEventListener('submit', function(e) {
          // If it's step navigation, scroll cleanly to top
          setTimeout(function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }, 50);
        });
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initInteractions);
  } else {
    initInteractions();
  }
})();
