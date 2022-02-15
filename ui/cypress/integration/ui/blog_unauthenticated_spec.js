// see ui/src/blogs/data.json - post with "order:  1" should be in first position
// file ui/src/components/Blog.js has code being tested
describe('Blog Non Authenticated Tests', () => {
    const setUpQryStr={"query":"mutation SetUpTest {setUpTest {postid, timestamp, comment, name, CommentsTableHashKey, okToShow }}"}
    const deleteQryStr={"query":"mutation Mutation {deleteTest {CommentsTableHashKey }}"}
    const unApprovedQryStr={"query":"query UnapprovedComments {unapprovedComments {postid,timestamp, comment, name, CommentsTableHashKey, okToShow}}"}
    const userQryStr={"query":"query User {user {name,ID, Comments {postid,timestamp,comment,name,CommentsTableHashKey,okToShow}}}"}
    const commentsQryStr={"query":"query Comments($postid: String!) {comments(postid: $postid) {postid,timestamp,comment,name,CommentsTableHashKey,okToShow}}","variables":"{\"postid\": \"5\"}"}


    before(function () {
        cy.request('POST', 'http://localhost:4000/graphql', setUpQryStr).then(
            (response) => {
                // response.body is automatically serialized into JSON
                console.log(response)
                expect(response.body.data.setUpTest).lengthOf(10) // true
            }
        )
    })

    after(function () {
        cy.request('POST', 'http://localhost:4000/graphql', deleteQryStr).then(
            (response) => {
                // response.body is automatically serialized into JSON
                console.log(response)
                expect(response.body.data.deleteTest).lengthOf(10) // true
            }
        )
    })

    // it('Check graphql unapproved query has results', () => {
    //     cy.request('POST', 'http://localhost:4000/graphql', unApprovedQryStr).then(
    //         (response) => {
    //             // response.body is automatically serialized into JSON
    //             console.log(response)
    //             expect(response.body.data.unapprovedComments).lengthOf(5) // true
    //         }
    //     )
    // })

    // In order for this to pass JWT_OVERRIDE: "Exists" must be uncommented in docker-compose file
    it('Check graphql user query has results', () => {
        cy.request('POST', 'http://localhost:4000/graphql', userQryStr).then(
            (response) => {
                // response.body is automatically serialized into JSON
                console.log(response)
                expect(response.body.data.user.Comments).lengthOf(5) // true
            }
        )
    })

    it('Check graphql comments query has results', () => {
        cy.request('POST', 'http://localhost:4000/graphql', commentsQryStr).then(
            (response) => {
                // response.body is automatically serialized into JSON
                console.log(response)
                expect(response.body.data.comments).lengthOf(1) // true
            }
        )
    })

    it('Check for featured post in correct position', () => {
        cy.visit('http://localhost:3001')
        cy.get('#posts').children().first().get('#post_6')
    })

    it('Check nav to post works', () => {
        cy.visit('http://localhost:3001/post/6/')
        cy.get('#post_page_parent_6')
    })
});

