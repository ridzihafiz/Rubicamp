function stringManipulation(str) {
    var hurufPertama = str.charAt(0).toLowerCase();
    if (hurufPertama=='a' || hurufPertama=='e'|| hurufPertama=='i' || hurufPertama=='o' || hurufPertama=='u') {
      console.log(str);
    } else {
      //   return false;
      console.log(str.substr(1, str.length) + str.charAt(0) + 'NYO');
       
    }
  }
  stringManipulation('ayam');
  stringManipulation('BEBEK');