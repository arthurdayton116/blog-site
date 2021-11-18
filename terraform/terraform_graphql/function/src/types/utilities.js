const AWS = require("aws-sdk");
const { gql } = require('apollo-server');
const uuid4 = require("uuid4")
// const { docClientSetup } = require('./dbSetup.js')
//
// docClient = docClientSetup()

const tablename = process.env.ddb_table_name || 'blog-site-comments'

const typeDef = gql`
  """Message object"""
  type Message {
    message: String
  }
  
  extend type Mutation {
      """Adds a new attribute to DynamoDB table"""  
      addAttribute(attribute: NewAttribute!) : Message
  }
"""Input type for new attribute to add to DynamoDB table"""
input NewAttribute {
  attribute: String
  value: String
  magic: String
}
`;

const resolvers = {
    Mutation: {
        addAttribute:  async (parent, args, context, info) => {

            async function main(event, context) {
                let tableContents;
                try{
                    //get items from dynamo
                    const params = {
                        TableName: `${tablename}`,
                    };
                    tableContents = await scanDB(params);
                }catch(err){
                    console.log(err);
                    return err;
                }
                let calls = [];
                tableContents.forEach(function(value){
                    console.log(value)
                    let params = {
                        ExpressionAttributeValues: {
                            ":daVal": args.attribute.value,
                        },
                        Key: {
                            "CommentsTableHashKey": value.CommentsTableHashKey
                        },
                        TableName: `${tablename}`,
                        UpdateExpression: `SET ${args.attribute.attribute} = :daVal`,
                    };
                    calls.push(context.docClient.update(params).promise());
                });
                let response;
                try{
                    response = await Promise.all(calls);
                }catch(err){
                    console.log(err);
                }
                return response;
            }
            async function scanDB(params) {
                let dynamoContents = [];
                let items;
                do{
                    items =  await context.docClient.scan(params).promise();
                    items.Items.forEach((item) => dynamoContents.push(item));
                    params.ExclusiveStartKey  = items.LastEvaluatedKey;
                }while(typeof items.LastEvaluatedKey != "undefined");
                return dynamoContents;
            };

            // main();

            // await docClient.put(params).promise();

            // const {Item} = await docClient.get({TableName: tablename, Key: {CommentsTableHashKey: HKEY}}).promise();

            // var sns = new AWS.SNS();

            // var params = {
            //     Message: JSON.stringify(Item),
            //     Subject: "Comment Posted on Item.postid",
            //     TopicArn: process.env.SNS_ARN || ""
            // };

            // var publishTextPromise = new AWS.SNS({apiVersion: '2010-03-31'}).publish(params).promise();
            // await publishTextPromise.then(
            //     function(data) {
            //         console.log(`Message ${params.Message} sent to the topic ${params.TopicArn}`);
            //         console.log("MessageID is " + data.MessageId);
            //     }).catch(
            //     function(err) {
            //         console.error(err, err.stack);
            //     });

            console.log("args", args)


            return {
                message: "Success",
            }
        },
    },
};

module.exports = { typeDef, resolvers }


