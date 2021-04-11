--    2. Написать процедуру, определяющую есть ли циклические зависимости среди категорий, и если есть – удаляющую такие зависимости.
--    При этом удаляться должна ссылка старшей категории (с большим номером id)  на младшую (с меньшим номером id).

-- Версия без данных для отладки в 'f_2.sql', пример вывода см в файле call_functions.sql
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
            raise notice '[cat = %]', cat;
            cur_cat = cat;
            while (cur_cat is not null) loop
                raise notice '(0) prev_cat = %, cur_cat = %', prev_cat, cur_cat;
                select directory.name into prev_cat from directory where name = cur_cat;
                if (prev_cat is not null) then insert into cats select prev_cat; end if;
                select directory.p_name into cur_cat from directory where name = cur_cat;
                raise notice '(1) prev_cat = %, cur_cat = %', prev_cat, cur_cat;
                if (cur_cat in (select * from cats)) then
                    raise notice 'Цикл найден, удаляем для %', prev_cat;
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

