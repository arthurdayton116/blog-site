const AWS = require("aws-sdk");
const region = process.env.ddb_region || 'us-east-1'

// // Set the AWS Region.
AWS.config.update({ region: region });

// This is for use for local development - COMMENT THIS OUT BEFORE PUSHING
if (!process.env.AWS_LAMBDA_FUNCTION_NAME) {
    const credentials = new AWS.SharedIniFileCredentials();
    AWS.config.credentials = credentials;
}

// Create DynamoDB document client
const docClientSetup = () => {
    if(process.env.JEST_WORKER_ID) {
        const config = {
            convertEmptyValues: true,
                endpoint: 'localhost:8000',
                sslEnabled: false,
                region: 'local-env'
        };

        return new AWS.DynamoDB.DocumentClient(config);
    }
    return new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
}

module.exports = { docClientSetup }
