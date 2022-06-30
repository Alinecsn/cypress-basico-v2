describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit('./src/index.html')
    })

    it('desafio encontre o gato', function(){
        cy.get('#cat').invoke('show').should('be.visible')
        cy.get('#title').invoke('text','CAT TAT')
        cy.get('#subtitle').invoke('text','Eu amo gatos')
     })
})