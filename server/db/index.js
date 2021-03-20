const { Pool, Client } = require('pg')
//const Promise = require('bluebird');


const pool = new Pool({
  host: 'localhost',
  user: 'framejb',
  password: 'postgres',
  database: 'qa'
})

pool.connect();



module.exports = {
  query: (text, params) => pool.query(text, params),
}


// const getRecordForPK = (pk) => {
//   return new Promise( (resolve, reject) =>  {
//     let values = [pk];
//     let sql = 'SELECT * FROM qa_questions WHERE id = $1';
//     client
//       .query(sql, values)
//       .then( res => resolve(res) )
//       .catch( e => reject(e))
//   })
// }