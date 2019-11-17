var express = require('express');
var router = express.Router();
var moment = require('moment');
moment().format();

module.exports = (pool) => {

    router.get('/', (req, res) => {
        const {
            id, string, integer, float, date, boolean,
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

        if (date && sDate && eDate) {
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


        let sql = `SELECT COUNT(*) AS total FROM "TableC21"`;
        pool.query(sql, (err, count) => {
            if (err) { throw err }

            console.log(joindata);

            //Kondisi FILTER
            if (stat == true) {
                sql += ` WHERE ${joindata}`
            }
            // console.log(sql);


            // let row = count[0].total
            let page = req.query.page || 1;
            let limit = 3;
            let totalPage = Math.ceil(count.rows[0].total / limit)
            let pages = (page - 1) * limit
            let queries = req.url === '/' ? '/?page=1' : req.url;

            sql = `SELECT * FROM "TableC21"`;
            if (stat == true) {
                sql += ` where ${joindata}`
            }

            sql += ` LIMIT ${limit} OFFSET ${pages} `
            // console.log(sql);

            pool.query(sql, (err, result) => {
                // console.log(result.rows);

                res.render('list', { data: result.rows, pages: totalPage, current: page, query: queries, moment })
            })

            // res.send({ message: 'endpoint working' });
        });
    });



    router.get('/add', (req, res) => res.render('add'));

    router.post('/add', (req, res) => {
        // id type data serial sudah autoincrement di DB

        // jika ingin data kosong bisa tersimpan
        let string = req.body.string || null
        let integer = req.body.integer || null
        let float = req.body.float || null
        let date = req.body.date || null
        let boolean = req.body.boolean || null

        // let sql = `INSERT INTO bread (stringdata, integerdata, floatdata, datedata, booleandata) VALUES ($1, $2, $3, $4, $5)`;
        // let data = [req.body.string, parseInt(req.body.integer), parseFloat(req.body.float), req.body.date, JSON.parse(req.body.boolean)]

        let sql = `INSERT INTO "TableC21" (string, integer, float, date, boolean) VALUES ($1, $2, $3, $4, $5)`;
        // let data = [req.body.string, req.body.integer, req.body.float, req.body.date, req.body.boolean]
        let data = [string, integer, float, date, boolean]

        // let sql = `INSERT INTO "TableC21" (string, integer, float, date, boolean) VALUES (
        //     ${req.body.string}, 
        //     ${req.body.integer}, 
        //     ${req.body.float}, 
        //     ${req.body.date}, 
        //     ${req.body.boolean});`;

        // let sql = `INSERT INTO "TableC21" (string=${req.body.string}, integer=${req.body.integer}, float=${req.body.float}, date=${req.body.date}, boolean=${req.body.boolean});`;


        pool.query(sql, data, (err) => {
            if (err) throw err;
            console.log("1 record inserted");
        });
        res.redirect('/')
    });



    router.get('/delete/:id', (req, res) => {

        let sql = `DELETE FROM "TableC21" WHERE id=($1)`;
        let data = [req.params.id]
        pool.query(sql, data, (err) => {
            // console.log(req.params.id);

            if (!err) console.log("Data deleted");
        });

        res.redirect('/')
    });



    router.get('/edit/:id', (req, res) => {

        let id = [req.params.id];
        // let sql = `SELECT * FROM "TableC21" WHERE id=${id};`;
        let sql = `SELECT * FROM "TableC21" WHERE id=$1`

        pool.query(sql, id, (err, result) => {
            if (err) throw err;

            res.render('edit', { data: result.rows, moment })
        });
    });

    router.post('/edit/:id', (req, res) => {
        let id = req.params.id;
        let string = req.body.string || null
        let integer = req.body.integer || null
        let float = req.body.float || null
        let date = req.body.date || null
        let boolean = req.body.boolean || null

        let sql = `UPDATE "TableC21" SET string=$1, integer=$2, float=$3, date=$4, boolean=$5 WHERE id=$6`;
        let data = [string, integer, float, date, boolean, id]

        // let sql = `UPDATE "TableC21" 
        //         SET 
        //             string  = ${req.body.string}, 
        //             integer = ${req.body.integer}, 
        //             float   = ${req.body.float}, 
        //             date    = ${req.body.date}, 
        //             boolean = ${req.body.boolean} 
        //         WHERE id=${id};`;


        pool.query(sql, data, (err) => {
            if (err) throw err;
            console.log(err);
            res.redirect('/')

        });


    });

    return router;
};
// module.exports = router;