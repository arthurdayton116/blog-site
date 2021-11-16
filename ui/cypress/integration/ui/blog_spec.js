// see ui/src/blogs/data.json - post with "order:  1" should be in first position
// file ui/src/components/Blog.js has code being tested
describe('Blog Non Authenticated Tests', () => {
    it('Check for featured post in correct position', () => {
        cy.visit('http://localhost:3001')
        cy.get('#posts').children().first().get('#post_6')
    })

    it('Check nav to post works', () => {
        cy.visit('http://localhost:3001/post/6/')
        cy.get('#post_page_parent_6')
    })
});

describe('Blog Authenticate Tests Non_Approver', () => {
        before(function () {
            // cy.task('db:seed')
            cy.visit('http://localhost:3001')
            cy.loginByOktaApi(
                Cypress.env('auth_username_nonapprover'),
                Cypress.env('auth_password_nonapprover')
            )
        })
    it('Test LogOn and Logoff for Non Approver', () => {
        cy.get('#logOnButton').click()

        cy.get('#approvalButton').click()

        cy.get('#approvalError')

        cy.get('#logOffButton').click()

        cy.get('#logOffButton').click()

        cy.get('#logOnButton')
    })

})

describe('Blog Authenticate Tests Approver', () => {
    before(function () {
        // cy.task('db:seed')
        cy.visit('http://localhost:3001')
        cy.loginByOktaApi(
            Cypress.env('auth_username_approver'),
            Cypress.env('auth_password_approver')
        )
    })
    it('Test LogOn and Logoff for Approver', () => {
        cy.get('#logOnButton').click()

        cy.get('#approvalButton').click()

        cy.get('#approvalData')

        cy.get('#logOffButton').click()

        cy.get('#logOffButton').click()

        cy.get('#logOnButton')
    })

})


