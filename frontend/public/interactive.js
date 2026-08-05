/**
 * Fahrdienst Schwabia — Instant Native Mobile & Tablet Interactions
 * Zero-dependency Vanilla JS that runs immediately on any phone/tablet/browser
 */
(function() {
  function initInteractions() {
    // ----------------------------------------------------
    // HERO BOOKING WIDGET TOGGLE BUTTONS
    // ----------------------------------------------------
    var typeBtns = document.querySelectorAll('#booking button, [data-booking-widget] button');
    typeBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        var text = btn.textContent.trim();
        if (text.indexOf('Einzelfahrt') !== -1 || text.indexOf('One-way') !== -1) {
          window.selectedTripType = 'oneWay';
        } else if (text.indexOf('Hin- & Rückfahrt') !== -1 || text.indexOf('Round trip') !== -1) {
          window.selectedTripType = 'roundTrip';
        } else if (text.indexOf('Zum Flughafen') !== -1 || text.indexOf('To Airport') !== -1) {
          window.selectedDirection = 'toAirport';
        } else if (text.indexOf('Vom Flughafen') !== -1 || text.indexOf('From Airport') !== -1) {
          window.selectedDirection = 'fromAirport';
        }
      });
    });

    // ----------------------------------------------------
    // BOOKING WIDGET FORM SUBMISSION
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
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initInteractions);
  } else {
    initInteractions();
  }
})();
