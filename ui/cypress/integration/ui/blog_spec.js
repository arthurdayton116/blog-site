// see ui/src/blogs/data.json - post with "order:  1" should be in first position
// file ui/src/components/Blog.js has code being tested
describe('Blog', () => {
    it('Check for featured post in correct position', () => {
        cy.visit('http://localhost:3001')
        cy.get('#posts').children().first().get('#post_6')
    })
})
