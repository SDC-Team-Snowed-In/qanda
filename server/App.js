const express = require('express')
const mountRoutes = require('./routes')
const legacy = require('./LegacyAPI/legacy.js')

const cors = require('cors');


const app = express()

mountRoutes(app)


const PORT = 3000;
app.use(express.json());
app.use(cors());


app.set('port', PORT);
app.listen(PORT, () => {
  console.log(`Server listening at localhost:${PORT}!`);
  // legacy.getQuestions('18202', '&count=5', '&page=1')
});