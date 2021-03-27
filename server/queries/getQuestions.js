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

    CASE
    WHEN qa_questions_answers_agg.answers IS NOT NULL THEN qa_questions_answers_agg.answers
    WHEN qa_questions_answers_agg.answers IS NULL THEN JSON_BUILD_OBJECT ()
    END

    AS answers
    FROM qa_questions
    LEFT JOIN qa_questions_answers_agg
    ON qa_questions_answers_agg.question_id = qa_questions.question_id
    WHERE qa_questions.product_id = $1

    LIMIT $2 OFFSET $3
  `


}


