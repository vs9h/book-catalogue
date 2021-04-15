require('dotenv').config();

const { createWriteStream, unlink } = require('fs');
const { ApolloServer } = require('apollo-server-koa');
const { graphqlUploadKoa } = require('graphql-upload');
const Koa = require('koa');
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const mkdirp = require('mkdirp');
const shortid = require('shortid');
const schema = require('./schema/schema');
const sequelize = require('./db.js')

const UPLOAD_DIR = '../server/uploads';
const db = lowdb(new FileSync('db.json'));

db.defaults({ uploads: [] }).write();
mkdirp.sync(UPLOAD_DIR)

const PORT = process.env.PORT || 5000;
const cors = require('cors')
const fileUpload = require('express-fileupload')

/**
 * Stores a GraphQL file upload. The file is stored in the filesystem and its
 * metadata is recorded in the DB.
 * @param {Promise<object>} upload GraphQL file upload.
 * @returns {Promise<object>} File metadata.
 */
async function storeUpload(upload) {
    const { createReadStream, filename, mimetype } = await upload;
    const stream = createReadStream();
    const id = shortid.generate();
    const path = `${UPLOAD_DIR}/${id}-${filename}`;
    const file = { id, filename, mimetype, path };

    // Store the file in the filesystem.
    await new Promise((resolve, reject) => {
        // Create a stream to which the upload will be written.
        const writeStream = createWriteStream(path);

        // When the upload is fully written, resolve the promise.
        writeStream.on('finish', resolve);

        // If there's an error writing the file, remove the partially written file
        // and reject the promise.
        writeStream.on('error', (error) => {
            unlink(path, () => {
                reject(error);
            });
        });

        // In Node.js <= v13, errors are not automatically propagated between piped
        // streams. If there is an error receiving the upload, destroy the write
        // stream with the corresponding error.
        stream.on('error', (error) => writeStream.destroy(error));

        // Pipe the upload into the write stream.
        stream.pipe(writeStream);
    });

    // Record the file metadata in the DB.
    db.get('uploads').push(file).write();

    return file;
}

const app = new Koa().use(
    graphqlUploadKoa({
        // Limits here should be stricter than config for surrounding
        // infrastructure such as Nginx so errors can be handled elegantly by
        // `graphql-upload`:
        // https://github.com/jaydenseric/graphql-upload#type-processrequestoptions
        maxFileSize: 10000000, // 10 MB
        maxFiles: 20,
    })
)

//const app = express();

new ApolloServer({
    // Disable the built in file upload implementation that uses an outdated
    // `graphql-upload` version, see:
    // https://github.com/apollographql/apollo-server/issues/3508#issuecomment-662371289
    uploads: false,
    schema,
    playground: true,
    context: { db, storeUpload },
}).applyMiddleware({ app });

// app.listen(PORT, (error) => {
//     if (error) throw error;
//
//     console.info(
//         `Serving http://localhost:${PORT} for ${process.env.NODE_ENV}.`
//     );
// });


app.use(fileUpload({}));
app.use(cors());

const start = async () => {
    try{
        await sequelize.authenticate();
        await sequelize.sync();
        //app.use('/api', graphqlHTTP({
        //    schema: schema,
        //    graphiql: true,
        //}));
        app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));

    }
    catch (e) {
        console.log(e);
    }
}

start();
