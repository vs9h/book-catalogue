const { GraphQLNonNull, GraphQLObjectType, GraphQLList, GraphQLString, GraphQLInt} = require('graphql');
const sequelize = require('../db')
const graphql = require('graphql')

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
                type:  GraphQLNonNull(GraphQLInt),
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

const QueryRoot = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        book: {
            type: BookType,
            args: {
                isbn: {
                    type: GraphQLString
                }
            },
            resolve(root, args) {
               return sequelize.models.book.findByPk(args.isbn)
            }
        },
        allBooks: {
            type: GraphQLList(BookType),
            args: {
                limit: {type: GraphQLInt, defaultValue: 16 }
            },
            resolve(root, args) {
                return sequelize.models.book.findAll({limit: args.limit });
            }
        },
        author: {
            type: AuthorType,
            args: {
                id: {
                    type: GraphQLString,
                },
            },
            resolve(root, args) {
               return sequelize.models.author.findByPk(args.id)
            }
        },
        allAuthors: {
            type: GraphQLList(AuthorType),
            args: {
                limit: {type: GraphQLInt, defaultValue: 16 }
            },
            resolve(root, args) {
                return sequelize.models.author.findAll({limit: args.limit });
            }
        }
    })
})

const schema = new graphql.GraphQLSchema({ query: QueryRoot });

module.exports = schema;