/* function deretKaskus(n) {
    var data = [];
    for(var i = 3; i <= 30; i+=3) {
        if (i % 5 === 0) {
            console.log('KAS')
        } else if (i % 6 === 0) {
            console.log('KUS')
        } else if (i % 5 === 0 && i % 6 === 0) {
            console.log('KASKUS')
        } else {
            console.log(i);
        }
    }
}

console.log(deretKaskus(10)); */


function deretKaskus(n) {
    var data = [];
    for (var i = 3; i <= n*3; i += 3) {
        if (i % 5 === 0 && i % 6 === 0 ) {
            data.push('KASKUS')
        } else if (i % 6 === 0) {
            data.push('KUS')
        } else if (i % 5 === 0) {
            data.push('KAS')
        } else {
            data.push(i);
        }
    }
    // console.log(data)
    // console.log(deretKaskus(10));
    return data
}
console.log(deretKaskus(10));
// deretKaskus(10);