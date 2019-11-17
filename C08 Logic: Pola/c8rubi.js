function pola(pattern) {
    const split1 = pattern.split('*');
    console.log(split1);

    const angka1 = split1[0].trim();
    console.log('angka1: ', angka1);
    
    const split2 = split1[1].split('=');
    console.log(split2);
    
    const angka2 = split2[0].trim();
    console.log('angka2: ', angka2);
    
    const angka3 = split2[1].trim();
    console.log('angka3:', angka3);
    
    for (let i = 0; i < 10; i++) { // diawal looping dari 0 lalu turun ke bawah ke variabel j
        for (let j = 0; j < 10; j++) { // akan selalu looping dari 0 hingga 9 lalu naik ke variabel i lagi
            console.log(i, j);
            
            if(angka1.replace('#', i) * angka2 == angka3.replace('#', j)) {
                return [i, j]
            }
        }
    }
}

console.log(pola('42#3 * 188 = 80#204'));
