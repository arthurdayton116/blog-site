const AWS = require("aws-sdk");
const region = process.env.ddb_region || 'us-east-1'
// const DynamoDbLocal = require('dynamodb-local');
const jest_config = require('../jest-dynamodb-config')
const uuid4 = require("uuid4")
// // Set the AWS Region.
AWS.config.update({ region: region });

// This is for use for local development - should be ignored for Lambda
if (!process.env.AWS_LAMBDA_FUNCTION_NAME) {
    const credentials = new AWS.SharedIniFileCredentials();
    AWS.config.credentials = credentials;
}

const dynamoHost = process.env.DYNAMO_HOST || 'localhost';

// Create DynamoDB document client
const docClientSetup = async () => {
    if(process.env.JEST_WORKER_ID || process.env.CYPRESS_GRAPHQL) {
        const config = {
            convertEmptyValues: true,
                endpoint: `${dynamoHost}:8000`,
                sslEnabled: false,
                region: 'local-env'
        };

        const base_client = new AWS.DynamoDB(config);

        const tablesCount = jest_config.tables.length

        for (let index = 0; index < tablesCount; index++) {
            const params = jest_config.tables[index]

            await base_client.createTable(params, function(err, data) {
                if (err) console.log(err); // an error occurred
                else console.log(`Table ${params.TableName} Created`); // successful response

                base_client.describeTable({TableName: params.TableName}, function(err, data) {
                    if (err) console.log(err); // an error occurred
                    else console.log(data); // successful response

                });

            });


        };

        return new AWS.DynamoDB.DocumentClient(config);
    }
    return new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
}

module.exports = { docClientSetup }
