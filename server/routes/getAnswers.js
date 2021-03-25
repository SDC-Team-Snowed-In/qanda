const Router = require('express-promise-router')
const db = require('../db')
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
    const { rows } = await db.query(`
    SELECT
    qa_answers.answer_id AS answer_id,
    qa_answers.body AS body,
    qa_answers.date AS date,
    qa_answers.answerer_name AS answerer_name,
    qa_answers.helpfulness AS helpfulness,
    (CASE
      WHEN subphotos.photos ISNULL
        THEN JSON_BUILD_ARRAY()
      WHEN subphotos.photos IS NOT null
        THEN subphotos.photos
      END
    ) AS photos
    FROM qa_answers
    LEFT JOIN (
    SELECT
      qa_photos.answer_id,
      JSON_AGG(
        JSON_BUILD_OBJECT (
          'id', qa_photos.id,
          'url', qa_photos.url
          )
      )  AS photos
    FROM qa_photos
    GROUP BY qa_photos.answer_id
    ) AS subphotos
    ON subphotos.answer_id = qa_answers.answer_id
    WHERE qa_answers.question_id = $1 AND reported = false
    LIMIT $2 OFFSET $3
    `, [question_id, limit, offset])

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

