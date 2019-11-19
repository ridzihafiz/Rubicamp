var express = require('express');
var router = express.Router();
const moment = require('moment');
moment().format();
var ObjectId = require('mongodb').ObjectId

// router.get('/', function (req, res, next) {
//   collection.find({}).toArray(function (err, result) {
//     // console.log(result.rows);
//     res.render('list', { data: result.rows })
//   });
// });


module.exports = (db) => {
  /* GET home page. */
  const collection = db.collection('duaduatable');

  router.get('/', (req, res) => {
    const {
      stringd, integerd, floatd, dated, booleand,
      cbString, cbInteger, cbFloat, sDate, eDate, cbBoolean
    } = req.query;

    // data untuk menampung filter
    let temp = {}

    // let stat = false

    // FILTER
    if (cbString && stringd) {
      temp.stringd = stringd;
      // stat = true
    }

    if (cbInteger && integerd) {
      temp.integer = integerd;
      // stat = true
    }

    if (cbFloat && floatd) {
      temp.float = floatd;
      // stat = true
    }

    if (dated && sDate && eDate) {
      temp.date = {};
      temp.date.$gte = new Date(`${sDate}`)
      if(eDate)
      temp.date.$lte = new Date(`${eDate}`)
      // stat = true
    }

    if (cbBoolean && booleand) {
      temp.boolean = booleand;
      // stat = true
    }


    let page = req.query.page || 1;
    let limit = 3;
    // let totalPage = Math.ceil(count.rows[0].total / limit)
    let pages = (page - 1) * limit
    let queries = req.url === '/' ? '/?page=1' : req.url;

    collection.find(temp).limit(limit).skip(pages).toArray().then(result => {
      // console.log(result);

      collection.find(temp).count().then(count => {
        res.render('list', {
          data: result,
          page,
          pages: Math.ceil(count / limit),
          current: page,
          query: req.query,
          queries,
          moment
        })
      })
    })



    router.get('/add', (req, res) => res.render('add'));

    router.post('/add', (req, res) => {
      collection.insertOne({
        stringd: req.body.string,
        integerd: req.body.integer,
        floatd: req.body.float,
        dated: req.body.date,
        booleand: req.body.boolean

      })

      // let sql = `INSERT INTO "TableC21" (string, integer, float, date, boolean) VALUES ($1, $2, $3, $4, $5)`;
      // let data = [string, integer, float, date, boolean]

      // pool.query(sql, data, (err) => {
      //     if (err) throw err;
      //     console.log("1 record inserted");
      // });
      res.redirect('/')
    });



    router.get('/delete/:id', (req, res) => {
      // var o_id = new ObjectId(req.params.id)
      collection.deleteOne({ _id: ObjectId(req.params.id) }, (err) => {
        if (err) throw err
        res.redirect('/')
      })

      // let sql = `DELETE FROM "TableC21" WHERE id=($1)`;
      // let data = [req.params.id]
      // pool.query(sql, data, (err) => {
      //     // console.log(req.params.id);

      //     if (!err) console.log("Data deleted");
      // });


    });



    router.get('/edit/:id', (req, res, next) => {
      collection.findOne({
        _id: ObjectId(req.params.id)
      }, (err, data) => {
        if (err) throw err;
        // console.log(data);
        res.render('edit', { item: data, moment })
      })
    });

    router.post('/edit/:id', (req, res, next) => {
      console.log(req.body);
      
      collection.findOneAndUpdate({ _id: ObjectId(req.params.id) }, {
        $set: {
          stringd: req.body.string,
          integerd: req.body.integer,
          floatd: req.body.float,
          dated: req.body.date,
          booleand: req.body.booleand
        }
      }, (err, row) => {
        if (err) throw err;
        res.redirect('/');
      })
    })

  });
  return router;
};



