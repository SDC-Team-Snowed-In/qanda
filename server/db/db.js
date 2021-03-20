const { Pool, Client } = require('pg')
const Promise = require('bluebird');


const client = new Client({
  host: 'localhost',
  user: 'framejb',
  password: 'postgres',
  database: 'qa'
})

client.connect();

const getRecordForPK = (pk) => {
  return new Promise( (resolve, reject) =>  {
    let values = [pk];
    let sql = 'SELECT * FROM qa_questions WHERE id = $1';
    client
      .query(sql, values)
      .then( res => resolve(res) )
      .catch( e => reject(e))
  })
}

module.exports = {
  getRecordForPK
}
