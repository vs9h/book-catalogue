const { Sequelize, Model, DataTypes } = require('sequelize')

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

class language extends Model {}

language.init({
    // Model attributes are defined here
    code: {
        type: DataTypes.INTEGER,
        primaryKey:true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
    }
}, {
    // Other model options go here
    sequelize, // We need to pass the connection instance
    modelName:'language', // We need to choose the model name
    createdAt: false,
    updatedAt: false,
});

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

language.hasOne(book, {
    foreignKey: {
        allowNull: false,
        name: 'l_code'
    }
})

class author extends Model {}

author.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize,
    modelName:'author',
    createdAt: false,
    updatedAt: false,
});

author.belongsToMany(book, { through: 'author_book', foreignKey: 'a_i' });
book.belongsToMany(author, { through: 'author_book', foreignKey: 'b_i' });

class directory extends Model {}

directory.init({
    name: {
        type: DataTypes.STRING,
        primaryKey: true
    },
}, {
    sequelize,
    modelName:'directory',
    createdAt: false,
    updatedAt: false,
});

directory.hasOne(directory, {
    foreignKey: {
        allowNull: true,
        name: 'p_name',
    }
})

directory.belongsToMany(book, { through: 'directory_book', foreignKey: 'd_n' });
book.belongsToMany(directory, { through: 'directory_book', foreignKey: 'b_i' });

module.exports = sequelize;