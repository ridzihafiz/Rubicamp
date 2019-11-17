function stringManipulation(word) {
    if (word[0].toLowerCase() == 'a' ||
        word[0].toLowerCase() == 'i' ||
        word[0].toLowerCase() == 'u' ||
        word[0].toLowerCase() == 'e' ||
        word[0].toLowerCase() == 'o') {
        return word;
    } else {
        return word.slice(1) + word[0] + 'nyo'
    }
}


function sentencesManipulation(sentence) {
    let data = sentence.split(' ');
    let result = [];
    for (var i = 0; i < data.length; i++) {
        result.push(stringManipulation(data[i]))
    }
    console.log(result.join(' '));
}

sentencesManipulation('ibu pergi ke pasar bersama aku')