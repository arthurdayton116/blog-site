const AWS = require("aws-sdk");
const { gql, AuthenticationError } = require('apollo-server');
const uuid4 = require("uuid4")


const tablename = process.env.ddb_table_name || 'blog-site-comments'

const typeDef = gql`
extend type Query {
    """
    Returns a user object
    """
    user: User
}

    """
    This is an example user implementation and does not dynamically call data from a data source
    """
    type User {
          """
          User Name
          """
          name: String
          """
          The user ID
          """
          ID: String
          """
          An array of comments made by the user
          """
          Comments: [Comment]
    }

`;

// https://www.apollographql.com/docs/apollo-server/data/resolvers/#resolver-chains
const resolvers = {
    Query: {
        user: async (parent, args, context, info) => {
            console.log("##########################")
            console.log("User Being Called")
            console.log('user resolver args ', args)
            console.log("##########################")
            return {
                name: "Arthur",
                ID: "1"
            }
        }
    },
    User: {
        Comments(parent, args, context){
            console.log("##########################")
            console.log("User Comments Being Called")
            return comments_by_user(parent, args, context)}
    }
};

module.exports = { typeDef, resolvers }


const comments_by_user = async (parent, args, context) => {
    // TODO - add try catch
    // Show context object that is included via constructor in server definition
    console.log('comments_by_user parent', parent)

const local_params = {
    ExpressionAttributeValues: {
        ":okToShow": "true"
    },
    ExpressionAttributeNames:{
        "#okToShow": "okToShow"
    },
    KeyConditionExpression: "#okToShow = :okToShow",
    // FilterExpression: "#okToShow = :okToShow",
    ScanIndexForward: false,
    TableName: tablename,
    IndexName: 'oktoshow-timestamp-index'
}

const { Items } = await context.docClient.query(local_params).promise()
const return_arr = [];
Items.map((item) => {
    return_arr.push({
        postid: item.postid,
        timestamp: item.timestamp,
        comment: item.comment,
        name: item.name,
        CommentsTableHashKey: item.CommentsTableHashKey,
        okToShow: item.okToShow
    })
})
    console.log("##########################")
return return_arr;

}
