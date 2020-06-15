exports.date = function() {
  const today = new Date();
  const options = {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  };
  return today.toLocaleDateString("en-US", options);
}

exports.day = function() {
  const today = new Date();
  const options = {
    weekday: 'long',
  };
  return today.toLocaleDateString("en-US", options);
}

exports.capitalfirstlatter = function(string) { //for capitalize first latter
  return string.charAt(0).toUpperCase() + string.slice(1);
}
