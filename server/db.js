const { Sequelize, DataTypes } = require('sequelize')
const { applyExtraSetup } = require('./extra-setup');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        define: {
            freezeTableName: true
        }
    }
)

const modelDefiners = [
    require('./models/language.model'),
    require('./models/author.model'),
    require('./models/directory.model'),
    require('./models/book.model'),
];

for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize);
}

applyExtraSetup(sequelize);

module.exports = sequelize;