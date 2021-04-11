--    1. Создать триггер на удаление категории книг.
--    Категория может быть удалена только в случае если либо ни одна книга не ссылается на категорию, либо категория не является корневой.
--    При удалении некорневой категории, все книги в этой категории включить в родительскую категорию.
--    В случае удаления корневой категории, сделать все ее подкатегории корневыми.

-- Вернуть родителя
create or replace function par_cat(cat varchar(24))
    returns varchar(24) as
$func$
    declare p_cat varchar(24)=NULL;
    begin
        select directory.p_name into p_cat from directory where name = par_cat.cat;
        return p_cat;
    end;
$func$ language plpgsql;

create or replace function is_root(cat VARCHAR(24))
  returns boolean as
$func$
begin
    if (par_cat(cat) is null) then
        return true;
    else
        return false;
    end if;
end;
$func$ language plpgsql;

--  Является ли категорией для какой-нибудь книги.
create or replace function is_ref_for_book(cat VARCHAR(24))
  returns boolean as
$func$
declare c_book varchar(24)=NULL;
begin
    select directory_book.b_i into c_book from directory_book where d_n = is_ref_for_book.cat;
    if (c_book is null) then return false;
                       else return true;
                       end if;
end;
$func$ language plpgsql;

--  Является ли родителем для какой-нибудь категории.
create or replace function has_c_cat(cat VARCHAR(24))
  returns boolean as
$func$
declare c_cat varchar(24)=null;
begin
    select directory.name into c_cat from directory where
    directory.p_name=has_c_cat.cat;
    if (c_cat is null) then return false;
                       else return true;
                       end if;

end;
$func$ language plpgsql;

create or replace function process_cat_delete() returns trigger as
$cat_delete$
declare
    temp_cat varchar(24)=NULL;
    temp_book varchar(24)=NULL;
    par_cat varchar(24)=NULL;
begin
        IF (TG_OP = 'DELETE') THEN
            -- Категория может быть удалена только в случае если либо ни одна книга не ссылается на категорию
            if (is_ref_for_book(OLD.name) = false) then
               raise notice 'На категорию книги не ссылаются';
               -- На категорию книги не ссылаются
               if (is_root(OLD.name)=true) then
                    raise notice 'Категория корневая, обнуляем родительские категории для детей'; -- +
                   -- нужно у всех детей категории обнулить родительскую категорию:
                   update directory set p_name = NULL where directory.p_name=OLD.name;
               else
                   raise notice 'Категория не корневая, включаем подкатегории в родительские категории';
               -- нужно подкатегории включить в родительские категории
                   for temp_cat in (select directory.name from directory where directory.p_name=OLD.name) loop
                       raise notice 'temp_cat = %',temp_cat;
                       update directory set p_name = par_cat(OLD.name) where directory.name=temp_cat;
                   end loop;
               end if;
               return OLD;
            end if;
            -- либо категория не является корневой.
            if (is_root(OLD.name) = false) then
                raise notice 'Категория не корневая, включаем книги в родительскую категорию';
                -- на категорию обязательно ссылаются книги. все книги в этой категории включить в родительскую категорию.
                for temp_book in (select directory_book.b_i from directory_book where directory_book.d_n = OLD.name) loop
                    raise notice 'temp_book = %', temp_book;
                    delete from directory_book where directory_book.b_i=temp_book and directory_book.d_n= OLD.name;
                    insert into directory_book(d_n,b_i) values (par_cat(OLD.name),temp_book);
                end loop;
                -- если у категории есть подкатегории, то нужно включить их в родительскую категорию
                for temp_cat in (select directory.name from directory where directory.p_name=OLD.name) loop
                    raise notice 'Включаем категории детей в родительские, temp_cat=%',temp_cat;
                    update directory set p_name = par_cat(OLD.name) where directory.name=temp_cat;
                end loop;
                RETURN OLD;
            else
                raise notice 'невозможно удалить, т.к. на неё ссылаются книги и не явл-ся корневой';
            end if;
        end if;
        return null;
END;
$cat_delete$ LANGUAGE plpgsql;

CREATE TRIGGER cat_delete
Before DELETE ON directory
    FOR EACH ROW EXECUTE PROCEDURE process_cat_delete();
