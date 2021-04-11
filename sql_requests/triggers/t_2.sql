-- (2) Написать триггер на добавление публикации.
--     При добавлении публикации, если значение для года (Year) не определено, вставлять текущий год.
--     Если не определено значение для описания (Annotation), вставлять информацию об оригинале книги
--     (название книги и имя автора на языке оригинала).

--     Год и название книги будем добавлять с помощью триггера, который вызывается до вставки.
--     Аннотацию будем добавлять триггером, который вызывается после вставки.
--     Также будем добавлять информацию в таблицы directory-book и author-book вторым триггером.

create or replace function process_book_insert() returns trigger as $book_add$
declare
    orig_book book%ROWTYPE;
begin
        if (TG_OP = 'INSERT') then
            if (NEW.year is null) then NEW.year=Extract(year from now()); end if;
            if (NEW.annotation is null) then
                if (NEW.orig_isbn is not null)
                    then
                        raise notice '(before) Аннотация не указана, оригинал есть.(%)', NEW.orig_isbn;
                        select * into orig_book from book where book.isbn=NEW.orig_isbn;
                        NEW.name = orig_book.name;
                    else
                        raise notice 'Аннотация не указана, оригинала книги нет.';
                end if;
            end if;
            RETURN NEW;
        end if;
        return null;
end;
$book_add$ LANGUAGE plpgsql;

create TRIGGER book_insert before insert on book for each row execute procedure process_book_insert();

--      book(isbn, name, year, edition, volume, l_code, orig_isbn, type, annotation)

create or replace function process_book_insert_a() returns trigger as $book_add$
declare
    orig_book book%ROWTYPE;
    cur_author integer;
    cur_cat varchar(24);
begin
        if (TG_OP = 'INSERT') then
            if (NEW.annotation is null) then
                if (NEW.orig_isbn is not null)
                    then
                        select * into orig_book from book where book.isbn=NEW.orig_isbn;
                        update book set annotation = orig_book.annotation where book.isbn=NEW.isbn;
                        NEW.annotation = orig_book.annotation;
                        for cur_author in (select author_book.a_i from author_book where b_i=new.orig_isbn) loop
                            insert into author_book(a_i, b_i) values (cur_author, new.isbn);
                        end loop;
                        for cur_cat in (select directory_book.d_n from directory_book where b_i=new.orig_isbn) loop
                            insert into directory_book(d_n, b_i) values (cur_cat, new.isbn);
                        end loop;
                end if;
            end if;
            RETURN NEW;
        end if;
        return null;
end;
$book_add$ LANGUAGE plpgsql;

create TRIGGER book_insert_a after insert on book for each row execute procedure process_book_insert_a();

insert into book(isbn, name, year, edition, volume, l_code, orig_isbn, type, annotation) values
    ('1337','Назв. книги',null,'Назв. издания',null,7,null, 'printed book', 'Аннотация...');
insert into book(isbn, name, year, edition, volume, l_code, orig_isbn, type, annotation) values
    ('1444','Назв. книги2',null,'Назв. издания2',null,7,'978-5-9922-1030-9', 'printed book', null);

delete from book where isbn='1444';
