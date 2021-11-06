// THIS FILE IS FOR LAMBDA
const { ApolloServer } = require('apollo-server-lambda');
const { schema }  = require('./app.js')
const jwtVerifier = require('./jwtVerifier')

const server = new ApolloServer({
    schema,
    context: ({ event, context, express }) => {
        // console.log('EVENT LOG')
        console.log('express.req', express.req)
        // console.log('CONTEXT LOG')
         console.log('context', context)

        return ({
        headers: event.headers,
        functionName: context.functionName,
        event,
        context,
        req: express.req,
            jwtVerifier: () => jwtVerifier(express.req),
    })},
});

exports.graphqlHandler = server.createHandler();
