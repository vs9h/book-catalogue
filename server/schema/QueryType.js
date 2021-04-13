const { GraphQLNonNull, GraphQLObjectType, GraphQLList, GraphQLString, GraphQLInt, GraphQLID, GraphQLSchema} = require('graphql');
const sequelize = require('../db')
const FileType = require('./FileType')
const { BookType } = require('./TypeDef')
const { AuthorType } = require('./TypeDef')
const { QueryTypes } = require('sequelize')

module.exports = new GraphQLObjectType({
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
            description: 'Returns all books (you can pass firstname/surname/firstname&surname/nothing)',
            args: {
                limit: {type: GraphQLInt, defaultValue: 16 },
                firstname: {type: GraphQLString, defaultValue: null},
                surname: {type: GraphQLString, defaultValue: null},
            },
            resolve(root, args) {
                if (!args.firstname && !args.surname)
                    return sequelize.models.book.findAll({limit: args.limit });
                if (args.firstname && args.surname)
                    return sequelize.models.book.findAll({
                        limit: args.limit,
                        include: [{
                            model: sequelize.models.author,
                            where: { firstname: args.firstname, surname: args.surname },
                        }]
                    });
                if (args.surname)
                    return sequelize.models.book.findAll({
                        limit: args.limit,
                        include: [{
                            model: sequelize.models.author,
                            where: { surname: args.surname },
                        }]
                    });
                    //return sequelize.models.book.findAll({limit: args.limit, where: { surname:args.surname, firstname:args.firstname} });
                if (args.firstname)
                    return sequelize.models.book.findAll({
                        limit: args.limit,
                        include: [{
                            model: sequelize.models.author,
                            where: { firstname: args.firstname },
                        }]
                    });
                    // sequelize.models.book.findAll({limit: args.limit, where: { firstname:args.firstname}  });
                //return sequelize.models.book.findAll({limit: args.limit, where: {surname:args.surname} });
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
        },
        uploads: {
            description: 'All stored files.',
            type: GraphQLNonNull(GraphQLList(GraphQLNonNull(FileType))),
            resolve: (source, args, { db }) => db.get('uploads').value(),
        },
        allCategories: {
            type: GraphQLList(GraphQLString),
                resolve() {
                    return sequelize.query("select name from directory",
                        { type: QueryTypes.SELECT, raw:true, attributes: ['name']  }).then(
                        categories => categories.map(categories => categories.name)
                    )
            },
        }
    })
})
