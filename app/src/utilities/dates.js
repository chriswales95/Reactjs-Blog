module.exports = {
  format: function(input) {
    var date = new Date(input);
    var hours = date.getHours();
    var mins = date.getMinutes();
    var seconds = date.getSeconds();
    var month = date.getMonth();
    var day = date.getDate();

    if (seconds < 10) {
      seconds = "0" + date.getSeconds();
    }

    if (mins < 10) {
      mins = "0" + date.getMinutes();
    }

    if (hours < 10) {
      hours = "0" + date.getHours();
    }

    if (month < 10) {
      month = "0" + date.getMonth();
    }

    if (day < 10) {
      day = "0" + date.getDate();
    }

    return `${day}/${month}/${date.getFullYear()} ${hours}:${mins}:${seconds}`;
  }
};
