const { GraphQLNonNull, GraphQLID, GraphQLObjectType, GraphQLBoolean, GraphQLString, GraphQLInt, GraphQLList, } = require('graphql');
const { GraphQLUpload } = require('graphql-upload');
const FileType = require('./FileType');
const { DirectoryType, BookType, AuthorType, AuthorInputType } = require('./TypeDef');
const sequelize = require('../db');
const { QueryTypes } = require('sequelize')

module.exports = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => ({
        createCategory: {
            type: GraphQLNonNull(DirectoryType),
            args: {
                name: {
                    description: 'directory name to store.',
                    type: GraphQLNonNull(GraphQLString),
                },
                parent_name: {
                    type: GraphQLString,
                    defaultValue: null
                }
            },
            resolve(parent, args) {
                return sequelize.models.directory.create({
                    name: args.name,
                    p_name: args.parent_name
                })
            },
        },
        addAuthor: {
            type: AuthorType,
            args: {
                input: {type: new GraphQLNonNull(AuthorInputType)},
                force: {
                    type: GraphQLBoolean, defaultValue: false,
                    description: "add an author even if an author with the same name and surname is in the table"
                }
            },
            async resolve(parent, args) {
                let author_id = null;
                await sequelize.query(`select max(id::int+1) as max_id from author;`,
                    {type: QueryTypes.SELECT, raw: true, attributes: ['max_id']}).then(
                    id => author_id = id[0].max_id
                );
                if (args.force == true)
                    return sequelize.models.author.create({
                        id: author_id,
                        firstname: args.input.firstname,
                        surname: args.input.surname,
                    })
                else {
                    return await sequelize.models.author.findOne({
                        where: {firstname: args.input.firstname, surname: args.input.surname}
                    }).then(val => {
                        if (val != null) {
                            return null
                        } else {
                            return sequelize.models.author.create({
                                id: author_id,
                                firstname: args.input.firstname,
                                surname: args.input.surname,
                            })
                        }
                    }).catch(e => {
                        console.log("error");
                    });
                }
            },
        },
        deleteCategory: {
            type: GraphQLNonNull(GraphQLString),
            args: {
                name: {
                    type: GraphQLNonNull(GraphQLString)
                }
            },
            // TODO: Change return type;
            async resolve(parent, args) {
                let answer = null;
                try {
                    const dir = await sequelize.models.directory.findOne({where:{name:args.name}});
                    if (dir){
                        if (dir.destroy()) answer="success";
                        else answer = "can't destroy";
                        //console.log("dir = ",dir);
                    } else {
                        answer = 'not found';
                    }
                } catch (e) {
                    answer = "error";
                    console.log(e);
                }
                return answer;
            }
        },
        // TODO: check orig_isbn, check if book exists
        addBook: {
            type: BookType,
            args: {
                isbn: { type: GraphQLNonNull(GraphQLString)},
                title: { type: GraphQLNonNull(GraphQLString)},
                year: { type: GraphQLNonNull(GraphQLInt)},
                edition: { type: GraphQLNonNull(GraphQLString)},
                volume: { type: GraphQLInt, defaultValue: null},
                language: { type: GraphQLNonNull(GraphQLString)},
                orig_isbn: { type: GraphQLString, defaultValue: null},
                annotation: { type: GraphQLString, defaultValue: null},
                type: { type: GraphQLNonNull(GraphQLString)},
                authors: { type: new GraphQLList(AuthorInputType)},
                categories: { type: GraphQLNonNull(GraphQLList(GraphQLString))},
                image_id: { type: GraphQLID, defaultValue: null},
            },
            async resolve(parent, args) {
                let answer = null;
                try{
                    for (const author_source of args.authors) {
                        let author = await sequelize.models.author.findOne({
                                where: {firstname: author_source.firstname, surname: author_source.surname}
                        })
                            .then(val => { return val })
                            .catch(e => console.log(e))
                        if (author == null) {
                            let generated_id = await sequelize.query(`select max(id::int+1) as max_id from author;`,
                                    {type: QueryTypes.SELECT, raw: true, attributes: ['max_id']})
                                .then(id => {return id[0].max_id})
                                .catch(e => {console.log(e)})
                            author = sequelize.models.author.create({
                                id: generated_id,
                                firstname: author_source.firstname,
                                surname: author_source.surname} )
                        } else console.log('author founded')
                    }
                    let language_code = await sequelize.query(` select code from language where name='${args.language.toLowerCase()}';`,
                        {type: QueryTypes.SELECT, raw: true, attributes: ['code']}).then(
                        l_code => {return l_code[0].code;}
                    );
                    answer = await sequelize.models.book.create({
                        isbn: args.isbn,
                        name: args.title,
                        year: args.year,
                        edition: args.edition,
                        volume: args.volume,
                        l_code: language_code,
                        orig_isbn: args.orig_isbn,
                        annotation: args.annotation,
                        type: args.type
                    })
                    for (const author_source of args.authors) {
                        let author = await sequelize.models.author.findOne({
                            where: {firstname: author_source.firstname, surname: author_source.surname}
                        })
                            .then(val => { return val })
                            .catch(e => console.log(e))
                        await sequelize.models.author_book.create({ a_i: author.id, b_i: args.isbn  });
                    }
                    for (const cat of args.categories) {
                        await sequelize.models.directory_book.create({ d_n: cat, b_i: args.isbn });
                    }
                } catch (e) {
                    answer = null;
                    console.log(e);
                }
                return answer;
            }
        },
        deleteBook: {
            type: GraphQLNonNull(GraphQLString),
            args: {
                isbn: {
                    type: GraphQLNonNull(GraphQLString)
                }
            },
            // TODO: Change return type;
            async resolve(parent, args) {
                let answer = null;
                try {
                    // Необходимо удалить авторов для книги
                    await sequelize.models.author_book.destroy({ where: {b_i:args.isbn }});
                    // Необходимо удалить директории для книги
                    await sequelize.models.directory_book.destroy({ where: {b_i:args.isbn }});
                    // Необходимо удалить информацию о книге
                    const dir = await sequelize.models.book.findOne({where:{isbn:args.isbn}});
                    if (dir){
                        if (dir.destroy()) answer="success";
                        else answer = "can't destroy";
                    } else {
                        answer = 'not found';
                    }
                } catch (e) {
                    answer = "error";
                    console.log(e);
                }
                return answer;
            }
        },
        singleUpload: {
            description: 'Stores a single file.',
            type: GraphQLNonNull(FileType),
            args: {
                file: {
                    description: 'File to store.',
                    type: GraphQLNonNull(GraphQLUpload),
                },
            },
            resolve: (parent, { file }, { storeUpload }) => storeUpload(file),
    }
})
})



// multipleUpload: {
//     description: 'Stores multiple files.',
//     type: GraphQLNonNull(GraphQLList(GraphQLNonNull(FileType))),
//     args: {
//         files: {
//             description: 'Files to store.',
//             type: GraphQLNonNull(GraphQLList(GraphQLNonNull(GraphQLUpload))),
//         },
//     },
//     async resolve(parent, { files }, { storeUpload }) {
//         // Ensure an error storing one upload doesn’t prevent storing the rest.
//         const results = await Promise.allSettled(files.map(storeUpload));
//         return results.reduce((storedFiles, { value, reason }) => {
//             if (value) storedFiles.push(value);
//             // Realistically you would do more than just log an error.
//             else console.error(`Failed to store upload: ${reason}`);
//             return storedFiles;
//         }, []);
//     },
// },