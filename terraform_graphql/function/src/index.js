const { startApolloServer, resolvers,typeDefs }  = require('./app.js')

port = process.env.GRAPHQL_PORT || 4000
startApolloServer(typeDefs, resolvers, port);
