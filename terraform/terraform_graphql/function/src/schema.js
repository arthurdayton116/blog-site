const { gql } = require('apollo-server');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { merge } = require('lodash');

const { typeDef: CommentsTypes, resolvers: CommentsResolvers} = require('./types/comments.js');
const { typeDef: UtilityTypes, resolvers: UtilityResolvers} = require('./types/utilities.js');
const { typeDef: UserTypes, resolvers: UserResolvers} = require('./types/user.js');

// These are base types that I don't want to break out into own files - START
// const Query = `
//   """Basic type for fetching data"""
//   type Query {
//       hello: String
//       checkContext: CheckContext
//   }
// `;

// const Mutation = `
// """Basic type for modifying data"""
//     type Mutation {
//         hello: String
//     }
// `;

const baseTypeDefs = gql`
    """Basic type for fetching data"""  
  type Query {
        """A simple resolver to prove it works"""  
      hello: String
        """This is only used when deployed on Lambda to confirm it is working"""
      checkContext: CheckContext
  }
  """This is only used when deployed on Lambda to confirm it is working"""
  type CheckContext {
      """Name of Lambda function"""
      functionName: String
      """Version of Lambda function"""
      functionVersion: String
      """AWS ARN of Lambda function"""
      invokedFunctionArn: String
      """Memory setting of Lambda function"""
      memoryLimitInMB: String
      """I think this if from api gateway"""
      awsRequestId: String
      """Log group where function calls are logged"""
      logGroupName: String
      """Log stream where function calls are logged"""
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
        baseTypeDefs,
        UserTypes,
        CommentsTypes,
        UtilityTypes
         ],
    resolvers: merge(
        baseResolvers,
        UserResolvers,
        CommentsResolvers,
        UtilityResolvers
    )
});

module.exports = schema;
