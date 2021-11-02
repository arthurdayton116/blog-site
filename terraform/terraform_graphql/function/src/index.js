// THIS FILE IS FOR LOCAL DEVELOPMENT
const { startApolloServer, schema }  = require('./app.js')

port = process.env.GRAPHQL_PORT || 4000
startApolloServer(schema, port);
