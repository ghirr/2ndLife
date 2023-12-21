describe('Edit Last Element', () => {
  it('clicks on the "Modifier" button of the last element and modifies it', () => {
    // Visit the page
    cy.visit('http://localhost:4200/list'); // Replace with your actual URL

    // Click on the "Modifier" button of the last element
    cy.get('#edit').last().click();

    // Assert that the URL has changed to the edit page (replace with your expected URL)
    cy.url().should('include', '/edit-produit/');

    // Clear input fields
    cy.get('#nom').clear();
    cy.get('#prix').clear();
    cy.get('#description').clear();
    cy.get('#adresse').clear();

    // Modify the values
    cy.get('#image').selectFile('D:/Angular/2ndLife/src/assets/images/7.png');
    cy.get('#nom').type('mama');
    cy.get('#prix').type('72');
    cy.get('#description').type('jassa1');
    cy.get('#adresse').type('zouhour');

    // Click the button to save changes
    cy.get('#button').click();

    // Assert that the URL has changed to the list page after modification
    cy.url().should('eq', 'http://localhost:4200/list');
    cy.get('.card-body p:contains("Prix:")').first().should('contain.text', '72 dt');
  });
});
