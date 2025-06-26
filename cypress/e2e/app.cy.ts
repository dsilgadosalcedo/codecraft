describe('App E2E Smoke Test', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('opens the Templates dialog', () => {
    // Open the Templates dialog from the sidebar
    cy.contains('Templates').should('be.visible').click()
    cy.contains('Select Template').should('be.visible')

    // Close the dialog
    cy.get('[data-slot="dialog-close"]').click()
  })
})
