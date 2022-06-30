
Cypress._.times(3,function(){
    describe('Central de Atendimento ao Cliente TAT', function() {
        beforeEach(function(){
            cy.visit('./src/privacy.html')
        })
    
        it('testa a página da política de privavidade de forma independente', function(){
            cy.contains('CAC TAT - Política de privacidade').should('be.visible')
         })
    })
})



