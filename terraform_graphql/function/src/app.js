const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const express = require( 'express');
const http = require( 'http');
const resolvers = require( './resolvers');
const typeDefs = require('./schema');
const app = express();
const httpServer = http.createServer(app);

async function startApolloServer(typeDefs, resolvers, port) {

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    });
    await server.start();
    server.applyMiddleware({ app });

    await new Promise(resolve => httpServer.listen({ port: port }, resolve));

    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);

    return server;
}

module.exports = { startApolloServer, typeDefs, resolvers, httpServer };

