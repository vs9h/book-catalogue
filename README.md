### **Database for a book catalog using Postgres**.

### **Getting started:**

Use psql client:

1) Create database 'catalogue';
2) Open terminal window, and type:
   
   ``sudo -i -u postgres;``
   
   ``psql catalogue;``
3) Create tables: 
``create_tables.sql``
   
4) Load data for tables: ``fill_tables.sql``

5) Create function and procedures:
``f_1.sql, f_2.sql, f_3.sql``
   
6) Create triggers: ``t_1.sql, t_2.sql``
 
You can also find examples of sql database queries in ``sql_requests/sql_queries.sql``