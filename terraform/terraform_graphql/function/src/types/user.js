const AWS = require("aws-sdk");
const { gql, AuthenticationError } = require('apollo-server');
const uuid4 = require("uuid4")
const { docClientSetup } = require('./dbSetup.js')


docClient = docClientSetup()

const tablename = process.env.ddb_table_name || 'blog-site-comments'

const typeDef = `
extend type Query {
    user: User
}

 type User {
      postid: String
      timestamp: String
      comment: String
      name: String
      CommentsTableHashKey: String
      okToShow: String
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
                    ":postid": postID,
                    ":okToShow": "true"
                },
                KeyConditionExpression: "#postid = :postid",
                ExpressionAttributeNames:{
                    "#postid": "postid",
                    "#okToShow": "okToShow"
                },
                FilterExpression: "#okToShow = :okToShow",
                ScanIndexForward: false,
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
        unapprovedComments: async (parent, args, context, info) => {
            // TODO - add try catch
            // Show context object that is included via constructor in server definition
            console.log('unapprovedComments context', context)
            const authorizedToUse =  await context.jwtVerifier()

            // show expected claims object
            console.log('authorizedToUse',authorizedToUse)

            if (authorizedToUse === null  ) {
                throw new AuthenticationError('Not Authorized to Access');
            }
            const { GroupsAccess } = authorizedToUse;

            if (!GroupsAccess.includes('CommentApprover')) {
                console.log('does not include CommentApprover group')
                throw new AuthenticationError('Not Authorized to Access');
            }

            const local_params = {
                ExpressionAttributeValues: {
                    ":okToShow": "false"
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

            const { Items } = await docClient.query(local_params).promise()
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
                    'timestamp': new Date().toISOString(),
                    'okToShow': "false"
                }
            };

            await docClient.put(params).promise();

            const {Item} = await docClient.get({TableName: tablename, Key: {CommentsTableHashKey: HKEY}}).promise();

            // var sns = new AWS.SNS();

            var params = {
                Message: JSON.stringify(Item),
                Subject: "Comment Posted on Item.postid",
                TopicArn: process.env.SNS_ARN || ""
            };

            var publishTextPromise = new AWS.SNS({apiVersion: '2010-03-31'}).publish(params).promise();
            await publishTextPromise.then(
                function(data) {
                    console.log(`Message ${params.Message} sent to the topic ${params.TopicArn}`);
                    console.log("MessageID is " + data.MessageId);
                }).catch(
                function(err) {
                    console.error(err, err.stack);
                });

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


