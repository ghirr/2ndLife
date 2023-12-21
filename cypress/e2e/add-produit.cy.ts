describe('template spec', () => {
  it('Valid Test', () => {
    cy.visit('http://localhost:4200/add-produit')
    cy.get('#image').selectFile('D:/Angular/2ndLife/src/assets/images/7.png')
    cy.get('#nom').type('mama')
    cy.get('#prix').type('72')
    cy.get('#description').type('jassa1')
    cy.get('#adressse').type('zouhour')
    cy.get('#nom').type('mama')
    cy.get('#button').click()
    cy.url().should('eq','http://localhost:4200/list')
    //cy.get(':nth-child(7) > .card-body')
    cy.get('.card-body p:contains("Prix:")').first().should('contain.text', '72 dt');
  })

  it('Invalid Name', () => {
    cy.visit('http://localhost:4200/add-produit')
    cy.get('#image').selectFile('D:/Angular/2ndLife/src/assets/images/7.png')
    cy.get('#nom').click()
    cy.get('#prix').type('72')
    cy.get('#invalidNom')
    cy.get('#description').type('jassa1')
    cy.get('#adressse').type('zouhour')
    cy.get('#nom').type('mama')

  })

  it('Invalid price', () => {
    cy.visit('http://localhost:4200/add-produit')
    cy.get('#image').selectFile('D:/Angular/2ndLife/src/assets/images/7.png')
    cy.get('#nom').type('mama')
    cy.get('#prix').click()
    cy.get('#description').type('jassa1')
    cy.get('#invalidPrice')
    cy.get('#adressse').type('zouhour')
    cy.get('#nom').type('mama')

  })

  it('Invalid Inputs', () => {
    cy.visit('http://localhost:4200/add-produit')
    cy.get('#image').click()
    cy.get('#nom').click()
    cy.get('#prix').click()
    cy.get('#description').click()
    cy.get('#invalidPrice')
    cy.get('#adressse').click()
    cy.get('#prix').click()
    cy.get('#invalidImage')
    cy.get('#invalidNom')
    cy.get('#invalidAdresse')
    cy.get('#invalidDescription')

  })
})