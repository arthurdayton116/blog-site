const AWS = require("aws-sdk");
const uuid4 = require("uuid4")
const tablename = process.env.ddb_table_name || 'thats_not_it'
const hashkey = process.env.ddb_hash_key || 'thats_not_it'
const region = process.env.ddb_region || 'thats_not_it'
// // Set the AWS Region.
AWS.config.update({ region: region });

// This is for use locally
// const credentials = new AWS.SharedIniFileCredentials();
// AWS.config.credentials = credentials;

// Create DynamoDB document client
const docClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

//TODO - add env variables to handle this
const params = {
    TableName: tablename,
    Key: {'CommentsTableHashKey': hashkey}
};


docClient.get(params, function(err, data) {
    if (err) {
        console.log("Error", err);
    } else {
        console.log("Success", data.Item);
    }
});

module.exports = {
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
        },
        comment: async () => {
            const { Item } = await docClient.get(params).promise()

                   console.log("Item", Item)
                    return {
                        postid: "1",
                        timestamp: Item.timestamp,
                        comment: Item.comment,
                        name: Item.name,
                        CommentsTableHashKey: Item.CommentsTableHashKey
                    }
        }
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
}

