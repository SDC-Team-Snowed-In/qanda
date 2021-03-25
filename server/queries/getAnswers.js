module.exports = {
  'getAnswers':
  `
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
    WHERE qa_answers.question_id = $1 AND reported IS NOT true
    LIMIT $2 OFFSET $3
  `
}