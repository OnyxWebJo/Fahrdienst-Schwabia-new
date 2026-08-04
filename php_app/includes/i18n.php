<?php
function get_translations($lang = 'de') {
    $de = [
        'header' => [
            'home' => 'Startseite',
            'services' => 'Leistungen',
            'airports' => 'Flughäfen',
            'about' => 'Über uns',
            'contact' => 'Kontakt',
            'bookNow' => 'Jetzt buchen',
            'callNow' => 'Anrufen',
        ],
        'airports' => [
            'munich' => 'Flughafen München (MUC)',
            'memmingen' => 'Flughafen Memmingen (FMM)',
            'nuremberg' => 'Flughafen Nürnberg (NUE)',
            'stuttgart' => 'Flughafen Stuttgart (STR)',
            'augsburg' => 'Flughafen Augsburg (AUG)',
        ],
        'hero' => [
            'badge' => 'Augsburgs Nr. 1 Flughafentransfer',
            'title' => 'Ihr Zuverlässiger Flughafentransfer ab Augsburg',
            'subtitle' => 'Pünktlich, komfortabel & garantiert zum Festpreis. Rund um die Uhr für Sie im Einsatz nach München, Memmingen, Nürnberg & Stuttgart.',
            'whatsappBtn' => 'WhatsApp Anfrage',
            'phoneBtn' => 'Jetzt Anrufen',
        ],
        'booking' => [
            'title' => 'Fahrpreis berechnen & buchen',
            'fixedPriceNotice' => 'Garantiere Festpreise – Keine versteckten Kosten',
            'oneWay' => 'Einzelfahrt',
            'roundTrip' => 'Hin- & Rückfahrt',
            'toAirport' => 'Zum Flughafen',
            'fromAirport' => 'Vom Flughafen',
            'pickupLocation' => 'Abholadresse / PLZ',
            'destination' => 'Flughafen / Ziel',
            'date' => 'Datum',
            'time' => 'Uhrzeit',
            'passengers' => 'Personen',
            'calculatePrice' => 'Preis berechnen',
            'step1' => 'Strecke & Richtung',
            'step2' => 'Datum & Uhrzeit',
            'step3' => 'Passagiere & Gepäck',
            'step4' => 'Kontaktdaten',
            'successTitle' => 'Vielen Dank für Ihre Buchungsanfrage!',
            'successDesc' => 'Wir haben Ihre Anfrage erhalten und prüfen die Verfügbarkeit. Sie erhalten in Kürze eine Bestätigung per E-Mail / WhatsApp.',
            'bookingId' => 'Buchungs-ID',
        ],
        'whyUs' => [
            'title' => 'Warum Fahrdienst Schwabia?',
            'subtitle' => 'Erstklassiger Service, modernste Fahrzeuge und garantierte Pünktlichkeit.',
        ],
        'footer' => [
            'rights' => 'Alle Rechte vorbehalten.',
            'imprint' => 'Impressum',
            'privacy' => 'Datenschutz',
            'terms' => 'AGB',
        ]
    ];

    $en = [
        'header' => [
            'home' => 'Home',
            'services' => 'Services',
            'airports' => 'Airports',
            'about' => 'About Us',
            'contact' => 'Contact',
            'bookNow' => 'Book Now',
            'callNow' => 'Call Now',
        ],
        'airports' => [
            'munich' => 'Munich Airport (MUC)',
            'memmingen' => 'Memmingen Airport (FMM)',
            'nuremberg' => 'Nuremberg Airport (NUE)',
            'stuttgart' => 'Stuttgart Airport (STR)',
            'augsburg' => 'Augsburg Airport (AUG)',
        ],
        'hero' => [
            'badge' => "Augsburg's #1 Airport Transfer",
            'title' => 'Your Reliable Airport Transfer from Augsburg',
            'subtitle' => 'Punctual, comfortable & guaranteed fixed price. Available 24/7 for transfers to Munich, Memmingen, Nuremberg & Stuttgart.',
            'whatsappBtn' => 'WhatsApp Inquiry',
            'phoneBtn' => 'Call Now',
        ],
        'booking' => [
            'title' => 'Calculate Fare & Book',
            'fixedPriceNotice' => 'Guaranteed Fixed Prices – No Hidden Fees',
            'oneWay' => 'One Way',
            'roundTrip' => 'Round Trip',
            'toAirport' => 'To Airport',
            'fromAirport' => 'From Airport',
            'pickupLocation' => 'Pickup Address / ZIP',
            'destination' => 'Airport / Destination',
            'date' => 'Date',
            'time' => 'Time',
            'passengers' => 'Passengers',
            'calculatePrice' => 'Calculate Price',
            'step1' => 'Route & Direction',
            'step2' => 'Date & Time',
            'step3' => 'Passengers & Luggage',
            'step4' => 'Contact Info',
            'successTitle' => 'Thank you for your booking request!',
            'successDesc' => 'We have received your request and are checking availability. You will receive a confirmation via Email / WhatsApp shortly.',
            'bookingId' => 'Booking ID',
        ],
        'whyUs' => [
            'title' => 'Why Choose Fahrdienst Schwabia?',
            'subtitle' => 'First-class service, modern vehicles, and guaranteed punctuality.',
        ],
        'footer' => [
            'rights' => 'All rights reserved.',
            'imprint' => 'Imprint',
            'privacy' => 'Privacy Policy',
            'terms' => 'Terms & Conditions',
        ]
    ];

    return ($lang === 'en') ? $en : $de;
}
