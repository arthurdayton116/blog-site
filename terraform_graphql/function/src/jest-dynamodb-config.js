module.exports = {
    tables: [
        {
            TableName: `blog-site-comments`,
            KeySchema: [{AttributeName: 'CommentsTableHashKey', KeyType: 'HASH'}],
            AttributeDefinitions: [{AttributeName: 'CommentsTableHashKey', AttributeType: 'S'}],
            ProvisionedThroughput: {ReadCapacityUnits: 1, WriteCapacityUnits: 1}
        }
    ],
    port: 8000,
    options: ['-sharedDb']
};
