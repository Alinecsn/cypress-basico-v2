Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Aline')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('aline@teste.com')
    cy.get('#open-text-area').type('Teste A')
    cy.get('button[type="submit"]').click()
})
