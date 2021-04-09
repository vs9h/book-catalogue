insert into language(code, name) values
    (1,'chinese'),
    (2,'spain'),
    (3,'english'),
    (4,'bengal'),
    (5,'hindi'),
    (6,'portuguese'),
    (7,'russian'),
    (8,'japanese'),
    (9,'german'),
    (10,'javanese'),
    (11,'korean'),
    (12,'french'),
    (13,'vietnamese'),
    (14,'telugu'),
    (15,'marathi'),
    (16,'tamil'),
    (17,'turkish'),
    (18,'urdu');

insert into directory(p_name,name) values
    (null, 'handbook'),
    ('handbook', 'computer handbook'),
    ('computer handbook', 'programming'),
    ('handbook', 'household handbook'),
    (null,'art'),
    ('art', 'detective'),
    ('art', 'fantasy'),
    ('fantasy','heroic fantasy'),
    ('art', 'poetry'),
    (null, 'home, hobby'),
    ('home, hobby', 'Pets'),
    ('home, hobby', 'Cooking'),
    ('home, hobby', 'Housekeeping'),
    ('home, hobby', 'Entertainment'),
    ('home, hobby', 'Hobbies and crafts'),
    ('home, hobby', 'Do it yourself'),
    ('home, hobby', 'Cars and traffic rules'),
    ('home, hobby', 'Garden');

insert into author(id, firstname, surname) values
    (1, 'Ольга', 'Громыко'),
    (2, 'Джонатан', 'Страуд'),
    (3, 'Джон','Стейнбек');

insert into book(isbn, name, year, edition, volume, l_code, orig_isbn, type, annotation) values
    ('978-5-9922-1030-9','Верховная Ведьма',2004,'Альфа-книга',null,7,null, 'electronic book',
    'Третья книга цикла о Вольхе завершает историю ее приключений. Ведьма собирается замуж за вампира. Вот только не предсвадебными хлопотами занята невеста. Ей предстоит написать диссертацию, чтобы получить звание магистра.'),
    ('0-552-55273-9','The Golem Eye',2004,'Альфа-книга',null,3,null,  'electronic book',
    'The Golem Eye is a children novel of alternate history, fantasy and magic.'),
    ('978-5-6999-4925-0','Глаз голема',2017,'Эксмо',null,7,'0-552-55273-9','electronic book',
    'Хорошо быть молодым и талантливым волшебником. Волшебников в Британской империи уважают.');

insert into author_book (a_i, b_i) values
    (1, '978-5-9922-1030-9'),
    (2, '0-552-55273-9'),
    (2, '978-5-6999-4925-0');

insert into directory_book(d_n, b_i) values
    ('fantasy', '978-5-9922-1030-9'),
    ('heroic fantasy', '978-5-9922-1030-9'),
    ('fantasy', '0-552-55273-9');
