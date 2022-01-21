

// we are not adding the paranthesis () because we want our app.js to decide when to
 // run this program. If we add paranthesis () then it means it will run automatically.

// Alternative way of declaring functions;
// module is a javascript function.

exports.getDate = function () {
// module.exports or exports all same
  const today = new Date();

  const options = {
    weekday : "long",
    day: "numeric",
    month: "long"
  };

  return today.toLocaleDateString("en-us", options);

};

exports.getDay = function() {

  const today = new Date();

  const options = {
    weekday : "long",
  };

  return today.toLocaleDateString("en-us", options);

};
console.log(module.exports);
