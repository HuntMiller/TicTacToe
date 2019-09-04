describe('Tic Tac Toe', function() {
    it('visits site', function() {
        cy.visit('http://localhost:3000')
        cy.title().should('eq', 'Tic Tac Toe')
    })
})