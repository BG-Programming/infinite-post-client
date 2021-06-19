const MIN = 60*1000;
const HOUR = MIN*60;
const DAY = HOUR*24;
const WEEK = DAY*7;
const MONTH = WEEK*4;
const YEAR = DAY*365;

export function getDisplayDate ( utc : number) {
    const javascriptUtc = utc * 1000;
    const now = Date.now();
    const diff = now - javascriptUtc;
    if( diff < MIN )
        return "now";
    else if (diff < HOUR)
        return Math.floor(diff/MIN).toString() + "m";
    else if (diff < DAY)
        return Math.floor(diff/HOUR).toString() + "h";
    else if (diff < WEEK)
        return Math.floor(diff/DAY).toString() + "d";
    else if (diff < MONTH)
        return Math.floor(diff/WEEK).toString() + "w";
    else if (diff < YEAR)
        return Math.floor(diff/MONTH).toString() + "M";
    else 
        return Math.floor(diff/YEAR).toString() + "y";
};


