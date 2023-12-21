describe('Login spec', () => {
  it('loging succeed', () => {
    cy.visit('http://localhost:4200/auth')
    cy.get('#email').type('taha@gmail.com')
    cy.get('#password').type('Taha02#@')
    cy.get('#login').click()
    cy.visit('http://localhost:4200/list')

  })
  it('wrong email', () => {
    cy.visit('http://localhost:4200/auth')
    cy.get('#email').type('taha1@gmail.com')
    cy.get('#password').type('Taha02#@')
    cy.get('#login').click()
    cy.get('#wrongLogin')

  })
  it('wrong password', () => {
    cy.visit('http://localhost:4200/auth')
    cy.get('#email').type('taha@gmail.com')
    cy.get('#password').type('Taha022#@')
    cy.get('#login').click()
    cy.get('#wrongLogin')

  })
})