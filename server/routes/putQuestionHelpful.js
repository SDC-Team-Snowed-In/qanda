const Router = require('express-promise-router')
const db = require('../db')
const queries = require('../queries/putQuestionHelpful')
const router = new Router()
module.exports = router




router.post('/:question_id/helpful', async (req, res) => {
  const { question_id } = req.query;
  const params = [question_id];
  console.log(params);

  try {
    const { rows } = await db.query(queries.postQuestion, params);

    res.status(204).send('NO CONTENT');
  } catch(err) {
    console.log('Error processing request>>>>>', err);
    res.status(500).send('Error processing request');
  }
})