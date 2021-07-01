const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {


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
        sequelize: sequelize,
        modelName:'author',
        createdAt: false,
        updatedAt: false,
    });


};

