```js

var fn = function(arg1, arg2) {
    var str = '<p>aap ' + this.noot + ' ' + arg1 + ' ' + arg2 + '</p>';
    document.body.innerHTML += str;
};
var context = {
    'noot': 'noot'
};
var args = ['mies', 'wim'];

// Calls a function with a given 'this' value and arguments provided individually.
// Support: everywhere
fn.call(context, args[0], args[1]);

// Calls a function with a given 'this' value and arguments provided as an array
//  (or an array like object).
// Support: everywhere
fn.apply(context, args);

// Creates a new function that, when called, has its 'this' keyword set to the
//  provided value, with a given sequence of arguments preceding any provided
//  when the new function was called.
// Support: ECMAScript >= 5 (thus >= IE9)
var boundFn1 = fn.bind(context, args[0], args[1]);
boundFn1();

// Same as bind()
// Support: same as your jQuery version, available since 1.4
var boundFn2 = $.proxy(fn, context, args[0], args[1]);
boundFn2();

```