// THIS FILE IS FOR LAMBDA
const { ApolloServer } = require('apollo-server-lambda');
const { schema }  = require('./app.js')
const jwtVerifier = require('./jwtVerifier')

const server = new ApolloServer({
    schema,
    context: ({ event, context, express }) => {
        // console.log('EVENT LOG')
        console.log('ApolloServer express.req', express.req)
        // console.log('CONTEXT LOG')
         console.log('ApolloServer context', context)

        return ({
            jwtVerifier: () => jwtVerifier(express.req),
        headers: event.headers,
        functionName: context.functionName,
        event,
        context,
        req: express.req,
    })},
});

exports.graphqlHandler = server.createHandler();
