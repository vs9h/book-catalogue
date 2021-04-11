delete from author_book;
delete from directory_book;
delete from book;
delete from author;
ALTER TABLE directory DISABLE TRIGGER USER;
delete from directory;
ALTER TABLE directory ENABLE TRIGGER USER;
delete from language;