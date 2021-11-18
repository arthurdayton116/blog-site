describe('Blog Authenticate Tests Non_Approver', () => {
    before(function () {
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


