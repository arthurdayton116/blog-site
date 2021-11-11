describe('My First Test', () => {
    it('Does not do much!', () => {
        expect(true).to.equal(true)
    })
})

describe('My First Test', () => {
    it('clicks the link "type"', () => {
        cy.visit('https://example.cypress.io')

        cy.contains('type').click()
    })
})

describe('Blog', () => {
    it('clicks the link "type"', () => {
        cy.visit('http://localhost:3001')

        cy.contains('/post/6')
    })
})
