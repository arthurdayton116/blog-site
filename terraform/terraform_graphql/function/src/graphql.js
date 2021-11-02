// THIS FILE IS FOR LAMBDA
const { ApolloServer } = require('apollo-server-lambda');
const { schema }  = require('./app.js')

const server = new ApolloServer({
    schema,
    context: ({ event, context, express }) => {
        // console.log('EVENT LOG')
        // console.log(event)
        // console.log('CONTEXT LOG')
        // console.log(context)

        return ({
        headers: event.headers,
        functionName: context.functionName,
        event,
        context,
        expressRequest: express.req,
    })},
});

exports.graphqlHandler = server.createHandler();
