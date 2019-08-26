import { assign } from '@ctx-core/object';

const { graphqlUploadExpress } = require('graphql-upload');
const { ApolloServer } = require('apollo-server-express');
const graphql_upload__express = graphqlUploadExpress();
async function graphql_upload__polka(req, res, next) {
    const { headers } = req;
    req.is || (req.is = content_type__ => {
        return (headers['content-type']
            && headers['content-type'].indexOf(content_type__) > -1);
    });
    await new Promise(async (resolve, reject) => {
        graphql_upload__express(req, res, e => e ? reject(e) : resolve());
    });
    next();
}
/**
 *
 * @param {string} path
 * @param {{}} app
 * @param {params__ApolloServer} params__ApolloServer
 * @returns {*}
 */
function use__ApolloServer__polka(path, app, params__ApolloServer) {
    app.use(path, graphql_upload__polka);
    const server = new ApolloServer(assign({ uploads: false }, params__ApolloServer));
    server.applyMiddleware({ app, path });
    return app;
}

export { graphql_upload__polka, use__ApolloServer__polka };
