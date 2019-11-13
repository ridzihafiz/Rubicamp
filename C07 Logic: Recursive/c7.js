function weirdMultiply(num) {
    var numString = num.toString();
    // console.log(numString); Testing yang muncul datanya
    
    let multiply = 1;
    if (numString.length === 1) {
      return numString;
    } else {
      for (var i = 0; i < numString.length; i++) {
        multiply = multiply * numString[i];
      }
      return weirdMultiply(multiply)
      // panggil function dengan hasil perkalian yang terakhir
      // jika menggunakan parameter num yang diatas(bukan multiply) maka nilai yg pertama lagi yang akan dipanggil
    }
  }
  console.log(weirdMultiply(39));
  console.log(weirdMultiply(999));
  console.log(weirdMultiply(3));