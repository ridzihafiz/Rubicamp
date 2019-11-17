var express = require('express');
var router = express.Router();
// const { Pool } = require('pg');

// const pool = new Pool({
//   host: 'localhost',
//   user: 'postgres',
//   database: 'DBChallange21',
//   password: 'ridzi!@',
//   port: 5432
// });

module.exports = (pool) => {
  /* GET home page. */
  router.get('/', function (req, res, next) {
    sql = `SELECT * FROM "TableC21"`

    pool.query(sql, (err, result) => {
      console.log(result.rows);

      res.render('list', { data: result.rows})
      // client.end()
    });
  });
  return router
}

// module.exports = router;
