const Router = require('express-promise-router')
const db = require('../db')
const queries = require('../queries/postAnswer')
const router = new Router()
module.exports = router

// Example endpoint curl localhost:3000/qa/questions?product_id=18203&boay='this is a test'&name='Johnny'&email='framejb@gmail.com


router.post('/', async (req, res) => {
  const { body } = req.query;
  const { name } = req.query;
  const { email } = req.query;
  const { product_id } = req.query;
  const params = [body, name, email];
  console.log(params);

  try {
    const { rows } = await db.query(queries.postQuestion, params);

    res.status(201).send('CREATED');
  } catch(err) {
    console.log('Error processing request>>>>>', err);
    res.status(500).send('Error processing request');
  }
})