const test = require('tape');

/*
  Wrap impure function.
*/

let y = 5, z;
function foo(x) {
  y++;
  z = x * y;
}

const bar = x => {
  let y = 5, z;
  return foo(x);

  function foo(x) {
    y++;
    z = x * y;
  }
}

test('should equal', t => {
  t.equal(bar(20), z);
  t.equal(bar(25), z);
  t.end();
});
