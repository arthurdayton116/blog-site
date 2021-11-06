const dotenv = require('dotenv')
const dotenvExpand = require('dotenv-expand')
const myEnv = dotenv.config()
dotenvExpand(myEnv)
const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const express = require( 'express');
const http = require( 'http');
const app = express();
const httpServer = http.createServer(app);
const schema = require('./schema');
const jwtVerifier = require('./jwtVerifier')

async function startApolloServer(schema, port) {

    const server = new ApolloServer({
        schema,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
        context: ({ req }) => ({
            jwtVerifier: () => jwtVerifier(req),
            authScope: req.headers.authorization
        }),
    });
    await server.start();
    server.applyMiddleware({ app });

    await new Promise(resolve => httpServer.listen({ port: port }, resolve));

    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);

    return server;
}

module.exports = { startApolloServer, schema };

