// THIS FILE IS FOR STARTING GRAPHQL LOCALLY AND TEST ENVIRONMENTS
// SEE graphql.js for Lambda version

const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const express = require( 'express');
const http = require( 'http');
const app = express();
const httpServer = http.createServer(app);
const schema = require('./schema');
const jwtVerifier = require('./jwtVerifier')
const { docClientSetup } = require('./types/dbSetup.js')


async function startApolloServer(schema, port) {

    const docClient = await docClientSetup();

    const server = new ApolloServer({
        schema,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
        context: ({ req }) => ({
            jwtVerifier: () => jwtVerifier(req),
            docClient: docClient,
            // authScope: req.headers.authorization
        }),
    });

    // starts graphql server
    await server.start();
    // use express
    server.applyMiddleware({ app });

    await new Promise(resolve => httpServer.listen({ port: port }, resolve));

    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);

    return server;
}

module.exports = { startApolloServer, schema };

