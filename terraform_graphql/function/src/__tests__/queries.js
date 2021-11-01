/* __tests__/queries.js */
const { startApolloServer, schema }  = require('../app.js')
const supertest = require("supertest");
const { docClientSetup } = require('../types/dbSetup.js')
const uuid4 = require("uuid4")

docClient = docClientSetup()

port = process.env.TEST_GRAPHQL_PORT || 4050

let server;

beforeAll(async () => {
    server = await startApolloServer(schema, port)
    return null
});

afterAll(async () => {
    return await server.stop()
});

const DDB_DATESTAMP = new Date().toISOString()
const DDB_HASHKEY = uuid4()
const DDB_HASHKEY2 = uuid4()
const DDB_TABLE = 'blog-site-comments'
const DDB_NAME = 'Jest'
const DDB_POSTID = '9999'
const DDB_COMMENT = 'This is a test comment'


it('should insert item into table', async () => {
    await docClient.put({TableName: DDB_TABLE,
        Item: {
        CommentsTableHashKey: DDB_HASHKEY,
            comment: DDB_COMMENT,
            name: DDB_NAME,
            postid: DDB_POSTID,
            timestamp: DDB_DATESTAMP
    }}).promise();

    const {Item} = await docClient.get({TableName: DDB_TABLE, Key: {CommentsTableHashKey: DDB_HASHKEY}}).promise();

    expect(Item).toEqual({
        CommentsTableHashKey: DDB_HASHKEY,
        comment: DDB_COMMENT,
        name: DDB_NAME,
        postid: DDB_POSTID,
        timestamp: DDB_DATESTAMP
    });
});

test("add comment", async (done) => {

    const request = supertest(`http://localhost:${port}`);

    const qry = {
        "query": "query GetComments($postid: String!){comments(postid: $postid){postid, timestamp,comment,name,CommentsTableHashKey}}",
        "variables":{"postid": DDB_POSTID}
    };
    request.post("/graphql")
        .send(qry)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end(function (err, res) {
            console.log(res.text)
            if (err) return done(err);
            expect(res.body).toBeInstanceOf(Object);
            expect(res.body.data.comments.length).toEqual(1);
            expect(res.body.data.comments[0].name).toEqual(DDB_NAME);
            done();
        });
});

test("fetch comments", async (done) => {

    const request = supertest(`http://localhost:${port}`);

const qry = {
    "query": "query GetComments($postid: String!){comments(postid: $postid){postid, timestamp,comment,name,CommentsTableHashKey}}",
    "variables":{"postid": DDB_POSTID}
};
    request.post("/graphql")
        .send(qry)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .end(function (err, res) {
            console.log(res.text)
            if (err) return done(err);
            expect(res.body).toBeInstanceOf(Object);
            expect(res.body.data.comments.length).toEqual(1);
            expect(res.body.data.comments[0].name).toEqual(DDB_NAME);
            done();
        });
});
