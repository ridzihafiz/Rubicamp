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


// app.get('/edit/:id', (req, res) => res.render('edit', {data: db}))


const sqlite3 = require('sqlite3').verbose();
const dbFile = __dirname + "/db/listc20.db";

let db = new sqlite3.Database(dbFile, sqlite3.OPEN_READWRITE, (err) => {
    if (err) throw err;
    // console.log('Connected to the SQlite database.');
});

/* 
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

// PAGINATION
app.get('/', (req, res) => {

    db.serialize(() => {
        let sql = `SELECT COUNT(*) FROM daftarc20`;
        // if (isFilter) {
        //     sql += ` WHERE ${params.join(' AND ')}`
        // }
        db.all(sql, (err, count) => {
            let rows = count[0].total //jumlah data dalam table
            let page = req.query.page || 1; // nilai awal page
            let limit = 3; // batas data yang di tampilkan 
            let totalPage = Math.ceil(rows / limit) // mencari jumlah data
            let pages = (page - 1) * limit
            let queries = req.url === '/' ? '/?page=1' : req.url;
            let Query = req.query;

            sql = `select * from daftar`;
            if (stat == true) {
                sql += ` where ${joindata} `
            }

            sql += ` LIMIT ${limit} OFFSET ${pages}`

            // menampilkan semua data yang ada di table data
            db.all(sql, [], (err, row) => {
                console.log(sql);

                res.render('list', { data: row, pages: totalPage, current: page, query: queries, Query: Query })
            });
        });
    })
}) */


app.get('/', (req, res) => {

    const { id, string, integer, float, date, boolean,
        cbId, cbString, cbInteger, cbFloat, sDate, eDate, cbBoolean
    } = req.query;

    // data untuk menampung filter
    let temp = []

    let stat = false

    // FILTER
    if (cbId && id) {
        temp.push(`id = ${id}`)
        stat = true
    }

    if (cbString && string) {
        temp.push(`string = '${string}'`)
        stat = true
    }

    if (cbInteger && integer) {
        temp.push(`integer = ${integer}`)
        stat = true
    }

    if (cbFloat && float) {
        temp.push(`float = ${float}`)
        stat = true
    }

    if (date && sDate && eDate ) {
        temp.push(`date BETWEEN '${sDate}' AND '${eDate}'`)
        stat = true
    }

    if (cbBoolean && boolean) {
        temp.push(`boolean = '${boolean}'`)
        stat = true
    }

    // READ DATA 
    // conversi dari array ke string
    let joindata = temp.join(' AND ');


    let sql = "SELECT COUNT(*) AS total FROM daftarc20";

    console.log(joindata);

    //Kondisi FILTER
    if (stat == true) {
        sql += ` WHERE ${joindata}`
    }
    // console.log(sql);
    
    db.all(sql, [], (err, count) => {
        let row = count[0].total
        let page = req.query.page || 1;
        let limit = 3;
        let totalPage = Math.ceil(row / limit)
        let pages = (page - 1) * limit
        let queries = req.url === '/' ? '/?page=1' : req.url;

        sql = `SELECT * FROM daftarc20`;
        if (stat == true) {
            sql += ` where ${joindata}`
        }

        sql += ` LIMIT ${limit} OFFSET ${pages} `
        // console.log(sql);

        db.all(sql, [], (err, rows) => {
            console.log(rows);
            
            res.render('list', { data: rows, pages: totalPage, current: page, query: queries })
        })
        // console.log('ini =>', row);

    })
});



app.get('/add', (req, res) => res.render('add'))

app.post('/add', (req, res) => {
    // id sudah dibuat autoincrement di DB
    let sql = `INSERT INTO daftarc20 (string, integer, float, date, boolean) VALUES (
            "${req.body.string}", 
            "${req.body.integer}", 
            "${req.body.float}", 
            "${req.body.date}", 
            "${req.body.boolean}");`;
    db.run(sql, (err) => {
        if (err) throw err;
        console.log("1 record inserted");
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
                SET id      = "${req.params.id}",
                    string  = "${req.body.string}", 
                    integer = "${req.body.integer}", 
                    float   = "${req.body.float}", 
                    date    = "${req.body.date}", 
                    boolean = "${req.body.boolean}" 
                WHERE id=${req.params.id};`;
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