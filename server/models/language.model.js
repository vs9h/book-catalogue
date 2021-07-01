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
        sequelize:sequelize,
        modelName:'language',
        createdAt: false,
        updatedAt: false,
    });
};

