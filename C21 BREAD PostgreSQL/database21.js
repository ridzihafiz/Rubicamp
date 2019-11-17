const Sequelize = require('sequelize');
// your credentials
DATABASE_URL = 'postgres://[postgres]:[10davidvsblu44]@127.0.0.1:38611/node-postgres-sequelize';

const database = new Sequelize(DATABASE_URL);

module.exports = database;