const express = require('express')
const mountRoutes = require('./routes')

const app = express()
app.use(express.json());

const cors = require('cors');
app.use(cors());

mountRoutes(app)

const PORT = 3001;
app.set('port', PORT);
app.listen(PORT, () => {
  console.log(`Server listening at localhost:${PORT}!`);
});

