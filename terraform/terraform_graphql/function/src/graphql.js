// THIS FILE IS FOR LAMBDA
// SEE app.js for local version

const { ApolloServer } = require('apollo-server-lambda');
const { schema }  = require('./app.js')
const jwtVerifier = require('./jwtVerifier')
const { docClientSetup } = require('./types/dbSetup.js')


const apolloHandler = async () => {
            // Create a client for dynamoDB
            const docClient = await docClientSetup();
            // Create graphql server
            const server = new ApolloServer({
                schema,
                context: ({ event, context, express }) => {

                    return ({
                        jwtVerifier: () => jwtVerifier(express.req),
                        docClient: docClient,
                        headers: event.headers,
                        functionName: context.functionName,
                        event,
                        context,
                        req: express.req,
                    })},
            });
            return server.createHandler();
}

// Create asynchronous handler so we can instantiate database client and include in context
// https://github.com/apollographql/apollo-server/issues/1989
exports.graphqlHandler = (event, context, callback) => {
    return apolloHandler().then(handler => handler(event, context, callback));
};
