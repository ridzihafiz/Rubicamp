const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use('/', express.static(path.join(__dirname, 'public')))

app.get('/add', (req, res) => res.render('add'))

// app.get('/edit/:id', (req, res) => res.render('edit', {data: db}))


const sqlite3 = require('sqlite3').verbose();
const dbFile = __dirname + "/db/listc20.db";

let db = new sqlite3.Database(dbFile, sqlite3.OPEN_READWRITE, (err) => {
    if (err) throw err;
    // console.log('Connected to the SQlite database.');
});

// BACA DATA DARI DB
app.get('/', (req, res) => {
    
    db.serialize(function () {
        let sql = "SELECT * FROM daftarc20";
        db.all(sql, (err, rows) => {
            if (err) throw err;

            res.render('list', { rows })
        });
    });
});



app.post('/add', (req, res) => {
    
    db.serialize(function () {
        let sql = `INSERT INTO daftarc20 VALUES (
            "${Date.now()}", 
            "${req.body.string}", 
            "${req.body.integer}", 
            "${req.body.float}", 
            "${req.body.date}", 
            "${req.body.boolean}");`;
        db.run(sql, (err) => {
            if (err) throw err;
            console.log("1 record inserted");
        });
    });

    res.redirect('/')

});



app.get('/delete/:id', (req, res) => {
    
    db.serialize(function () {
        let sql = `DELETE FROM daftarc20 WHERE id=${req.params.id};`;
        // let daftarId = "";


        db.run(sql, (err) => {
            // console.log(req.params.id);

            if (!err) console.log("Data deleted");
        });
    });

    res.redirect('/')
});



app.get('/edit/:id', (req, res) => {

    db.serialize(() => {
        let sql = `SELECT * FROM daftarc20 WHERE id=${req.params.id};`;
        db.all(sql, (err, rows) => {
            if (err) throw err;

            res.render('edit', { rows })
        });
    });
});

app.post('/edit/:id', (req, res) => {

    db.serialize(() => {
        let sql = `UPDATE daftarc20 
                SET string  = "${req.body.string}", 
                    integer = "${req.body.integer}", 
                    float   = "${req.body.float}", 
                    date    = "${req.body.date}", 
                    boolean = "${req.body.boolean}" WHERE id=${req.params.id};`;
        db.all(sql, (err, rows) => {
            if (err) throw err;

        });
    });

    res.redirect('/')

});


module.exports = db;


app.listen(3020, () => {
    console.log('web ini berjalan di port 3020');
});