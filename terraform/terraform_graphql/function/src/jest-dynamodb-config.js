module.exports = {
    tables: [
        {
            TableName: `blog-site-comments`,
            KeySchema: [{AttributeName: 'CommentsTableHashKey', KeyType: 'HASH'}],
            AttributeDefinitions: [
                {AttributeName: 'CommentsTableHashKey', AttributeType: 'S'},
                {AttributeName: 'postid', AttributeType: 'S'},
                {AttributeName: 'timestamp', AttributeType: 'S'},
                {AttributeName: 'okToShow', AttributeType: 'S'},
            ],
            ProvisionedThroughput: {ReadCapacityUnits: 1, WriteCapacityUnits: 1},
            GlobalSecondaryIndexes: [
                {
                    IndexName: 'postid-timestamp-index', /* required */
                    KeySchema: [ /* required */
                        {
                            AttributeName: 'postid', /* required */
                            KeyType: 'HASH' /* required */
                        },
                        {
                            AttributeName: 'timestamp', /* required */
                            KeyType: 'RANGE' /* required */
                        },
                        /* more items */
                    ],
                    Projection: { /* required */
                        // NonKeyAttributes: [
                        //     'A',
                        //     /* more items */
                        // ],
                        ProjectionType: 'ALL'
                    },
                    ProvisionedThroughput: {
                        ReadCapacityUnits: '1', /* required */
                        WriteCapacityUnits: '1' /* required */
                    }
                },
                {
                    IndexName: 'oktoshow-timestamp-index', /* required */
                    KeySchema: [ /* required */
                        {
                            AttributeName: 'okToShow', /* required */
                            KeyType: 'HASH' /* required */
                        },
                        {
                            AttributeName: 'timestamp', /* required */
                            KeyType: 'RANGE' /* required */
                        },
                        /* more items */
                    ],
                    Projection: { /* required */
                        // NonKeyAttributes: [
                        //     'A',
                        //     /* more items */
                        // ],
                        ProjectionType: 'ALL'
                    },
                    ProvisionedThroughput: {
                        ReadCapacityUnits: '1', /* required */
                        WriteCapacityUnits: '1' /* required */
                    }
                },
                /* more items */
            ],
        }
    ],
    port: 8000,
    options: ['-sharedDb']
};
