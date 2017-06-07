const test = require('tape');

/*
# Instructions
#
# 1. Write two functions, each which return a different number value when
# called.
*/

function num1() {
    return 10;
}

function num2() {
    return 7;
}

/*
#
# 2. Write an `add(..)` function that takes two numbers and adds them and
# returns the result. Call `add(..)` with the results of your two functions from
# (1) and print the result to the console.
*/

function add(a, b) {
    return a + b;
}

/*
#
# 3. Write an `add2(..)` that takes two functions instead of two numbers, and it
# calls those two functions and then sends those values to `add(..)`, just like
# you did in (2) above.
*/

// Don't repeat yourself
function add2(fn1, fn2) {
    return add(fn1(), fn2());
}

test('should sum return value of num1 and num2', t => {
    t.equal(add2(num1, num2), 17);
    t.end();
});

/*
#
# 4. Replace your two functions from (1) with a single function that takes a
# value and returns a function back, where the returned function will return the
# value when it's called.
*/

function num(number) {
    return () => number;
}

test('num should return a fn closing over number', t => {
    const two = num(2);
    t.equal(two(), 2);
    t.notEqual(num(3)(), 2);
    t.end();
});

/*
#
# 5. Write an `addn(..)` that can take an array of 2 or more functions, and
# using only `add2(..)`, adds them together. Try it with a loop. Try it without
# a loop (recursion). Try it with built-in array functional helpers
# (map/reduce).
*/

function addnFor(...args) {
    let sum = 0;
    for(let fn of args) {
        sum = add2(num(sum), fn);
    }
    return sum;
}

function addnRecursive(...args) {
    if(args.length <= 2) {
        return add2(args[0], args[1]);
    }
    return add2(args[0], num(addnRecursive(...args.slice(1))));
}

// As described by Simpson, the goal is to create a final function that
// defers the actual calculation until the end.
function addnMapReduce(...args) {
    // Can do args.slice(1).reduce(..., args[0]) to skip num(0) no-op
    return args.reduce((prev, cur) => () => add2(prev, cur), num(0))();
}

test('add array of fns returning nums', t => {

    t.test('using for of', t => {
        t.equal(addnFor(num(5), num(3), num(50)), 58);
        t.end();
    });

    t.test('using recursion', t => {
        t.equal(addnRecursive(num(5), num(3), num(50), num(7)), 65);
        t.end();
    });

    t.test('using map reduce', t => {
        t.equal(addnMapReduce(num(5), num(3), num(50), num(7)), 65);
        t.end();
    });

    t.end();
});

/*
#
# 6. Start with an array of odd and even numbers (with some duplicates), and
# trim it down to only have unique values.
*/

test('trip to uniq', t => {
    const vals = [1, 3, 5, 7, 7, 9, 2, 2, 4, 4, 6, 10];

    const isOdd = (x) => x % 2 == 1;
    const isEven = (y) => !isOdd(y);

    const arr = vals.filter(isEven).map(num);

    console.log(arr);
    t.end();
});

//addnMapReduce(....map(num));

/*
#
# 7. Filter your array to only have even numbers in it.
*/

/*
#
# 8. Map your values to functions, using (4), and pass the new list of functions
# to the `addn(..)` from (5).
*/

/*
#
# 9. Bonus: write tests for your functions.
*/


