const test = require('tape');

/*
1. Turn `mult(..)` into a recursive function that can work on as many arguments
as necessary.
*/

//Lesson example
function sumRecur(...args) {
    if(args.length  <= 2) {
        return args[0] + args[1];
    }
    return args[0] + sumRecur(...args.slice(1));
}
sumRecur(1, 2, 3, 4);

// non-recursive sample
function mult(x,y,z) {
	return x * y * z;
}

