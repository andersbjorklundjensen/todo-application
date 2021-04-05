import createRandomString from '../utilities/createRandomString';

describe('register', () => {
  it('register a user', () => {
    const username = createRandomString(8);

    cy.visit('/register');
    cy.get('#username').type(username);
    cy.get('#password').type('password');
    cy.get('#submitButton').click();

    cy.url()
      .should('include', '/dashboard')
      .then(() =>
        expect(localStorage.getItem('todo-app:auth'))
          .to.include('username')
          .to.include(username)
          .to.include('token'),
      );
  })
})