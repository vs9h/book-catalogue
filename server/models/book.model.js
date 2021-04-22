const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
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
        },
        image_id: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    }, {
        // Other model options go here
        sequelize:sequelize, // We need to pass the connection instance
        modelName:'book', // We need to choose the model name
        createdAt: false,
        updatedAt: false,
    });
};
