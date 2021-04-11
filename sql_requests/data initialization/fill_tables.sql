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
    (null,'art'),
    ('art', 'handbook'),
    ('handbook', 'computer handbook'),
    ('computer handbook', 'programming'),
    ('handbook', 'household handbook'),
    ('art', 'detective'),
    ('art', 'fantasy'),
    ('fantasy','heroic fantasy'),
    ('art', 'poetry'),
    ('art', 'novel'),
    ('art', 'historical genre'),
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
    (2, 'Jonathan', 'Stroud'),
    (3, 'John','Steinbeck');

insert into book(isbn, name, year, edition, volume, l_code, orig_isbn, type, annotation) values
    ('978-5-9922-1030-9','Верховная Ведьма',2004,'Альфа-книга',null,7,null, 'electronic book',
    'Третья книга цикла о Вольхе завершает историю ее приключений. Ведьма собирается замуж за вампира. Вот только не предсвадебными хлопотами занята невеста. Ей предстоит написать диссертацию, чтобы получить звание магистра.'),
    ('0-552-55273-9','The Golem Eye',2004,'Miramax',null,3,null,  'electronic book',
    'The second adventure in the Bartimaeus trilogy finds our young apprentice magician Nathaniel working his way up the ranks of the government, when crisis hits.'),
    ('978-5-6999-4925-0','Глаз голема',2017,'Эксмо',null,7,'0-552-55273-9','electronic book',
    'Хорошо быть молодым и талантливым волшебником. Волшебников в Британской империи уважают.'),
    ('978-0-140-2816-20','The Grapes of Wrath',1939,'Viking Press',null,3,null,'printed book',
    'The Pulitzer Prize-winning epic of the Great Depression, a book that galvanized—and sometimes outraged—millions of readers. Nominated as one of America’s best-loved novels by PBS’s The Great American Read'),
    ('978-5-389-06635-9','Гроздья гнева',2013,'Азбука-Аттикус',null,7,'978-0-140-2816-20','printed book',
    'Во время Великой депрессии семья разоренных фермеров вынуждена покинуть свой дом в Оклахоме. По знаменитой «Road 66» через всю Америку, как и миллионы других безработных, они едут, идут и даже ползут на запад, в вожделенную Калифорнию. Но что их там ждет? И есть ли хоть какая-то надежда на светлое будущее?'),
    ('978-0-140-1863-90','East of Eden',1952,'Viking Press',1,3,null,'printed book',
    'East of Eden brings to life the intricate details of two families, the Trasks and the Hamiltons, and their interwoven stories. The Hamilton family in the novel is said to be based on the real-life family of Samuel Hamilton, Steinbeck maternal grandfather.'),
    ('978-5-17-102580-9','К востоку от Эдема',2015,'Издательство АСТ',1,7,'978-0-140-1863-90','printed book',
    'Шедевр «позднего» Джона Стейнбека. «Все, что я написал ранее, в известном смысле было лишь подготовкой к созданию этого романа», – говорил писатель о своем произведении.'),
    ('978-5-17-102581-9','К востоку от Эдема (h)',2017,'Издательство АСТ',2,5,'978-0-140-1863-90','printed book',
    'Шедевр «позднего» Джона Стейнбека 2. «Все, что я написал ранее, в известном смысле было лишь подготовкой к созданию этого романа», – говорил писатель о своем произведении.');


insert into author_book (a_i, b_i) values
    (1, '978-5-9922-1030-9'),
    (2, '978-5-9922-1030-9'),
    (2, '0-552-55273-9'),
    (2, '978-5-6999-4925-0'),
    (3, '978-0-140-2816-20'),
    (3, '978-5-389-06635-9'),
    (3, '978-0-140-1863-90'),
    (3, '978-5-17-102580-9'),
    (3, '978-5-17-102581-9');

insert into directory_book(d_n, b_i) values
    ('programming', '978-5-9922-1030-9'),
    ('heroic fantasy', '978-5-9922-1030-9'),
    ('fantasy', '0-552-55273-9'),
    ('novel', '978-0-140-2816-20'),
    ('historical genre', '978-0-140-2816-20'),
    ('novel', '978-5-389-06635-9'),
    ('historical genre', '978-5-389-06635-9'),
    ('novel', '978-0-140-1863-90'),
    ('novel', '978-5-17-102580-9'),
    ('novel', '978-5-17-102581-9');
