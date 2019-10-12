/*
function sum(a, b, c, d, e) {
    var sum1;
    var sum2;
    var sum3;
    var sum4;

    sum1 = a + b + c;
    sum2 = a + b;
    sum3 = a;
    sum4 = a + b + c + d + e;

    // total1 = sum1
    // total2 = sum2
    // total3 = sum3
    // total4 = sum4
    

    return sum3;
    // return total2;
    // return total3;
    // return total4;

}

console.log(sum(1, 2, 7));
console.log(sum(1, 4));
console.log(sum(11));
console.log(sum(10, 3, 6, 7, 9));
*/


function sum() {
    var total = 0;
    for (var i = 0; i < arguments.length; i++) {
        total = total + arguments[i];
    }
    return total;
}

console.log(sum(1, 2, 7));
console.log(sum(1, 4));
console.log(sum(11));
console.log(sum(10, 3, 6, 7, 9));