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

