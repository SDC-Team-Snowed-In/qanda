const express = require('express')
const mountRoutes = require('./routes')
const cors = require('cors');


const app = express()




const PORT = 3001;
app.use(express.json());
app.use(cors());


app.set('port', PORT);
app.listen(PORT, () => {
  console.log(`Server listening at localhost:${PORT}!`);
  // legacy.getQuestions('18202', '&count=5', '&page=1')
});

mountRoutes(app)