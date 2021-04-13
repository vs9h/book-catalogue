const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
    // sequelize.define('language', {
    //     // The following specification of the 'id' attribute could be omitted
    //     // since it is the default.
    //     code: {
    //         type: DataTypes.INTEGER,
    //         primaryKey:true,
    //     },
    //     name: {
    //         type: DataTypes.STRING,
    //         allowNull: false,
    //         unique:true,
    //     }
    // }, {
    //     modelName:'language', // We need to choose the model name
    //     createdAt: false,
    //     updatedAt: false,
    // });
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
        sequelize:sequelize, // We need to pass the connection instance
        modelName:'language', // We need to choose the model name
        createdAt: false,
        updatedAt: false,
    });
};