
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('tulis kalimatmu disini > ', (str) => {
  function sentencesManipulation(str) {
    function stringManipulation(str) {
      var hurufPertama = str.charAt(0).toLowerCase();
      if (hurufPertama == 'a' || hurufPertama == 'e' || hurufPertama == 'i' || hurufPertama == 'o' || hurufPertama == 'u') {
        return (str);
      } else {
        return (str.substr(1, str.length) + str.charAt(0) + 'nyo');
      }
    }
    return str.split(" ").map(stringManipulation).join(" ");
  }

  console.log(sentencesManipulation(str));

  rl.close();
});


