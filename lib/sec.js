function pad(num) {
    return ("0" + num).slice(-2);
}
module.exports = function (secs) {
    var minute = Math.floor(secs / 60);
    var hour = Math.floor(minute / 60);
    minute = minute % 60; // 26
    var saniye = secs - minute * 60 - hour * 3600;
    var snn = Math.round(saniye * 1000) / 1000;
    
    if (snn === 0) {
        snn = "00,000";
    } else {
        snn = snn < 10 ? "0" + snn : snn.toString();
        snn = snn.replace(".", ",");
    }

    return pad(hour) + ":" + pad(minute) + ":" + snn;
};