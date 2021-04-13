const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
    class directory extends Model {}

    directory.init({
        name: {
            type: DataTypes.STRING,
            primaryKey: true
        },
    }, {
        sequelize:sequelize,
        modelName:'directory',
        createdAt: false,
        updatedAt: false,
    });


};