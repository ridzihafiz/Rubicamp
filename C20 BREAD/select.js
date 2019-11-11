const db = require('./db_config');

db.serialize(function(){

    let sql = "SELECT * FROM favorite_songs";
    db.all(sql, (err, rows) => {
        if (err) throw err;

        if(rows){
            // cetak isi rows
            rows.forEach(datar => {
                console.log(`[${datar.id}] ${datar.string} ${datar.integer} ${datar.float} ${datar.date} ${datar.boolean}`);
            });
        } else {
            console.log("tidak ada data/hasil");
        }
    });

});

db.close();