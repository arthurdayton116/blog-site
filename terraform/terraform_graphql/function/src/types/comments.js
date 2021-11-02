const AWS = require("aws-sdk");
const { gql } = require('apollo-server');
const uuid4 = require("uuid4")
const { docClientSetup } = require('./dbSetup.js')

docClient = docClientSetup()

const tablename = process.env.ddb_table_name || 'blog-site-comments'

const typeDef = `
extend type Query {
    comment: Comment
    comments(postid: String!): [Comment]!
}

 type Comment {
      postid: String
      timestamp: String
      comment: String
      name: String
      CommentsTableHashKey: String
  }
  
  type Mutation {
      addComment(comment: NewComment!) : Comment
  }
  
input NewComment {
  postid: String
  timestamp: String
  comment: String
  name: String
}
`;

const resolvers = {
    Query: {
        comments: async (parent, args, context, info) => {
            console.log('comments resolver',args )
            const postID = args.postid
            const local_params = {
                ExpressionAttributeValues: {
                    ":postid": postID
                },
                KeyConditionExpression: "#postid = :postid",
                ExpressionAttributeNames:{
                    "#postid": "postid"
                },
                TableName: tablename,
                IndexName: 'postid-timestamp-index'
            }

            const { Items } = await docClient.query(local_params).promise()
            const return_arr = [];
            Items.map((item) => {
                return_arr.push({
                    postid: item.postid,
                    timestamp: item.timestamp,
                    comment: item.comment,
                    name: item.name,
                    CommentsTableHashKey: item.CommentsTableHashKey
                })
            })
            return return_arr;

        },
        comment: async () => {
            const local_params = {
                TableName: tablename,
                Key: {'CommentsTableHashKey': hashkey}
            };

            const { Item } = await docClient.get(local_params).promise()

                   console.log("Item", Item)
                    return {
                        postid: "1",
                        timestamp: Item.timestamp,
                        comment: Item.comment,
                        name: Item.name,
                        CommentsTableHashKey: Item.CommentsTableHashKey
                    }
        },
    },
    Mutation: {
        addComment:  async (parent, args, context, info) => {
            //TODO - add env variables to handle this
            const HKEY =uuid4();
            var params = {
                TableName: tablename,
                Item: {
                    'CommentsTableHashKey': HKEY,
                    'comment': args.comment.comment,
                    'name': args.comment.name,
                    'postid': args.comment.postid,
                    'timestamp': new Date().toISOString()
                }
            };

            await docClient.put(params).promise();

            const {Item} = await docClient.get({TableName: tablename, Key: {CommentsTableHashKey: HKEY}}).promise();

            var sns = new AWS.SNS();

            var params = {
                Message: Item,
                Subject: "Comment Posted on Item.postid",
                TopicArn: process.env.REACT_APP_SNS_ARN || ""
            };
            sns.publish(params, context.done);

            console.log("args", args)
            console.log("Item", Item)

            return {
                postid: Item.postid,
                timestamp: Item.timestamp,
                comment: Item.comment,
                name: Item.name,
                CommentsTableHashKey: Item.CommentsTableHashKey
            }
        },
    },
};

module.exports = { typeDef, resolvers }


