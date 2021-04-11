-- 1) Написать функцию, добавляющую публикацию книги.
--    Функция должна возвращать идентификатор созданной записи о публикациях.
--    Входные данные:
--        название книги и фамилия автора в оригинале (title_o, firstname_o, surname_o),
--        код родного языка автора, данные о публикации (ISBN, Name, Volume, genre, Edition, Year, Annotation),
--        код языка книги (l_code),
--        сведения об авторе на языке книги (Surname, FirstName).
--    Перед добавлением записи о публикации выбрать из базы значения вторичных ключей для добавляемой записи исходя из входных параметров процедуры.
--    Для автора, книги (в оригинале) и имени автора на языке публикации в случае отсутствия в базе записей, соответствующих входным параметрам, добавить их.


--     Если книга переведена и оригинал книги существует в БД, то мы считаем, что оригинал книги задан корректно и мы его не меняем.
--     (то есть функция принимает аргументы включительно до isbn_o, на дальнейшие внимания мы не обращаем)
--     Если книга переведена и оригинала книги нет в БД, то мы считаем, что функция принимает абсолютно все аргументы.
--     _o -- означает "оригинальное"
--     Пример использования функций есть в файле "call_functions.sql"

create or replace function add_book(
    l_code int, isbn varchar(24), volume integer, genre varchar(24),
    edition varchar(20), year integer, annotation varchar(400),
    title varchar(30), firstname varchar(16), surname varchar(16), type varchar(24),
    isbn_o varchar(24)= NULL, title_o varchar(30)= NULL, firstname_o varchar(16)= NULL,
    surname_o varchar(16) = NULL, l_code_o integer = NULL, annotation_o varchar(400)=NULL, year_o integer = NULL, edition_o varchar(20)= NULL)
  returns text as
$func$
declare
    author_id integer = NULL;
    author_o_id integer = NULL;
    temp_genre varchar(24) = null;
    temp_isbn_o varchar(24) = null;
begin
    select id into author_id from author
         where author.surname=add_book.surname and author.firstname=add_book.firstname;
         if (author_id is null) then
             select (max(id)::int+1) into author_id from author;
             insert into author(id, firstname, surname) values
                 (author_id, add_book.firstname, add_book.surname);
         end if;
    --  Если автора с таким id нет в таблице, то добавляем. И теперь в переменной author_id в любом случае хранится правильный идентификатор.
    select directory.name into temp_genre from directory where (directory.name=add_book.genre);
    if (temp_genre is null)
    then
        raise notice 'Введён некорректный жанр'; return '';
    end if;
    if (add_book.isbn_o is not null) then
        raise notice 'Книга переведена.';
        select book.isbn into temp_isbn_o from book where (book.isbn = add_book.isbn_o);
        if (temp_isbn_o is null)
        then
            raise notice 'Книга переведена, оригинала нет в БД';
            select id into author_o_id from author
                     where author.surname=add_book.surname_o and author.firstname=add_book.firstname_o;
                     if (author_o_id is null) then
                         select (max(id)::int+1) into author_o_id from author;
                         insert into author(id, firstname, surname) values
                             (author_o_id, add_book.firstname_o, add_book.surname_o);
                     end if;
            insert into book(isbn, name, year, edition, volume, l_code, orig_isbn, type, annotation) values
                (add_book.isbn_o, add_book.title_o, add_book.year_o, add_book.edition_o,
                add_book.volume,add_book.l_code_o, add_book.isbn_o, add_book.type,add_book.annotation_o);
            insert into author_book(a_i, b_i) values (author_o_id, add_book.isbn_o);
            insert into directory_book(d_n, b_i) values (add_book.genre, add_book.isbn_o);
        else
            raise notice 'Книга переведена, оригинал есть в БД';
        end if;
    else
        raise notice 'Оригинал книги.';
    end if;
    insert into book(isbn, name, year, edition, volume, l_code, orig_isbn, type, annotation) values
        (add_book.isbn, add_book.title, add_book.year, add_book.edition, add_book.volume,
        add_book.l_code, add_book.isbn_o, add_book.type, add_book.annotation);
    insert into author_book(a_i, b_i) values (author_id, add_book.isbn);
    insert into directory_book(d_n, b_i) values (add_book.genre, isbn);
    return isbn;
end;
$func$ language plpgsql;
