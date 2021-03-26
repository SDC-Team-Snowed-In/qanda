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

**Create indexes**
CREATE INDEX qa_questions_reported_index ON qa_questions (reported);
CREATE INDEX qa_questions_product_id_index ON qa_questions (product_id);
CREATE INDEX qa_questions_question_id_index ON qa_questions (question_id);

CREATE INDEX qa_answers_question_id_index ON qa_answers (question_id);
CREATE INDEX qa_answers_reported_index ON qa_answers (reported);
CREATE INDEX qa_answers_answer_id_index ON qa_answers (answer_id);

CREATE INDEX qa_photos_answer_id_index ON qa_photos (answer_id);
CREATE INDEX qa_photos_id_index ON qa_photos (id);

**Import full csv files**
psql qa

\copy qa_questions (question_id, product_id, question_body, question_date, asker_name, asker_email, reported, question_helpfulness) FROM '/Users/framejb/OneDrive/Coding/hr/SDC/data/questions.csv' DELIMITER ',' CSV HEADER

result = COPY 3,521,634  3/18 5pm

\copy qa_answers (answer_id, question_id, body, date, answerer_name, answerer_email, reported, helpfulness) FROM '/Users/framejb/OneDrive/Coding/hr/SDC/data/answers.csv' DELIMITER ',' CSV HEADER

result = COPY 12,392,946  3/18 5pm

\copy qa_photos (id, answer_id, url) FROM '/Users/framejb/OneDrive/Coding/hr/SDC/data/answers_photos.csv' DELIMITER ',' CSV HEADER

result = COPY 3,717,892    3/18 5pm

SELECT
    st.id,
    st.product_id,
    st.name,
    st.sale_price,
    st.original_price,
    st.default_style,
    subphoto.photos,
    subsku.skus
  from styles as st
  join (
    select
    pl.style_id,
    jsonb_agg (
        json_build_object(
        'thumbnail_url', pl.thumbnail_url,
        'url', pl.photo_url
        )
    ) as photos
    from photo_list as pl
    where style_id = 84407
    group by pl.style_id
  ) as subphoto
  on subphoto.style_id = st.id
  join (
    SELECT
    sl.style_id,
    json_object_agg(
    sl.id,
        json_build_object(
            'size', sl.size,
            'quantity',sl.quantity
        )
    ) as skus
    from sku_list as sl
    where sl.style_id = 84407
    group by sl.style_id
  ) as subsku
  on subsku.style_id = st.id
  where product_id = 18081;







select * from style_optimized where product_id = 18081
Product_id , Result
create table style_limited as
SELECT
    sl.style_id,
    json_object_agg(
    sl.id,
        json_build_object(
            'size', sl.size,
            'quantity',sl.quantity
        )
    ) as skus
    from sku_list as sl
    group by sl.style_id
create table photo_limited as
select
    pl.style_id,
    jsonb_agg (
        json_build_object(
        'thumbnail_url', pl.thumbnail_url,
        'url', pl.photo_url
        )
    ) as photos
    from photo_list as pl
    group by pl.style_id
create table style_full as
SELECT
    st.id,
    st.product_id,
    st.name,
    st.sale_price,
    st.original_price,
    st.default_style,
    st.photos,
    st.skus
    from styles as st
    join (
        select sc.style_id, sc.photos, sc.skus
        from style_combined as sc
    ) as ssc
  on ssc.style_id = st.id
create table style_optimized as
SELECT
    sf.product_id,
    jsonb_agg (
      json_build_object(
        'style_id', sf.id,
        'name', sf.name,
        'sale_price', sf.sale_price,
        'original_price', sf.original_price,
        'default?', sf.default_style,
        'photos', sf.photos,
        'skus', sf.skus
      )
    ) as results
  from style_full as sf
  group by sf.product_id;
  ALTER TABLE style_optimized ADD PRIMARY KEY (product_id);

