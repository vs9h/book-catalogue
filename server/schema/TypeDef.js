const { GraphQLNonNull, GraphQLObjectType, GraphQLInputObjectType, GraphQLList, GraphQLString, GraphQLInt} = require('graphql');
const sequelize = require('../db')
const { QueryTypes } = require('sequelize');
const FileType = require('./FileType');

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
                type: GraphQLNonNull(GraphQLString)
            },
            name: {
                type: GraphQLNonNull(GraphQLString),
            },
            year: {
                type: GraphQLNonNull(GraphQLInt),
            },
            edition: {
                type: GraphQLNonNull(GraphQLString),
            },
            volume: {
                type: GraphQLInt,
            },
            l_code: {
                type: GraphQLNonNull(GraphQLInt),
            },
            orig_isbn: {
                type: GraphQLString,
            },
            annotation: {
                type: GraphQLString,
            },
            type: {
                type: GraphQLNonNull(GraphQLString),
            },
            authors: {
                type: GraphQLList(AuthorType),
                resolve(book) {
                    return sequelize.models.author.findAll({
                        include: [{
                            model: sequelize.models.book,
                            where: { isbn: book.isbn },
                        }]
                    })
                },
            },
            categories: {
                type: GraphQLList(GraphQLString),
                resolve(book) {
                    return sequelize.query(`select all_category('${book.isbn}') as name;`,
                        { type: QueryTypes.SELECT, raw:true, attributes: ['name']  }).then(
                            categories => categories.map(categories => categories.name)
                    )
                },
            },
            image: {
                type: FileType,
                resolve(book ,args,{db}) {
                    return db.get('uploads')
                        .find({ id: book.image_id })
                        .value();
                },
            }
        }
    }
})

    const AuthorType = new GraphQLObjectType({
        name: 'author',
        fields: () => {
            return {
                id: { type: GraphQLNonNull(GraphQLString) },
                surname: { type: GraphQLNonNull(GraphQLString) },
                firstname: { type: GraphQLNonNull(GraphQLString) },
                books: {
                    type: GraphQLList(BookType),
                    resolve(author) {
                        // sequelize.models.book.findAll({
                        //     include: [{
                        //         model: sequelize.models.author,
                        //     }]
                        // }).then(value => console.log(value));
                        return sequelize.models.book.findAll({
                            include: [{
                                model: sequelize.models.author,
                                where: { id: author.id },
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