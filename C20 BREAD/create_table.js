const db = require('./db_config');

db.serialize(function() {

    let sql = `CREATE TABLE daftarc20(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        string VARCHAR(255),
        integer INTEGER(3),
        float FLOAT(3),
        date DATE,
        boolean BOOLEANsql
    );`;
    db.run(sql, (err) => {
        if (err) throw err;
        console.log('Table created');
    });

});

db.close();