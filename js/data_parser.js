function dataParser(rawDateObj) {
    // Date format: 2020-09-12 00:00:00 [TIMEZONE OFFSET]
    // Convert to hours difference

    const today = new Date();

    // <!-- ? HTML 'date' input type returns a date string always with 0 Timezone Offset, -->
    // <!-- ? and JavaScript gets current Date at local timezone. So, it'll be necessary a shift in hour value. -->
    // <!-- ? e.g for GMT-3: if September 14th is selected in HTML form, JS will read it as September 13th 21:00 -->
    // <!-- ? even though user is not at GMT+0. So, adding 3 to HTML date (September 14th 3:00 AM) should fix this. -->
    // <!-- ? inputs with datetime-local type returns a string already offseted. -->
    // <!-- ? However, if 'datetime-local' input type is used, then the shift won't be necessary. -->

    rawDateObj.setHours(rawDateObj.getHours() + 0); // To set to GMT-3 timezone with date input type: add 3.
    
    // Math.abs works with date subtraction by returning difference in milliseconds.
    // 1 hour is equal to 3.6 million milliseconds
    // Then, it is necessary to convert the float value to an integer

    var remainingH = parseInt(Math.abs(rawDateObj - new Date())/3600000)

    let result;

    // Due to the fact it's a float, add 1 minute to correction.
    var remainingMins = parseInt(Math.abs(rawDateObj - new Date())/60000) + 1;

    if (remainingH >= 24) {
        // Works like this:
        // 27 hours remaning -> remaining days = 24.125 -> parseInt(remainingD/24) -> 1
        // remaning hours = 27 % 24 -> 3

        remainingDays = parseInt(remainingH/24);
        remainingH %= 24;

        if(remainingDays > 1) {
            remainingH == 1
            ?
                result = remainingDays + " dias e " + remainingH + " hora restando"
            :
                result = remainingDays + " dias e " + remainingH + " horas restando";
        } else if(remainingDays == 1) {
            remainingH == 1
            ?
                result = remainingDays + " dia e " + remainingH + " hora restando"
            :
                result = remainingDays + " dia e " + remainingH + " horas restando";
        }

     
    } else {
        
        // There's a problem with hour evaluation. If there are 1 hour and 60 minutes remaining,
        // it will see as 1 hour remaining, but this is not correct.

        // If there's 2 hours remaining, then there will be 120 minutes remaining.
        // In order to not get a 3 hour difference between, for example, 13:00 and 15:00,
        // subtract (60*remainingH) minutes if minutes are greater than 59.

        // so, if minutes are still greater than 59, get the modulus of them divided by 60 and
        // add 1 to remaining hours.

        // <!-- ? is this if necessary? or should this be remainingMins -= 60*remainingH only? -->

        if (remainingMins > 59) remainingMins -= 60*remainingH;

        if (remainingMins > 59) {
            remainingH = remainingH + 1;
            remainingMins = remainingMins % 60;
        }

        if(remainingH == 1 && remainingMins != 0) {
            result = remainingH + " hora e " + remainingMins + " minutos restando";
        } else if(remainingH == 1 && remainingMins == 0) {
            result = "1 hora restando";
        } else if(remainingH == 0 && remainingMins != 0) {
            result = remainingMins + " minutos restando";
        } else {
            result = remainingH + " horas restando";
        }

    }
   
    return result;
}