-- TEST TRIGGER 1

insert into directory(p_name,name) values (null, 'where my child');
delete from directory where name='where my child';

--NOTICE:  На категорию книги не ссылаются
--NOTICE:  Категория корневая, обнуляем родительские категории для детей

------------

insert into directory(p_name,name) values (null, 'a');
insert into directory(p_name,name) values ('a', 'b');

--     Garden                 | home, hobby
--     where my child2        |
--     a                      |
--     b                      | a
--    (23 rows)

delete from directory where name='a';

--    NOTICE:  На категорию книги не ссылаются
--    NOTICE:  Категория корневая, обнуляем родительские категории для детей

--     ...
--     Garden                 | home, hobby
--     where my child2        |
--     b                      |

------------

-- никто не ссылается (из книг), не корневая

insert into directory(p_name,name) values (null, 'a');
insert into directory(p_name,name) values ('a', 'b');
insert into directory(p_name,name) values ('b', 'c');

delete from directory where name='b';

--NOTICE:  На категорию книги не ссылаются
--NOTICE:  Категория не корневая, включаем подкатегории в родительские категории
--NOTICE:  temp_cat = c

--              name          |      p_name
--    ------------------------+-------------------
--    ...                     | ...
--     a                      |
--     c                      | a
--    (23 rows)

------------
--  Хотя бы 1 книга ссылается на категорию, категория не корневая.

insert into directory(p_name,name) values (null, 'a');
insert into directory(p_name,name) values ('a', 'b');
insert into directory(p_name,name) values ('b', 'c');
insert into directory_book(d_n, b_i) values
    ('a', '978-0-140-1863-90'),
    ('b', '978-5-17-102580-9'),
    ('c', '978-5-17-102581-9');

        select * from directory;
--              name          |      p_name
--    ------------------------+-------------------
--    ...                     | ...
--     a                      |
--     b                      | a
--     c                      | b
--    (23 rows)

    catalogue=# select * from directory_book;
--           d_n        |        b_i
--    ------------------+-------------------
--     programming      | 978-5-9922-1030-9
--     heroic fantasy   | 978-5-9922-1030-9
--     fantasy          | 0-552-55273-9
--     novel            | 978-0-140-2816-20
--     historical genre | 978-0-140-2816-20
--     novel            | 978-5-389-06635-9
--     historical genre | 978-5-389-06635-9
--     novel            | 978-0-140-1863-90
--     novel            | 978-5-17-102580-9
--     novel            | 978-5-17-102581-9
--     a                | 978-0-140-1863-90
--     b                | 978-5-17-102580-9
--     c                | 978-5-17-102581-9
--    (13 rows)

    delete from directory where name='b';

--    NOTICE:  Категория не корневая, включаем книги в родительскую категорию
--    NOTICE:  temp_book = 978-5-17-102580-9
--    NOTICE:  Включаем категории детей в родительские, temp_cat=c
--    DELETE 1

--              name          |      p_name
--    ------------------------+-------------------
--    ...                     | ...
--     a                      |
--     c                      | a
--    (22 rows)

      select * from directory_book;
--             d_n        |        b_i
--      ------------------+-------------------
--       programming      | 978-5-9922-1030-9
--       heroic fantasy   | 978-5-9922-1030-9
--       fantasy          | 0-552-55273-9
--       novel            | 978-0-140-2816-20
--       historical genre | 978-0-140-2816-20
--       novel            | 978-5-389-06635-9
--       historical genre | 978-5-389-06635-9
--       novel            | 978-0-140-1863-90
--       novel            | 978-5-17-102580-9
--       novel            | 978-5-17-102581-9
--       a                | 978-0-140-1863-90
--       c                | 978-5-17-102581-9
--       a                | 978-5-17-102580-9
--      (13 rows)


    delete from directory where name='a';
--NOTICE:  невозможно удалить, т.к. на неё ссылаются книги и не явл-ся корневой
--DELETE 0
    delete from directory_book where d_n='a';
--DELETE 3
    delete from directory where name = 'a';
--NOTICE:  На категорию книги не ссылаются
--NOTICE:  Категория корневая, обнуляем родительские категории для детей
--DELETE 1