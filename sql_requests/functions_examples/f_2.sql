--    2. Написать процедуру, определяющую есть ли циклические зависимости среди категорий, и если есть – удаляющую такие зависимости.
--    При этом удаляться должна ссылка старшей категории (с большим номером id)  на младшую (с меньшим номером id).

--    В моём случае id у категории отсутствует => будем удалять ту ссылку, которая попадётся под руку.
--    Судя по описанию необходимо сделать проверку только в том случае, если 2 директории указывают друг на друга. Но сделаем в общем случае.

--    Заметим, что дерево станет циклическим только в случае, если данные были обновлены с помощью update.
--    Иначе: рассмотрим несколько вариантов:
--    1) пусть есть узлы a,b,c a<->b->c. Это невозможно, каждый узел может указывать только на 1 другой узел.
--    2) a->b->c->a -- Заметим, что такой вариант невозможен.
--    Рассмотрим вставку этих элементов:
--      insert into directory(p_name,name) values
--          ('b','a'),
--          ('c','b'),
--          ('a','c'),
--    Но в первой же строчке ('b', 'a') мы получим противоречие, так как 'a' (name) -- Primary key и не мог быть объявлен ранее.
--    Аналогично если a->b->a;

--    (оставлю информацию для отладки в процедуре, вывод функции см. в файле "call_functions.sql"

--    Решение:
--    Будем проходить циклом по каждой вершине directory.name.
--    Мы запомнили первую вершину (a). Поднимаемся пока можем. (a->b->..->c->a) Если встретили a, то удаляем c->a;

create or replace procedure rm_cycles_from_dirs()
language plpgsql
as $$
declare
    prev_cat varchar(24) = NULL;
    cur_cat varchar(24) = NULL;
    cat varchar(24) = NULL;
begin
    for cat in (select directory.name from directory order by directory.name desc) loop
            CREATE temporary TABLE cats(category varchar(24));
            insert into cats select cat;
            raise notice 'cat = %', cat;
            cur_cat = cat;
            while (cur_cat is not null) loop
                --raise notice '1prev_cat = %, cur_cat = %, cat = %', prev_cat, cur_cat, cat;
                select directory.name into prev_cat from directory where name = cur_cat;
                if (prev_cat is not null) then insert into cats select prev_cat; end if;
                select directory.p_name into cur_cat from directory where name = cur_cat;
                --raise notice '2prev_cat = %, cur_cat = %, cat = %', prev_cat, cur_cat, cat;
                if (cur_cat in (select * from cats)) then
                    raise notice 'Цикл найден, удаляем для %', prev_cat;
                    raise notice '2prev_cat = %, cur_cat = %, cat = %', prev_cat, cur_cat, cat;
                    update directory set p_name = null where directory.name=prev_cat;
                    drop table cats;
                    prev_cat=null;
                    CREATE temporary TABLE cats(category varchar(24));
                    insert into cats select cur_cat;end if;
                if (cur_cat is null) then raise notice '3prev_cat = %, cur_cat = %, cat = %', prev_cat, cur_cat, cat; end if;
            end loop;
            prev_cat = null;
            drop table cats;
        end loop;
end;
$$;
