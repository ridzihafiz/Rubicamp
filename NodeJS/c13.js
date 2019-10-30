// cara baca JSON 1
const fs = require('fs');

let baca = fs.readFileSync('dataKerjaan.json');
let kerjaan = JSON.parse(baca);
// console.log(kerjaan);

switch (process.argv[2]) {
    case 'add':
        kerjaan.push({task: process.argv[3]})
        let tulis1 = fs.writeFileSync('dataKerjaan.json', kerjaan);
        let tulis2 = JSON.stringify(tulis1)
        console.log(tulis2);
        
        console.log(`${tulis2} telah ditambahkan`);
        break;
}

