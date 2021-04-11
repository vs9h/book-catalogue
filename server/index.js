require('dotenv').config();
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const sequelize = require('./db.js')
const schema = require('./schema/schema');
const PORT = process.env.PORT || 5000;

const app = express();

const start = async () => {
    try{
        await sequelize.authenticate();
        await sequelize.sync();
        app.use('/api', graphqlHTTP({
            schema: schema,
            graphiql: true,
        }));
        app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
    }
    catch (e) {
        console.log(e);
    }
}

start();
