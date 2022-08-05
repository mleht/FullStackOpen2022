describe('Blog app', function () {
  /*
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })
  */

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Testi Testinen',
      username: 'testi',
      password: 'testi',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('testi')
      cy.get('#password').type('testi')
      cy.get('#login-button').click()

      cy.contains('Testi Testinen logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('testi')
      cy.get('#password').type('testi2')
      cy.get('#login-button').click()

      cy.get('.neg')
        .should('contain', 'wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('#username').type('testi')
      cy.get('#password').type('testi')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function () {
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

    it('Users can like a blog', function () {
      cy.contains('New blog').click()
      cy.get('input[placeholder="title"]').type('test_title')
      cy.get('input[placeholder="author"]').type('test_author')
      cy.get('input[placeholder="url"]').type('test_url')
      cy.get('#create-button').click()
      cy.get('.pos')

      cy.contains('View details').click()
      cy.contains('likes 0')
      cy.contains('Like').click()
      cy.get('.pos')
        .should('contain', 'a new like added')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
      cy.contains('likes 1')
    })

    it('User who created a blog can delete it.', function () {
      cy.contains('New blog').click()
      cy.get('input[placeholder="title"]').type('test_title')
      cy.get('input[placeholder="author"]').type('test_author')
      cy.get('input[placeholder="url"]').type('test_url')
      cy.get('#create-button').click()
      cy.get('.pos')

      cy.contains('View details').click()
      cy.contains('Delete').click()
      cy.on('window:confirm', () => true)
      cy.get('.pos')
        .should('contain', 'deleted')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
    })

    it('Blogs are ordered according to likes with the blog with the most likes being first.', function () {
      cy.contains('New blog').click()
      cy.get('input[placeholder="title"]').type('test_title1')
      cy.get('input[placeholder="author"]').type('test_author1')
      cy.get('input[placeholder="url"]').type('test_url1')
      cy.get('#create-button').click()

      cy.contains('New blog').click()
      cy.get('input[placeholder="title"]').type('test_title2')
      cy.get('input[placeholder="author"]').type('test_author2')
      cy.get('input[placeholder="url"]').type('test_url2')
      cy.get('#create-button').click()

      cy.contains('New blog').click()
      cy.get('input[placeholder="title"]').type('test_title3')
      cy.get('input[placeholder="author"]').type('test_author3')
      cy.get('input[placeholder="url"]').type('test_url3')
      cy.get('#create-button').click()

      cy.contains('test_title1').find('button').click()
      cy.contains('Like').click()
      cy.contains('likes 1')
      cy.contains('Hide details').click()

      cy.contains('test_title2').find('button').click()
      cy.contains('Like').click()
      cy.contains('likes 1')
      cy.contains('Like').click()
      cy.contains('likes 2')
      cy.contains('Hide details').click()

      cy.contains('test_title3').find('button').click()
      cy.contains('Like').click()
      cy.contains('likes 1')
      cy.contains('Like').click()
      cy.contains('likes 2')
      cy.contains('Like').click()
      cy.contains('likes 3')
      cy.contains('Hide details').click()

      cy.get('.blog').eq(0).should('contain', 'test_title3')
      cy.get('.blog').eq(1).should('contain', 'test_title2')
      cy.get('.blog').eq(2).should('contain', 'test_title1')
    })
  })
})
