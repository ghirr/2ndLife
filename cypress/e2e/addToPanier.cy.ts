describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:4200/cards')
    cy.get('#liveToastBtn').last().click();
    cy.get('#liveToastBtn').first().click();
    cy.get('#panier').click()
    cy.visit('http://localhost:4200/panier')

  })
})