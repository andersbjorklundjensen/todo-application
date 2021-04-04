import createRandomString from '../utilities/createRandomString';

describe('update project', () => { 
  it('update a project', () => {
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

    cy.get('#editProjectButton').click();
    cy.get('#editProjectInput').clear().type('Project 2 {enter}');
    cy.contains('Project 2');
  })
})