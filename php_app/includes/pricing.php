<?php
function calculate_trip_price($destinationCode, $passengersCount = 1, $tripType = 'oneWay') {
    $pCount = min(max((int)$passengersCount, 1), 4);
    $basePrice = 100;

    if ($destinationCode === 'MUC') {
        if ($pCount === 1) $basePrice = 90;
        else if ($pCount === 2) $basePrice = 100;
        else if ($pCount === 3) $basePrice = 110;
        else $basePrice = 120;
    } else if ($destinationCode === 'FMM') {
        if ($pCount === 1) $basePrice = 100;
        else if ($pCount === 2) $basePrice = 120;
        else if ($pCount === 3) $basePrice = 130;
        else $basePrice = 140;
    } else if ($destinationCode === 'NUE') {
        $basePrice = 240;
    } else if ($destinationCode === 'STR') {
        $basePrice = 200;
    } else if ($destinationCode === 'AUG') {
        $basePrice = 70;
    }

    $multiplier = ($tripType === 'roundTrip') ? 2 : 1;
    return $basePrice * $multiplier;
}

function get_destination_name($code, $lang = 'de') {
    $names = [
        'MUC' => ($lang === 'en') ? 'Munich Airport (MUC)' : 'Flughafen München (MUC)',
        'FMM' => ($lang === 'en') ? 'Memmingen Airport (FMM)' : 'Flughafen Memmingen (FMM)',
        'NUE' => ($lang === 'en') ? 'Nuremberg Airport (NUE)' : 'Flughafen Nürnberg (NUE)',
        'STR' => ($lang === 'en') ? 'Stuttgart Airport (STR)' : 'Flughafen Stuttgart (STR)',
        'AUG' => ($lang === 'en') ? 'Augsburg Airport (AUG)' : 'Flughafen Augsburg (AUG)',
    ];
    return isset($names[$code]) ? $names[$code] : $code;
}
