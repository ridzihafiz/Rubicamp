const fs = require('fs');
const readline = require('readline');
const fileBaca = fs.readFileSync('dataPertanyaan.json', 'utf8')

const tanyaJawab = JSON.parse(fileBaca)

console.log('Welcome to my icha-icha paradise\n');

var i = 0;
console.log(tanyaJawab[i].definition); 
// log di atas langsung memberikan pertanyaan
// jika di comment ga akan tau pertanyaan pertama pada array ke 0 apa

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'Tebakan: '
});

rl.prompt()
rl.on('line', answer => {
  if (answer == tanyaJawab[i].term) {
    console.log('Good Job, next question');
    i++; // jika benar akan  +1 (array yg ke 1 pada line 30)
    if (i == tanyaJawab.length) {
      console.log('Congratulations, ente menang gan\n');
      rl.close();
    }
    console.log(tanyaJawab[i].definition);
  } else {
    console.log('Coba lagi gan, masih salah jawaban ente\n');
  }
  rl.prompt();
}).on('close', () => {
  console.log('Makasih banyak gan');
  process.exit(0);
});