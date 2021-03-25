const Router = require('express-promise-router')
const db = require('../db')
const queries = require('../queries/getAnswers')
const router = new Router()

module.exports = router

// Example curl localhost:3000/qa/questions/1/answers?count=5&page=1

router.get('/:question_id/answers', async (req, res) => {
  const { question_id } = req.params;
  let { count } = req.query;
  let limit = '';
  count ? limit = count.toString() : limit  = '5';
  let { page } = req.query;
  let offset = '';
  page ? offset = ((page -1) * limit).toString() : offset  = '0';


  try {
    const { rows } = await db.query(queries.getAnswers, [question_id, limit, offset])
    const result = {};
    result.question = question_id;
    result.page = page;
    result.count = count;
    result.results = rows;
    console.log(result);
    res.status(200).send(result)
  } catch(err) {
    console.log('Error processing request>>>>>', err);
    res.status(500).send('Error processing request');
  }
})