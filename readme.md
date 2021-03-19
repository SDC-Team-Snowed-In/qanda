**Start database**
brew services start postgresql

**Raw CSV Data Heads**
head questions.csv
id, product_id, body, date_written, asker_name, asker_email, reported, helpful
head answers.csv
id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful
head answers_photos.csv
id, answer_id, url

**Import csv head (do this if you want to test the schema prior to large data imports)**
psql qa
\copy qa_questions (id, product_id, question_body, question_date, asker_name, asker_email, reported, question_helpfulness) FROM '/Users/framejb/OneDrive/Coding/hr/SDC/qanda/head-questions.csv' DELIMITER ',' CSV HEADER

\copy qa_answers (id, question_id, body, date, answer_name, answerer_email, reported, helpfulness) FROM '/Users/framejb/OneDrive/Coding/hr/SDC/qanda/head-answers.csv' DELIMITER ',' CSV HEADER

\copy qa_photos (id, answer_id, url) FROM '/Users/framejb/OneDrive/Coding/hr/SDC/qanda/head-answers-photos.csv' DELIMITER ',' CSV HEADER

**Select all from tables to check hwo data goes in**
SELECT * FROM qa_questions;
SELECT * FROM qa_answers;
SELECT * FROM qa_photos;


**Toggle on/off foreign key constraint**
https://stackoverflow.com/questions/38112379/disable-postgresql-foreign-key-checks-for-migrations

SET session_replication_role = 'replica';
SET session_replication_role = 'origin';


**Import full csv files**
psql qa

qa=# \copy qa_questions (id, product_id, question_body, question_date, asker_name, asker_email, reported, question_helpfulness) FROM '/Users/framejb/OneDrive/Coding/hr/SDC/data/questions.csv' DELIMITER ',' CSV HEADER

result = COPY 3,521,634  3/18 5pm

\copy qa_answers (id, question_id, body, date, answer_name, answerer_email, reported, helpfulness) FROM '/Users/framejb/OneDrive/Coding/hr/SDC/data/answers.csv' DELIMITER ',' CSV HEADER

result = COPY 12,392,946  3/18 5pm

\copy qa_photos (id, answer_id, url) FROM '/Users/framejb/OneDrive/Coding/hr/SDC/data/answers_photos.csv' DELIMITER ',' CSV HEADER

result = COPY 3,717,892    3/18 5pm