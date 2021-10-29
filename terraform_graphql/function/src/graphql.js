// THIS FILE IS FOR LAMBDA
const { ApolloServer } = require('apollo-server-lambda');
const schema = require('./schema');

const server = new ApolloServer({
    schema,
    context: ({ event, context, express }) => ({
        headers: event.headers,
        functionName: context.functionName,
        event,
        context,
        expressRequest: express.req,
    }),
});

exports.graphqlHandler = server.createHandler();

