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
--    Запускаем цикл, проходящий по всем строкам в directory
--    Пусть у нас выбрана директория programming.
--    Создаём таблицу для категорий cats, кладём туда programming
--    Выбираем родительскую категорию для programming, computer handbook. Проверяем встречалась ли она в cats
--    Не встречалась => Кладём в cats и выбираем следующую категорию (handbook), не встречалась, кладём
--    Дальше встрчаем 'art', не встречалось ранее, кладём. Дальше handbook, который уже встречался. Значит обнуляем ссылку art на handbook;
--    Далее мы не переходим на другой элемент из директории, а создаём по новой таблицу cats, обнуляем prev_cat, кладём cur_cat в таблицу
--    И продолжаем обработку аналогично programming, но для handbook.

-- Версия для отладки в f_2_debug, пример вывода см в файле call_functions.sql
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
            cur_cat = cat;
            while (cur_cat is not null) loop
                select directory.name into prev_cat from directory where name = cur_cat;
                if (prev_cat is not null) then insert into cats select prev_cat; end if;
                select directory.p_name into cur_cat from directory where name = cur_cat;
                if (cur_cat in (select * from cats)) then
                    update directory set p_name = null where directory.name=prev_cat;
                    drop table cats;
                    prev_cat=null;
                    CREATE temporary TABLE cats(category varchar(24));
                    insert into cats select cur_cat;end if;
            end loop;
            prev_cat = null;
            drop table cats;
        end loop;
end;
$$;

