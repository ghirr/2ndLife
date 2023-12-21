describe('Delete Element', () => {
  it('deletes an element', () => {
    // Visit the page
    cy.visit('http://localhost:4200/list'); // Make sure to replace the URL with your actual URL

    // Get the number of elements before deletion
    cy.get('.card').its('length').then((initialCount) => {
      // Click on the delete button of the first element
      cy.get('.card-body .col-md-3:last-child button').last().click();

      // Confirm deletion if needed

      // Wait for the deletion to complete (adjust the timeout as needed)
      cy.wait(2000);
    });
  });
});
