const db = require('./db_config');

db.serialize(function(){

    let sql = "INSERT INTO daftarc20 (id, string, integer, float, date, boolean) VALUES ('1', 'Garis Ridzi', '27', '1.9', '2019', 'true')";
    db.run(sql, (err) => {
        if(err) throw err;
        console.log("1 record inserted");
    });

});

db.close();