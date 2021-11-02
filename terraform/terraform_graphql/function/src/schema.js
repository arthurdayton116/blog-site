const { gql } = require('apollo-server');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { merge } = require('lodash');

const { typeDef: CommentsTypes, resolvers: CommentsResolvers} = require('./types/comments.js');


// These are base types that I don't want to break out into own files - START
const Query = `
  type Query {
      hello: String
      checkContext: CheckContext
  }
`;

const baseTypeDefs = gql`
  type Query {
      hello: String
      checkContext: CheckContext
  }
  
  type CheckContext {
      functionName: String
      functionVersion: String
      invokedFunctionArn: String
      memoryLimitInMB: String
      awsRequestId: String
      logGroupName: String
      logStreamName: String
  }
`;

const baseResolvers = {
    Query: {
        hello: () => "It Works! Dammit",
        // https://docs.aws.amazon.com/lambda/latest/dg/nodejs-context.html
        checkContext: (parent, args, context, info) => {
            console.log(parent)
            console.log(args)
            console.log(context)
            console.log(info)
            return {
                functionName: context.functionName,
                functionVersion: context.context.functionVersion,
                invokedFunctionArn: context.context.invokedFunctionArn,
                memoryLimitInMB: context.context.memoryLimitInMB,
                awsRequestId: context.context.awsRequestId,
                logGroupName: context.context.logGroupName,
                logStreamName: context.context.logStreamName
            }
        }
    }
};
// These are base types that I don't want to break out into own files - END

// This combines types into one schema
const schema =makeExecutableSchema({
    typeDefs: [
        Query,
        CommentsTypes,
        baseTypeDefs ],
    resolvers: merge(
        baseResolvers,
        CommentsResolvers
    )
});

module.exports = schema;
