const test = require('tape');

/*
1. Define `foo(..)` so that it produces a function which remembers only the
first two arguments that were passed to `foo(..)`, and always adds them
together.
*/

const foo = (...args) => () => args[0] + args[1];

const bar = foo(1, 2, 3);

console.log(bar());
