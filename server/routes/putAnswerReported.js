const Router = require('express-promise-router')
const db = require('../db')
const queries = require('../queries/putAnswerReported')
const router = new Router()
module.exports = router




router.post('/:answer_id/report', async (req, res) => {
  const { answer_id } = req.query;
  const params = [answer_id];
  console.log(params);

  try {
    const { rows } = await db.query(queries.postQuestion, params);

    res.status(204).send('NO CONTENT');
  } catch(err) {
    console.log('Error processing request>>>>>', err);
    res.status(500).send('Error processing request');
  }
})