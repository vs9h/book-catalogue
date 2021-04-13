# **Application for a book catalog**

This toy project was created to display a book catalog. 
And sets itself the following tasks: 

1. Initialize the database;

2. Create server;

3. Create web-client.

****
## DBMS for application

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
****

## **Server side for a book catalog**

The server side of the application is written using Node.js, GraphQL and Sequelize.

Other libraries used in the project can be found in ``server/package.json``.

### **Getting started:**

Use yarn (package manager):

- Clone repository;
- ``yarn`` to install all dependencies;
- Edit .env and apply your db connectivity settings;
- ``yarn dev`` to start the API server;
- GraphQL Playground now at ``http://localhost:5000/api``; (you can change PORT in .env)

****

## **Client side for a book catalog (is planned)**

The client side of the application will be written using TypeScript, React.js, GraphQL and MobX.
