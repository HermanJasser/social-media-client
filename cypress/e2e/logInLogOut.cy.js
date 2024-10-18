describe('Login Test', () => {
  it('should allow a user to log in with valid credentials', () => {
    cy.visit('http://127.0.0.1:8080/')
    cy.wait(2000)

    cy.get('[data-auth="login"]').first().click()
    cy.wait(2000)
    cy.get('input[name="email"]').type('heidu@stud.noroff.no')
    cy.wait(2000)
    cy.get('input[name="password"]').type('heidu123') //
    cy.wait(2000)
    cy.get('form').submit()
    cy.wait(2000)

    // Sjekk om omdirigeringen til profil-siden skjer etter vellykket innlogging
    cy.url().should('include', '/?view=profile')
  })
})
