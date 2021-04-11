--    3.Написать функцию, возвращающую таблицу со всеми категориями, к которым принадлежит книга.
--    Входные данные: ISBN публикации.
--    На выходе надо получить таблицу категорий, к которым принадлежит книга,
--    включая все родительские категории тех категорий, с которыми книга связана непосредственно.

create or replace function all_category(isbn varchar(24))
  returns table(category varchar(24)) as
$$
declare
    cur_cat varchar(24) = NULL;
    var varchar(24) = NULL;
begin
    CREATE temporary TABLE cats ON COMMIT DROP as
    select directory_book.d_n as category from directory_book where directory_book.b_i=all_category.isbn;
    for var in (select * from cats) loop
        cur_cat = var;  -- Первый элемент уже добавлен в cats;
        while (cur_cat is not null) loop
            select directory.p_name into cur_cat from directory where name = cur_cat;
            if (cur_cat is not null) then insert into cats select cur_cat; end if;
        end loop;
    end loop;
    return query select distinct * from cats order by 1 asc;
end;
$$ language plpgsql;

-- Допуcтим у Публикации '978-5-9922-1030-9' есть 2 категории.  Циклом мы идём по этим 2 категориям, а внутренним идём наверх пока можем.

