describe('Login Test', () => {
  it('should allow a user to log in with valid credentials', () => {
    cy.visit('http://127.0.0.1:8080/')
    cy.get('input[name="email"]').type('heidu@stud.noroff.no') // Sett inn gyldig e-post
    cy.get('input[name="password"]').type('heidu123') // Sett inn gyldig passord
    cy.get('form').submit() // Send skjemaet

    // Sjekk om omdirigeringen til profil-siden skjer etter vellykket innlogging
    cy.url().should('include', '/?view=profile')
  })
})
