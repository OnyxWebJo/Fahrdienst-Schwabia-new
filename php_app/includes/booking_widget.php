<?php
if (!isset($lang)) $lang = 'de';
$dict = get_translations($lang);
$is_en = ($lang === 'en');
$base_url = $is_en ? '/en' : '';
$today_date = date('Y-m-d');
?>
<div id="booking" style="width: 100%; background: rgba(7, 13, 24, 0.95); border: 1px solid rgba(212, 168, 83, 0.3); border-radius: 1.5rem; padding: 1.5rem; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); position: relative; z-index: 20;">
  
  <form action="<?php echo $base_url; ?>/buchung.php" method="GET">
    <!-- Widget Top Header + Selectors -->
    <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem; border-bottom: 1px solid #0f213d; padding-bottom: 1rem; margin-bottom: 1.25rem;">
      
      <div style="display: flex; align-items: center; gap: 0.75rem;">
        <div class="gold-gradient-bg" style="width: 2rem; height: 2rem; border-radius: 0.5rem; display: flex; align-items: center; justify-content: center; color: #070d18; font-weight: 700;">
          ✈
        </div>
        <div>
          <h3 style="font-family: 'Montserrat', sans-serif; font-weight: 700; color: #ffffff; font-size: 1rem; margin: 0; line-height: 1.2;">
            <?php echo $dict['booking']['title']; ?>
          </h3>
          <p style="font-size: 0.75rem; color: #94a3b8; margin: 0; line-height: 1.3;">
            <?php echo $dict['booking']['fixedPriceNotice']; ?>
          </p>
        </div>
      </div>

      <!-- Pure CSS Radio Button Pill Selectors -->
      <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; width: 100%; max-width: 32rem;">
        
        <!-- Direction Selector -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; background: #0a1628; padding: 0.25rem; border-radius: 0.75rem; border: 1px solid #0f213d; flex: 1; min-width: 13rem;">
          <input type="radio" id="dir_to" name="direction" value="toAirport" class="radio-pill-check hidden" checked style="display: none;">
          <label for="dir_to" style="padding: 0.5rem 0.75rem; border-radius: 0.5rem; font-size: 0.75rem; font-weight: 700; text-align: center; color: #94a3b8; cursor: pointer; user-select: none; transition: all 0.2s;">
            <?php echo $is_en ? 'To Airport' : 'Zum Flughafen'; ?>
          </label>

          <input type="radio" id="dir_from" name="direction" value="fromAirport" class="radio-pill-check hidden" style="display: none;">
          <label for="dir_from" style="padding: 0.5rem 0.75rem; border-radius: 0.5rem; font-size: 0.75rem; font-weight: 700; text-align: center; color: #94a3b8; cursor: pointer; user-select: none; transition: all 0.2s;">
            <?php echo $is_en ? 'From Airport' : 'Vom Flughafen'; ?>
          </label>
        </div>

        <!-- Trip Type Selector -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; background: #0a1628; padding: 0.25rem; border-radius: 0.75rem; border: 1px solid #0f213d; flex: 1; min-width: 13rem;">
          <input type="radio" id="type_one" name="tripType" value="oneWay" class="radio-pill-check hidden" checked style="display: none;">
          <label for="type_one" style="padding: 0.5rem 0.75rem; border-radius: 0.5rem; font-size: 0.75rem; font-weight: 700; text-align: center; color: #94a3b8; cursor: pointer; user-select: none; transition: all 0.2s;">
            <?php echo $dict['booking']['oneWay']; ?>
          </label>

          <input type="radio" id="type_round" name="tripType" value="roundTrip" class="radio-pill-check hidden" style="display: none;">
          <label for="type_round" style="padding: 0.5rem 0.75rem; border-radius: 0.5rem; font-size: 0.75rem; font-weight: 700; text-align: center; color: #94a3b8; cursor: pointer; user-select: none; transition: all 0.2s;">
            <?php echo $dict['booking']['roundTrip']; ?>
          </label>
        </div>

      </div>
    </div>

    <!-- Inputs Form Grid -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1.25rem;">
      
      <!-- Pickup Location -->
      <div>
        <label style="font-size: 0.6875rem; font-weight: 700; color: #cbd5e1; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 0.375rem;">
          <?php echo $dict['booking']['pickupLocation']; ?>
        </label>
        <input type="text" name="pickup" value="Augsburg" placeholder="PLZ / Adresse in Augsburg" required style="width: 100%; background: #0a1628; border: 1px solid #162c52; color: #ffffff; border-radius: 0.75rem; padding: 0.625rem 0.875rem; font-size: 0.75rem; font-weight: 500; outline: none; box-sizing: border-box;">
      </div>

      <!-- Destination Airport -->
      <div>
        <label style="font-size: 0.6875rem; font-weight: 700; color: #cbd5e1; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 0.375rem;">
          <?php echo $dict['booking']['destination']; ?>
        </label>
        <select name="destination" style="width: 100%; background: #0a1628; border: 1px solid #162c52; color: #ffffff; border-radius: 0.75rem; padding: 0.625rem 0.875rem; font-size: 0.75rem; font-weight: 500; outline: none; box-sizing: border-box;">
          <option value="MUC"><?php echo $dict['airports']['munich']; ?></option>
          <option value="FMM"><?php echo $dict['airports']['memmingen']; ?></option>
          <option value="NUE"><?php echo $dict['airports']['nuremberg']; ?></option>
          <option value="STR"><?php echo $dict['airports']['stuttgart']; ?></option>
          <option value="AUG"><?php echo $dict['airports']['augsburg']; ?></option>
        </select>
      </div>

      <!-- Date & Time -->
      <div>
        <label style="font-size: 0.6875rem; font-weight: 700; color: #cbd5e1; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 0.375rem;">
          <?php echo $dict['booking']['date']; ?> &amp; <?php echo $dict['booking']['time']; ?>
        </label>
        <div style="display: flex; gap: 0.5rem;">
          <input type="date" name="date" value="<?php echo $today_date; ?>" required style="width: 60%; background: #0a1628; border: 1px solid #162c52; color: #ffffff; border-radius: 0.75rem; padding: 0.625rem 0.5rem; font-size: 0.75rem; color-scheme: dark; outline: none; box-sizing: border-box;">
          <input type="time" name="time" value="08:00" required style="width: 40%; background: #0a1628; border: 1px solid #162c52; color: #ffffff; border-radius: 0.75rem; padding: 0.625rem 0.5rem; font-size: 0.75rem; color-scheme: dark; outline: none; box-sizing: border-box;">
        </div>
      </div>

      <!-- Passengers -->
      <div>
        <label style="font-size: 0.6875rem; font-weight: 700; color: #cbd5e1; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 0.375rem;">
          <?php echo $dict['booking']['passengers']; ?>
        </label>
        <select name="passengers" style="width: 100%; background: #0a1628; border: 1px solid #162c52; color: #ffffff; border-radius: 0.75rem; padding: 0.625rem 0.875rem; font-size: 0.75rem; font-weight: 500; outline: none; box-sizing: border-box;">
          <option value="1">1 Person</option>
          <option value="2">2 Personen</option>
          <option value="3">3 Personen</option>
          <option value="4">4 Personen</option>
          <option value="5">5 Personen (Großraum)</option>
          <option value="6">6–8 Personen (VIP Van)</option>
        </select>
      </div>

    </div>

    <!-- Submit Button & Trust Note -->
    <div style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem; border-top: 1px solid #0f213d; padding-top: 1rem;">
      <div style="font-size: 0.75rem; color: #34d399; font-weight: 600; display: flex; align-items: center; gap: 0.375rem;">
        ✓ Keine Vorabzahlung nötig • Kostenlose Stornierung
      </div>

      <button type="submit" class="gold-gradient-bg gold-gradient-bg-hover" style="width: 100%; max-width: 18rem; border: none; color: #070d18; font-family: 'Montserrat', sans-serif; font-weight: 800; font-size: 0.875rem; padding: 0.875rem 1.5rem; border-radius: 0.75rem; cursor: pointer; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; gap: 0.5rem; margin-left: auto;">
        <span><?php echo $dict['booking']['calculatePrice']; ?></span>
        →
      </button>
    </div>
  </form>

</div>
