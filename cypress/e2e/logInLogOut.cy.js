describe('Login Test', () => {
  it('should allow a user to log in with valid credentials', () => {
    cy.visit('http://127.0.0.1:8080/')
    cy.wait(2000)

    cy.get('[data-auth="login"]').last().click()
    cy.wait(2000)
    cy.get('#loginEmail').type('heidu@stud.noroff.no')
    cy.wait(2000)
    cy.get('#loginPassword').type('heidu123')
    cy.wait(2000)
    cy.get('#loginBtn').click()
    cy.wait(2000)

    cy.url().should('include', '/?view=profile')
  })
})

describe(' invalid login Test', () => {
  it('should not allow a user to log in with invalid credentials', () => {
    cy.visit('http://127.0.0.1:8080/')
    cy.wait(2000)

    cy.get('[data-auth="login"]').last().click()
    cy.wait(2000)
    cy.get('#loginEmail').type('feilja@stud.noroff.no')
    cy.wait(2000)
    cy.get('#loginPassword').type('feilja123')
    cy.wait(2000)
    cy.get('#loginBtn').click()
    cy.wait(2000)

    cy.on('window:alert', (txt) => {
      expect(txt).to.contains(
        'Either your username was not found or your password is incorrect'
      )
    })
  })
})

describe('Log out Test', () => {
  it('should allow the user to log out', () => {
    cy.visit('http://127.0.0.1:8080/')
    cy.wait(2000)

    cy.get('[data-auth="login"]').last().click()
    cy.wait(2000)
    cy.get('#loginEmail').type('heidu@stud.noroff.no')
    cy.wait(2000)
    cy.get('#loginPassword').type('heidu123')
    cy.wait(2000)
    cy.get('#loginBtn').click()
    cy.wait(2000)

    cy.get('[data-auth="logout"]').click()

    cy.window().then((window) => {
      const token = window.localStorage.getItem('token') // 'key' er navnet på verdien i localStorage
      const profile = window.localStorage.getItem('profile') // 'key' er navnet på verdien i localStorage
      expect(token).to.be.null
      expect(profile).to.be.null
    })
  })
})
