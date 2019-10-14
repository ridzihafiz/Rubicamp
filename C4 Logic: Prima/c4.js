function isPrime(param1) {
    var nilaiAwal = 0;
    var number = 1; //setup awal 1 begitu masuk while akan number++

    while (nilaiAwal < param1) {
        var isPrime = true;
        number++;
        for (var i = 2; i <= Math.sqrt(number); i++) { // pengecekan bil prima
            if (number % i == 0) {
                isPrime = false;
                break;
            }
        }
        // return param1 > 1
        if (isPrime) {
            nilaiAwal++;
        }
    }
    return number;
}

console.log(isPrime(4))
console.log(isPrime(500))
console.log(isPrime(37786))