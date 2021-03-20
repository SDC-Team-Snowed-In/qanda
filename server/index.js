const express = require('express');
const cors = require('cors');
const db = require('./db/db.js');
//const router = require('./routes.js');

const app = express();
const PORT = 3000;


app.use(express.json());
app.use(cors());


app.set('port', PORT);
app.listen(PORT, () => {
  console.log(`Server listening at localhost:${PORT}!`);
});

db.getRecordForPK(1)
  .then(res => console.log(res))
  .catch(e => console.log(e))
