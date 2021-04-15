const { GraphQLNonNull, GraphQLObjectType, GraphQLInputObjectType, GraphQLList, GraphQLString, GraphQLInt} = require('graphql');
const sequelize = require('../db')
const { QueryTypes } = require('sequelize');

const DirectoryType = new GraphQLObjectType({
    name: 'directory',
    fields: () => {
        return{
            name: {
                type: GraphQLNonNull(GraphQLString),
                resolve(directory){
                    return directory.name
                }
            },
            parent_name: {
                type: GraphQLString,
                resolve(directory){
                    return directory.p_name
                }
            }
        }
    }
})

const BookType = new GraphQLObjectType({
    name: 'book',
    fields: () => {
        return {
            isbn: {
                type: GraphQLNonNull(GraphQLString),
                resolve(book) {
                    return book.isbn;
                }
            },
            name: {
                type: GraphQLNonNull(GraphQLString),
                resolve(book) {
                    return book.name;
                }
            },
            year: {
                type: GraphQLNonNull(GraphQLInt),
                resolve(book) {
                    return book.year;
                }
            },
            edition: {
                type: GraphQLNonNull(GraphQLString),
                resolve(book) {
                    return book.edition;
                }
            },
            volume: {
                type: GraphQLInt,
                resolve(book) {
                    return book.volume;
                }
            },
            l_code: {
                type: GraphQLNonNull(GraphQLInt),
                resolve(book) {
                    return book.l_code;
                }
            },
            orig_isbn: {
                type: GraphQLString,
                resolve(book) {
                    return book.orig_isbn;
                }
            },
            annotation: {
                type: GraphQLString,
                resolve(book) {
                    return book.annotation;
                }
            },
            type: {
                type: GraphQLNonNull(GraphQLString),
                resolve(book) {
                    return book.type;
                }
            },
            authors: {
                type: GraphQLList(AuthorType),
                resolve(parent) {
                    return sequelize.models.author.findAll({
                        include: [{
                            model: sequelize.models.book,
                            where: { isbn: parent.isbn },
                        }]
                    })
                },
            },
            categories: {
                type: GraphQLList(GraphQLString),
                resolve(parent) {
                    return sequelize.query(`select all_category('${parent.isbn}') as name;`,
                        { type: QueryTypes.SELECT, raw:true, attributes: ['name']  }).then(
                            categories => categories.map(categories => categories.name)
                    )
                },
            },
        }
    }
})

const AuthorType = new GraphQLObjectType({
    name: 'author',
    fields: () => {
        return {
            id: {
                type: GraphQLNonNull(GraphQLString),
                resolve(author) {
                    return author.id;
                }
            },
            surname: {
                type: GraphQLNonNull(GraphQLString),
                resolve(author) {
                    return author.surname;
                }
            },
            firstname: {
                type: GraphQLNonNull(GraphQLString),
                resolve(author) {
                    return author.firstname;
                }
            },
            books: {
                type: GraphQLList(BookType),
                resolve(parent) {
                    return sequelize.models.book.findAll({
                        include: [{
                            model: sequelize.models.author,
                            where: { id: parent.id },
                        }]
                    })
                },
            },
        }
    }
})

const AuthorInputType = new GraphQLInputObjectType({
    name: 'authorInput',
    fields: () => ({
            surname: {
                type: GraphQLNonNull(GraphQLString),
            },
            firstname: {
                type: GraphQLNonNull(GraphQLString),
            },
        }
    )
})

module.exports = {AuthorType, BookType, DirectoryType, AuthorInputType};