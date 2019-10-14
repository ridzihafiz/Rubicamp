function sentencesManipulation(str) {
    function stringManipulation(str) {
        var hurufPertama = str.charAt(0).toLowerCase();
        if (hurufPertama == 'a' || hurufPertama == 'e' || hurufPertama == 'i' || hurufPertama == 'o' || hurufPertama == 'u') {
            return (str);
        } else {
            //   return false;
            return (str.substr(1, str.length) + str.charAt(0) + 'NYO');
        }
    }
    return str.split(" ").map(stringManipulation).join(" ");
}

console.log(sentencesManipulation('ibu pergi ke pasar bersama aku'));