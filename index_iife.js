(function () {
  console.log("call from iife");
})();

var count = function () {
  var _counter = 0;

  return function () {
    return (_counter += 1);
  };
};

count();
count();
count();
console.log(_counter);
