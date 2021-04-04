import createRandomString from '../utilities/createRandomString';

describe('login', () => {
  it('register a user -> logout -> login', () => {
    const username = createRandomString(8);
    const password = createRandomString(8);

    cy.visit('/register');
    cy.get('#username').type(username);
    cy.get('#password').type(password);
    cy.get('#submitButton').click();

    cy.url()
      .should('include', '/dashboard')
      .then(() =>
        expect(localStorage.getItem('todo-app:auth'))
          .to.include('username')
          .to.include(username)
          .to.include('token'),
      );

    cy.get('#logoutButton').click();

    cy.url()
      .should('include', '/login')
      .then(() => expect(localStorage.getItem('todo-app:auth')).to.be.null);

    cy.visit('/login');

    cy.get('#username').type(username);
    cy.get('#password').type(password);
    cy.get('#loginButton').click();

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