DROP TABLE IF EXISTS qa_questions_answers_agg;

CREATE TABLE qa_questions_answers_agg AS
    SELECT
    qa_questions.question_id AS question_id,
    qa_questions.question_body AS question_body,
    qa_questions.question_date AS question_date,
    qa_questions.asker_name AS asker_name,
    qa_questions.question_helpfulness AS question_helpfulness,
    qa_questions.reported AS reported,
    CASE
      WHEN subanswers.answers ISNULL
        THEN JSON_BUILD_OBJECT ()
      WHEN subanswers.answers IS NOT null
        THEN subanswers.answers
    END
    AS answers
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
          'photos', subphotos
          )
      )   AS answers
      FROM qa_answers
      LEFT JOIN (
        SELECT
          qa_photos.answer_id,
          JSON_AGG(
            JSONB_BUILD_OBJECT (
            'id', qa_photos.id,
            'url', qa_photos.url
            )
          ) AS subphotos
        FROM qa_photos
        GROUP BY qa_photos.answer_id
      ) AS subphotos
      ON subphotos.answer_id = qa_answers.answer_id
      GROUP BY qa_answers.question_id
      ) AS subanswers
      ON subanswers.question_id = qa_questions.question_id

    WHERE qa_questions.reported IS NOT true;
	ALTER TABLE qa_questions_answers_agg ADD PRIMARY KEY (question_id);