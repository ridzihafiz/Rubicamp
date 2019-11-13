function spiral(size) {
    // let size = 5;
    let matriks = [];
    let count = 0;

    for (var i = 0; i < size; i++) {
        matriks[i] = []
        for (var j = 0; j < size; j++) {
            matriks[i][j] = count;
            count++;
        }
    }
    console.log(matriks);
    // console.log(matriks[3][3]);

    let x = 0, y = 0;
    let topLimit = size;
    let bottomLimit = 0;
    let result = [];

    while (result.length < size * size) {
        // ke kanan
        for (; x < topLimit; x++) {
            // console.log(matriks[y][x]);
            result.push(matriks[y][x]);
        }
        x--
        y++

        // ke bawah
        for (; y < topLimit; y++) {
            result.push(matriks[y][x]);
        }
        y--
        x--

        // ke kiri
        for (; x >= bottomLimit; x--) {
            result.push(matriks[y][x]);
        }
        x++
        y--

        // ke atas
        for (; y > bottomLimit; y--) {
            result.push(matriks[y][x]);
        }
        x++;
        y++;
        topLimit--;
        bottomLimit++;
    }

    console.log(result);

}

spiral(5);
// spiral(6);
// spiral(7);
// spiral(8);