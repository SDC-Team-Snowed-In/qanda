const config = require('../../config.js')
const { Pool, Client } = require('pg')
//const Promise = require('bluebird');


const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: `${config.password}`,
  database: 'qa'
})

pool.connect();



module.exports = {
  query: (text, params) => pool.query(text, params),
}

