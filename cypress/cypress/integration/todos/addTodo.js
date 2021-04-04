import createRandomString from '../utilities/createRandomString';

describe('add todo', () => {
  it('user can add a todo', () => {
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

    cy.get('#addProjectButton').click();
    cy.get('#projectNameInput').type('Project 1 {enter}');
    cy.contains('Project 1');

    cy.get('#projectList > .MuiButtonBase-root').click();

    cy.get('#addTodoButton').click();
    cy.get('#todoInput').type('Todo 1 {enter}')

    cy.contains('Todo 1');

    cy.get('#logoutButton').click();
    cy.visit('/login');

    cy.get('#username').type(username);
    cy.get('#password').type(password);
    cy.get('#loginButton').click();

    cy.get('#projectList > .MuiButtonBase-root').click();
    cy.contains('Todo 1');
  })
})