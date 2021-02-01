function curry(fn, args) {
  const len = fn.length;
  args = args || [];

  return function () {
    var _args = args.slice(0);
    for (var i = 0; i < arguments.length; i++) {
      _args.push(arguments[i])
    }
    if (_args.length < len) {
      return curry(fn, _args);
    } else {
      return fn(..._args);
    }
  }
}
var fn = curry(function (a, b, c) {
  console.log([a, b, c]);
});

fn("a", "b", "c") // ["a", "b", "c"]
fn("a", "b")("c") // ["a", "b", "c"]
fn("a")("b")("c") // ["a", "b", "c"]
fn("a")("b", "c") // ["a", "b", "c"]
var curry2 = fn => judge = (...args) => args.length === fn.length ? fn(...args) : arg =>7 judge(...args, arg)
