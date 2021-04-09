create table language(
    code integer not null unique,
    name varchar(20) not null,
    primary key(code, name)
);
-- code - код языка
-- name - названия языка

create table book(
    isbn varchar(24) not null primary key,
    name varchar(20) not null,
    year integer not null check(year>=100 and year<=9999) ,
    edition varchar(20),
    volume integer,
    l_code integer references language(code) not null,
    orig_isbn varchar(24) references book(isbn),
    annotation varchar(400),
    type varchar(24) not null
);
-- name - название книги
-- year - год издания
-- edition - название издания
-- volume - номер тома (maybe null)
-- l_code - код языка
-- orig_isbn - isbn оригинальной книги (в случае если книга была переведена) (maybe null)
-- annotation - аннотация
-- type - тип книги, например: электронная, печатная. (Можно было бы сделать связь n:1)

create table author(
	id varchar(20) primary key,
	surname char(16) not null,
	firstname char(16) not null
);

-- Связь "author-book"
CREATE TABLE author_book (
    a_i varchar(20) references author(id),
    b_i varchar(24) references book(isbn),
    PRIMARY KEY(a_i, b_i)
);

create table directory(
    name varchar(24) primary key,
	p_name varchar(24) references directory(name)
);
-- p_name - имя родителя (директории) (maybe null)

-- Связь "directory-book"
create table directory_book(
	d_n varchar(24) references directory(name) not null,
	b_i varchar(24) references book(isbn) not null,
    PRIMARY KEY(d_n, b_i)
);
