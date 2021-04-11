const {Sequelize, Model, DataTypes} = require('sequelize')



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

class book extends Model {}

book.init({
    // Model attributes are defined here
    isbn: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min:100,
            max:9999
        }
    },
    edition: {
        type: DataTypes.STRING,
        allowNull: false
    },
    volume: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    l_code: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    orig_isbn: {
        type: DataTypes.STRING,
        allowNull: true
    },
    annotation: {
        type: DataTypes.STRING,
        allowNull: true
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName:'book', // We need to choose the model name
    createdAt: false,
    updatedAt: false,
});

module.exports = sequelize;

// const Book = sequelize.define('book', {
//     isbn: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true
//     },
//     name: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     year: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         validate: {
//             min:100,
//             max:9999
//         }
//     },
//     edition: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     volume: {
//         type: DataTypes.INTEGER,
//         allowNull: true
//     },
//     l_code: {
//         type: DataTypes.INTEGER,
//         allowNull: false
//     },
//     orig_isbn: {
//         type: DataTypes.STRING,
//         allowNull: true
//     },
//     annotation: {
//         type: DataTypes.STRING,
//         allowNull: true
//     },
//     type: {
//         type: DataTypes.STRING,
//         allowNull: false
//     }
// })

