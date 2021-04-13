const { GraphQLNonNull, GraphQLObjectType, GraphQLString } = require('graphql');
const { GraphQLUpload } = require('graphql-upload');
const FileType = require('./FileType');
const {DirectoryType} = require('./TypeDef');
const sequelize = require('../db');

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
            }
        },
        deleteCategory: {
            type: GraphQLNonNull(GraphQLString),
            args: {
                name: {
                    type: GraphQLNonNull(GraphQLString)
                }
            },
            async resolve(parent, args) {
                let answer = null;
                await sequelize.models.directory.findOne({where:{name:args.name}}).then((dir) => {
                    if (dir){
                        if (dir.destroy()) answer="success";
                        else answer = "can't destroy";
                    }
                    else answer = 'not found';
                }).catch(() => { answer = "error"; console.log('error') })
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
    }),
});



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