const AWS = require("aws-sdk");
const { gql, AuthenticationError } = require('apollo-server');
// generates unique identifiers
const uuid4 = require("uuid4")

// The DynamoDB table name to use for queries
const tablename = process.env.ddb_table_name || 'blog-site-comments'

const typeDef = gql`
extend type Query {
    """
    Returns a single comment - :( need to fix
    """
    comment: Comment
    """
    Returns an array of comments based on postid that have been approved
    """
    comments(postid: String!): [Comment]!
    """
    Returns an array of comments that have not been approved - requires authentication
    """
    unapprovedComments: [Comment]!
}

 """A comment object"""
 type Comment {
      """The blog post id the comment is associated with """
      postid: String
      """ Time comment was made """
      timestamp: String
      """Comment text """
      comment: String
      """Name associated with comment """
      name: String
      """ Primary key of comment """
      CommentsTableHashKey: String
      """Flag for approved comments """
      okToShow: String
  }
  """Basic type for modifying data"""
  type Mutation {
      """Adds a new unapproved comment to DynamoDB"""   
      addComment(comment: NewComment!) : Comment
      """Creates test data when running tests"""
      setUpTest: Comment
  }
 """Input type used for submitting a new comment""" 
 input NewComment {
  """The blog post id the comment is associated with """
  postid: String
  """Time comment was made """
  timestamp: String
  """Comment text """
  comment: String
  """Name associated with comment """
  name: String
 }
`;

const resolvers = {
    Query: {
        comments: async (parent, args, context, info) => {
            console.log('comments resolver xxx',args )
            console.log('parent',parent )
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

            const { Items } = await context.docClient.query(local_params).promise()
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
            const authorizedToUse =  process.env.JWT_OVERRIDE || await context.jwtVerifier()

            // show expected claims object
            console.log('authorizedToUse',authorizedToUse)

            if (authorizedToUse === null  ) {
                throw new AuthenticationError('Not Authorized to Access');
            }
            const { GroupsAccess } = process.env.JWT_OVERRIDE ? {GroupsAccess:['CommentApprover']}: authorizedToUse;

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
            return return_arr;

        },
        comment: async () => {
            const local_params = {
                TableName: tablename,
                Key: {'CommentsTableHashKey': hashkey}
            };

            const { Item } = await context.docClient.get(local_params).promise()

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

            await context.docClient.put(params).promise();

            const {Item} = await context.docClient.get({TableName: tablename, Key: {CommentsTableHashKey: HKEY}}).promise();

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
        setUpTest: async (parent, args, context, info) => {
            console.log('FIRE setUpTest')

            const DDB_DATESTAMP = new Date().toISOString()
            const DDB_HASHKEY = uuid4()
            const DDB_HASHKEY2 = uuid4()
            const DDB_TABLE = 'blog-site-comments'
            const DDB_NAME = 'GraphQL Method'
            const DDB_POSTID = '9999'
            const DDB_COMMENT = 'This is a test comment'
            const DDB_OK_TO_SHOW = 'false'

            await context.docClient.put({TableName: DDB_TABLE,
                Item: {
                    CommentsTableHashKey: DDB_HASHKEY,
                    comment: DDB_COMMENT,
                    name: DDB_NAME,
                    postid: DDB_POSTID,
                    timestamp: DDB_DATESTAMP,
                    okToShow: DDB_OK_TO_SHOW
                }}).promise();

            console.log('FIRE put')
            const {Item} = await context.docClient.get({TableName: DDB_TABLE, Key: {CommentsTableHashKey: DDB_HASHKEY}}).promise();

            return {
                postid: Item.postid,
                timestamp: Item.timestamp,
                comment: Item.comment,
                name: Item.name,
                CommentsTableHashKey: Item.CommentsTableHashKey,
                okToShow: Item.okToShow
            }
        }
    },
};

module.exports = { typeDef, resolvers }


