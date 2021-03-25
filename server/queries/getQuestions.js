module.exports = {
  'getQuestions':

    `
    SELECT
    qa_questions.question_id AS question_id,
    qa_questions.question_body AS question_body,
    qa_questions.question_date AS question_date,
    qa_questions.asker_name AS asker_name,
    qa_questions.question_helpfulness AS question_helpfulness,
    qa_questions.reported AS reported,
    (CASE
      WHEN subanswers.answers ISNULL
        THEN JSON_BUILD_OBJECT ()
      WHEN subanswers.answers IS NOT null
        THEN subanswers.answers
      END
    ) AS answers
    FROM qa_questions
    LEFT JOIN (
    SELECT
      qa_answers.question_id,
      JSON_OBJECT_AGG( qa_answers.answer_id,
        JSONB_BUILD_OBJECT (
          'id', qa_answers.answer_id,
          'body', qa_answers.body,
          'date',	qa_answers.date,
          'answerer_name', qa_answers.answerer_name,
          'helpfulness', qa_answers.helpfulness,
          'photos', array[]::varchar[]
          )
      )  AS answers
    FROM qa_answers
    GROUP BY qa_answers.question_id
    ) AS subanswers
    ON subanswers.question_id = qa_questions.question_id

    WHERE qa_questions.product_id = $1 AND reported IS NOT true
    LIMIT $2 OFFSET $3
  `


}