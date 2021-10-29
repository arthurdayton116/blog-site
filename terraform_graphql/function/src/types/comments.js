const { gql } = require('apollo-server');
const uuid4 = require("uuid4")
const { docClientSetup } = require('../dbsetup.js')

docClient = docClientSetup()

const tablename = process.env.ddb_table_name || 'blog-site-comments'

const typeDef = `
extend type Query {
    comment: Comment
    comments: [Comment]!
}

 type Comment {
      postid: String
      timestamp: String
      comment: String
      name: String
      CommentsTableHashKey: String
  }
  
  type Mutation {
      addComment(comment: NewComment) : Comment
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
            console.log('comments resolver')
            const local_params = {
                ExpressionAttributeValues: {
                    ":postid": "9999"
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
        addComment:  (parent, args, context, info) => {
            //TODO - add env variables to handle this
            var params = {
                TableName: tablename,
                Item: {
                    'CommentsTableHashKey': uuid4(),
                    'comment': 'STRING_VALUE',
                    'name': 'graphql',
                    'postid': '100',
                    'timestamp': '2021-10-06'
                },
                ReturnValues: "ALL_OLD"
            };

            docClient.put(params, function(err, data) {
                if (err) {
                    console.log("Error", err);
                } else {
                    console.log("PUT Success", data);
                }
            });

            console.log("args", args)
            return {
                postid: args.comment.postid,
                timestamp: args.comment.timestamp,
                comment: args.comment.comment,
                name: args.comment.name
            }
        },
    },
};

module.exports = { typeDef, resolvers }


