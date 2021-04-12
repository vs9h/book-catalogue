### **Database for a book catalog**

In this project, Postgres selected as the DBMS.

### **Getting started:**

Use psql client (manually):

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
 
You can also find examples of sql database queries in ``database/sql_queries.sql``

### **Server side for a book catalog (in developing)**

The server side of the application will be written using Node.js, GraphQL and Sequelize

Other libraries used in the project can be found in ``server/package.json``.

### **Client side for a book catalog (in developing)**

The client side of the application will be written using TypeScript, React.js, GraphQL and MobX.
