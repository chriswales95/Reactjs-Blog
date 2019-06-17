module.exports = {
  format: function(date) {
    var fullDate = new Date(date);
    return (
      fullDate.getFullYear() +
      "/" +
      fullDate.getMonth() +
      "/" +
      fullDate.getDate() +
      " " +
      fullDate.getHours() +
      ":" +
      fullDate.getMinutes()
    );
  }
};
