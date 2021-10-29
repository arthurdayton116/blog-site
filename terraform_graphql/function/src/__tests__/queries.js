/* __tests__/queries.js */
const { startApolloServer, resolvers,typeDefs }  = require('../app.js')
const supertest = require("supertest");
// const { stopDatabase } = require("../src/database");

port = process.env.TEST_GRAPHQL_PORT || 4050

let server;

beforeAll(async () => {
    server = await startApolloServer(typeDefs, resolvers, port)
    return null
});

afterAll(async () => {
    return await server.stop()
});

const {DocumentClient} = require('aws-sdk/clients/dynamodb');

const isTest = process.env.JEST_WORKER_ID;

const config = {
    convertEmptyValues: true,
    ...(isTest && {
        endpoint: 'localhost:8000',
        sslEnabled: false,
        region: 'local-env'})
};

const ddb = new DocumentClient(config);

const DDB_DATESTAMP = Date.now()
const DDB_HASHKEY = '1234567890'
const DDB_TABLE = 'blog-site-comments'
const DDB_NAME = 'Jest'
const DDB_POSTID = '9999'
const DDB_COMMENT = 'This is a test comment'


it('should insert item into table', async () => {
    await ddb.put({TableName: DDB_TABLE,
        Item: {CommentsTableHashKey: DDB_HASHKEY, comment: DDB_COMMENT, name: DDB_NAME, postid: DDB_POSTID, timestamp: DDB_DATESTAMP}}).promise();

    const {Item} = await ddb.get({TableName: DDB_TABLE, Key: {CommentsTableHashKey: DDB_HASHKEY}}).promise();

    expect(Item).toEqual({
        CommentsTableHashKey: DDB_HASHKEY,
        comment: DDB_COMMENT,
        name: DDB_NAME,
        postid: DDB_POSTID,
        timestamp: DDB_DATESTAMP
    });
});

test("fetch comments", async (done) => {


    const request = supertest(`http://localhost:${port}`);

    request.post("/graphql")
        .send({
            query: "{comments {postid, timestamp,comment,name,CommentsTableHashKey} }",
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end(function (err, res) {
            console.log(res.text)
            if (err) return done(err);
            expect(res.body).toBeInstanceOf(Object);
            expect(res.body.data.comments.length).toEqual(1);
            expect(res.body.data.comments[0].name).toEqual("Terraform");

            done();
        });
});
