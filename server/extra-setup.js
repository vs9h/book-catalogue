function applyExtraSetup(sequelize) {

   const { book, author, directory } = sequelize.models;
   
   const { language } = sequelize.models;
   language.hasOne(book, {
        foreignKey: {
            allowNull: false,
            name: 'l_code'
        }
    })
    author.belongsToMany(book, { through: 'author_book', foreignKey: 'a_i' });
    book.belongsToMany(author, { through: 'author_book', foreignKey: 'b_i' });
    directory.hasOne(directory, {
        foreignKey: {
            allowNull: true,
            name: 'p_name',
        }
    })
    directory.belongsToMany(book, { through: 'directory_book', foreignKey: 'd_n' });
    book.belongsToMany(directory, { through: 'directory_book', foreignKey: 'b_i' });
}

module.exports = {applyExtraSetup};
