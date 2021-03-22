-- run in terminal with command: psql postgres -f'/Users/framejb/OneDrive/Coding/hr/SDC/qanda/schema.sql'

DROP DATABASE IF EXISTS qa;

CREATE DATABASE qa;
\c qa;

CREATE TABLE qa_questions (
  question_id INTEGER,
  product_id INTEGER DEFAULT NULL,
  question_body VARCHAR(1000) DEFAULT NULL,
  question_date TIMESTAMPTZ DEFAULT NOW(),
  asker_name VARCHAR(256) DEFAULT NULL,
  asker_email VARCHAR(256) DEFAULT NULL,
  reported BOOLEAN DEFAULT NULL,
  question_helpfulness INTEGER DEFAULT NULL,
  PRIMARY KEY (question_id)
);

CREATE TABLE qa_answers (
  answer_id INTEGER,
  question_id INTEGER,
  body VARCHAR(1000) DEFAULT NULL,
  date TIMESTAMPTZ DEFAULT NOW(),
  answerer_name VARCHAR(256) DEFAULT NULL,
  answerer_email VARCHAR(256) DEFAULT NULL,
  reported BOOLEAN DEFAULT NULL,
  helpfulness INTEGER DEFAULT NULL,
  PRIMARY KEY (answer_id),
  CONSTRAINT fk_question_id
    FOREIGN KEY(question_id)
      REFERENCES  qa_questions(question_id)
);

CREATE TABLE qa_photos (
  id INTEGER,
  answer_id INTEGER DEFAULT NULL,
  url VARCHAR(1000) DEFAULT NULL,
  date TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (id),
  CONSTRAINT fk_answer_id
    FOREIGN KEY(answer_id)
      REFERENCES  qa_answers(answer_id)
);