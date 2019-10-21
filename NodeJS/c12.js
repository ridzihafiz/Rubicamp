console.log('tolong masukan json cuy');

const fs = require('fs');
const readline = require('readline');
const fileBaca = fs.readFileSync('dataPertanyaan.json', 'utf8')
// console.log(process.argv);

const tanyaJawab = JSON.parse(fileBaca)
if (process.argv[2] == 'dataPertanyaan.json') {
    var i = 0;
    var salah = 0;
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
            // i++;
            console.log(tanyaJawab[i].definition);
        } else {
            salah++;
            console.log(`Coba lagi gan, masih salah ${salah} jawaban ente\n`);
            if (answer == 'skip') {
                tanyaJawab.push(tanyaJawab[i]);
                salah = 0;
                i++;
                console.log(tanyaJawab[i].definition);
            }
        }
        rl.prompt();
    }).on('close', () => {
        console.log('Makasih banyak gan');
        process.exit(0);
    });
} else {
    console.log('masukan "dataPertanyaan.json"');
}