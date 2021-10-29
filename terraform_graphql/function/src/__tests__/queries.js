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
            if (err) return done(err);
            expect(res.body).toBeInstanceOf(Object);
            expect(res.body.data.comments.length).toEqual(1);
            expect(res.body.data.comments[0].name).toEqual("Terraform");

            done();
        });
});
