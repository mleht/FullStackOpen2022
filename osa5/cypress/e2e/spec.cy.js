describe('Blog app', function() {
  /*
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })
  */

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Testi Testinen',
      username: 'testi',
      password: 'testi'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('testi')
      cy.get('#password').type('testi')
      cy.get('#login-button').click()

      cy.contains('Testi Testinen logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('testi')
      cy.get('#password').type('testi2')
      cy.get('#login-button').click()

      cy.get('.neg')
        .should('contain', 'wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('testi')
      cy.get('#password').type('testi')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('New blog').click()
      cy.get('input[placeholder="title"]').type('test_title')
      cy.get('input[placeholder="author"]').type('test_author')
      cy.get('input[placeholder="url"]').type('test_url')
      cy.get('#create-button').click()
      cy.get('.pos')
        .should('contain', 'a new blog added')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
      cy.contains('test_title test_author View details')
    })
  })

})