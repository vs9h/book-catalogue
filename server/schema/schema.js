
const { GraphQLObjectType, GraphQLList, GraphQLString, GraphQLInt} = require('graphql');
const sequelize = require('../db')
const graphql = require('graphql')
const {GraphQLNonNull} = require("graphql");

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
            }
        }
    }
})

const QueryRoot = new graphql.GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        hello: {
            type: graphql.GraphQLString,
            resolve: () => "Hello world!"
        },
        book: {
            type: new GraphQLList(BookType),
            args: {
                isbn: {
                    type: GraphQLString
                }
            },
            //validations can go here
            resolve(root, args) {
               return sequelize.models.book.findAll({ where: args })
            }
        }
    })
})

const schema = new graphql.GraphQLSchema({ query: QueryRoot });

module.exports = schema;