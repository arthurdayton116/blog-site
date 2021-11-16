// THIS FILE IS FOR LOCAL DEVELOPMENT
const dotenv = require('dotenv')
const dotenvExpand = require('dotenv-expand')
const myEnv = dotenv.config()
dotenvExpand(myEnv)

const { startApolloServer, schema }  = require('./app.js')

port = process.env.GRAPHQL_PORT || 4000
startApolloServer(schema, port);


