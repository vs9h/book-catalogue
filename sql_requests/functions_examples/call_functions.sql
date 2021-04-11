-- 1 Task

select add_book(7,'tr-isbn',2, 'Cooking', 'Viking Press',2000,'annotation','название книги','Дональд',
               'Дак','type', 'isbn_o', 'origin title','firstname_o','surname_o',4,'annotation_o',
               1990, 'edition_o');

--        NOTICE:  Книга переведена.
--        NOTICE:  Книга переведена, оригинала нет в БД
--         add_book
--        ----------
--         tr-isbn
--        (1 row)

--      В ответе мы получаем ISBN публикации, так как он и является первичным ключом у Book.
--      В БД была добавлена оригинальная книга и переведённая. Что стало с таблицами:

--    select * from book_v;
--           isbn        |         title          | year |     edition      | volume |     orig_isbn     |      type       | language
--    -------------------+------------------------+------+------------------+--------+-------------------+-----------------+----------
--     978-0-140-1863-90 | East of Eden           | 1952 | Viking Press     |      1 |                   | printed book    | english
--     978-0-140-2816-20 | The Grapes of Wrath    | 1939 | Viking Press     |        |                   | printed book    | english
--     0-552-55273-9     | The Golem Eye          | 2004 | Miramax          |        |                   | electronic book | english
--     isbn_o            | origin title           | 1990 | edition_o        |      2 | isbn_o            | type            | bengal
--     978-5-17-102581-9 | К востоку от Эдема (h) | 2017 | Издательство АСТ |      2 | 978-0-140-1863-90 | printed book    | hindi
--     tr-isbn           | название книги         | 2000 | Viking Press     |      2 | isbn_o            | type            | russian
--     978-5-17-102580-9 | К востоку от Эдема     | 2015 | Издательство АСТ |      1 | 978-0-140-1863-90 | printed book    | russian
--     978-5-389-06635-9 | Гроздья гнева          | 2013 | Азбука-Аттикус   |        | 978-0-140-2816-20 | printed book    | russian
--     978-5-6999-4925-0 | Глаз голема            | 2017 | Эксмо            |        | 0-552-55273-9     | electronic book | russian
--     978-5-9922-1030-9 | Верховная Ведьма       | 2004 | Альфа-книга      |        |                   | electronic book | russian
--    (10 rows)
--

--    select * from author;
--     id |     surname      |    firstname
--    ----+------------------+------------------
--     1  | Громыко          | Ольга
--     2  | Stroud           | Jonathan
--     3  | Steinbeck        | John
--     4  | Дак              | Дональд
--     5  | surname_o        | firstname_o
--    (5 rows)
--
--
--    select * from author_book;
--     a_i |        b_i
--    -----+-------------------
--     1   | 978-5-9922-1030-9
--     2   | 0-552-55273-9
--     2   | 978-5-6999-4925-0
--     3   | 978-0-140-2816-20
--     3   | 978-5-389-06635-9
--     3   | 978-0-140-1863-90
--     3   | 978-5-17-102580-9
--     5   | isbn_o
--     4   | tr-isbn
--    (9 rows)
--
--    select * from directory_book;
--           d_n        |        b_i
--    ------------------+-------------------
--     fantasy          | 978-5-9922-1030-9
--     heroic fantasy   | 978-5-9922-1030-9
--     fantasy          | 0-552-55273-9
--     novel            | 978-0-140-2816-20
--     historical genre | 978-0-140-2816-20
--     novel            | 978-5-389-06635-9
--     historical genre | 978-5-389-06635-9
--     novel            | 978-0-140-1863-90
--     novel            | 978-5-17-102580-9
--     novel            | 978-5-17-102581-9
--     Cooking          | isbn_o
--     Cooking          | tr-isbn
--    (12 rows)

--     Остальные случаи очевидно будут работать.

select add_book(1,'978-5-9922-1030-998',null,'poetry','Альфа-книга',2007,'annotation','title','firstname',
             'surname','type', '978-5-9922-1030-9','title_o','firstname_o','surname_o',7,'annotation_o');
select add_book(1,'978-57897987-90',null,'poetry','Альфа-книга',2007,'annotation','TEST BOOK','FIRSTNAME',
             'surname','type');

-- 2 Task

--    call rm_cycles_from_dirs(); -- данные не изменялись.

--    NOTICE:  cat = programming
--    NOTICE:  prev_cat = <NULL>, cur_cat = programming
--    NOTICE:  prev_cat = programming, cur_cat = computer handbook
--    NOTICE:  prev_cat = computer handbook, cur_cat = handbook
--    NOTICE:  prev_cat = handbook, cur_cat = art
--    NOTICE:  prev_cat = art, cur_cat = <NULL>
--    NOTICE:  cat = poetry
--    NOTICE:  prev_cat = <NULL>, cur_cat = poetry
--    NOTICE:  prev_cat = poetry, cur_cat = art
--    NOTICE:  prev_cat = art, cur_cat = <NULL>
--    NOTICE:  cat = Pets
--    NOTICE:  prev_cat = <NULL>, cur_cat = Pets
--    NOTICE:  prev_cat = Pets, cur_cat = home, hobby
--    NOTICE:  prev_cat = home, hobby, cur_cat = <NULL>
--    NOTICE:  cat = novel
--    NOTICE:  prev_cat = <NULL>, cur_cat = novel
--    NOTICE:  prev_cat = novel, cur_cat = art
--    NOTICE:  prev_cat = art, cur_cat = <NULL>
--    NOTICE:  cat = Housekeeping
--    NOTICE:  prev_cat = <NULL>, cur_cat = Housekeeping
--    NOTICE:  prev_cat = Housekeeping, cur_cat = home, hobby
--    NOTICE:  prev_cat = home, hobby, cur_cat = <NULL>
--    NOTICE:  cat = household handbook
--    NOTICE:  prev_cat = <NULL>, cur_cat = household handbook
--    NOTICE:  prev_cat = household handbook, cur_cat = handbook
--    NOTICE:  prev_cat = handbook, cur_cat = art
--    NOTICE:  prev_cat = art, cur_cat = <NULL>
--    NOTICE:  cat = home, hobby
--    NOTICE:  prev_cat = <NULL>, cur_cat = home, hobby
--    NOTICE:  prev_cat = home, hobby, cur_cat = <NULL>
--    NOTICE:  cat = Hobbies and crafts
--    NOTICE:  prev_cat = <NULL>, cur_cat = Hobbies and crafts
--    NOTICE:  prev_cat = Hobbies and crafts, cur_cat = home, hobby
--    NOTICE:  prev_cat = home, hobby, cur_cat = <NULL>
--    NOTICE:  cat = historical genre
--    NOTICE:  prev_cat = <NULL>, cur_cat = historical genre
--    NOTICE:  prev_cat = historical genre, cur_cat = art
--    NOTICE:  prev_cat = art, cur_cat = <NULL>
--    NOTICE:  cat = heroic fantasy
--    NOTICE:  prev_cat = <NULL>, cur_cat = heroic fantasy
--    NOTICE:  prev_cat = heroic fantasy, cur_cat = fantasy
--    NOTICE:  prev_cat = fantasy, cur_cat = art
--    NOTICE:  prev_cat = art, cur_cat = <NULL>
--    NOTICE:  cat = handbook
--    NOTICE:  prev_cat = <NULL>, cur_cat = handbook
--    NOTICE:  prev_cat = handbook, cur_cat = art
--    NOTICE:  prev_cat = art, cur_cat = <NULL>
--    NOTICE:  cat = Garden
--    NOTICE:  prev_cat = <NULL>, cur_cat = Garden
--    NOTICE:  prev_cat = Garden, cur_cat = home, hobby
--    NOTICE:  prev_cat = home, hobby, cur_cat = <NULL>
--    NOTICE:  cat = fantasy
--    NOTICE:  prev_cat = <NULL>, cur_cat = fantasy
--    NOTICE:  prev_cat = fantasy, cur_cat = art
--    NOTICE:  prev_cat = art, cur_cat = <NULL>
--    NOTICE:  cat = Entertainment
--    NOTICE:  prev_cat = <NULL>, cur_cat = Entertainment
--    NOTICE:  prev_cat = Entertainment, cur_cat = home, hobby
--    NOTICE:  prev_cat = home, hobby, cur_cat = <NULL>
--    NOTICE:  cat = Do it yourself
--    NOTICE:  prev_cat = <NULL>, cur_cat = Do it yourself
--    NOTICE:  prev_cat = Do it yourself, cur_cat = home, hobby
--    NOTICE:  prev_cat = home, hobby, cur_cat = <NULL>
--    NOTICE:  cat = detective
--    NOTICE:  prev_cat = <NULL>, cur_cat = detective
--    NOTICE:  prev_cat = detective, cur_cat = art
--    NOTICE:  prev_cat = art, cur_cat = <NULL>
--    NOTICE:  cat = Cooking
--    NOTICE:  prev_cat = <NULL>, cur_cat = Cooking
--    NOTICE:  prev_cat = Cooking, cur_cat = home, hobby
--    NOTICE:  prev_cat = home, hobby, cur_cat = <NULL>
--    NOTICE:  cat = computer handbook
--    NOTICE:  prev_cat = <NULL>, cur_cat = computer handbook
--    NOTICE:  prev_cat = computer handbook, cur_cat = handbook
--    NOTICE:  prev_cat = handbook, cur_cat = art
--    NOTICE:  prev_cat = art, cur_cat = <NULL>
--    NOTICE:  cat = Cars and traffic rules
--    NOTICE:  prev_cat = <NULL>, cur_cat = Cars and traffic rules
--    NOTICE:  prev_cat = Cars and traffic rules, cur_cat = home, hobby
--    NOTICE:  prev_cat = home, hobby, cur_cat = <NULL>
--    NOTICE:  cat = art
--    NOTICE:  prev_cat = <NULL>, cur_cat = art
--    NOTICE:  prev_cat = art, cur_cat = <NULL>
--    CALL

--    Изменим данные:
update directory set p_name = 'handbook'  where directory.name = 'art';
--    Получили цикл a->b->a


-- 3 Task

select * from all_category('978-5-9922-1030-9');

--         category
--    -------------------
--     art
--     computer handbook
--     fantasy
--     handbook
--     heroic fantasy
--     programming
--    (6 rows)
