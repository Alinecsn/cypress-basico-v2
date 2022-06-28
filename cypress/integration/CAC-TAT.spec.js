/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit('./src/index.html')
    })

    
    it('verifica o título da aplicação', function() {
        cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário',function() {
        const longtext = 'Teste Cypress Agora que você já leu a documentacão oficial do Cypress sobre os comandos cy.get(),.type() e .click(), e você também já entendeu sobre as re-tentativas e encadeamento de comandos, que tal alguns exercícios?'
        
        cy.get('#firstName').should('be.visible').type('Aline').should('have.value','Aline')
        cy.get('#lastName').should('be.visible').type('Silva').should('have.value','Silva')
        cy.get('#email').should('be.visible').type('aline@teste.com').should('have.value','aline@teste.com')
        cy.get('#open-text-area').type(longtext,{delay: 0})
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible') 
    })

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida',function(){
        cy.get('#firstName').type('Aline')
        cy.get('#lastName').type('Silva')
        cy.get('#email').type('@aline@teste.com')
        cy.get('#open-text-area').type('Teste A')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible') 
    })

    it('Verificar se telefone esta vazio ao digitar valor não numerico', function(){
        
        cy.get('#phone').type('abcd').should('have.value','')

    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',function(){
        cy.get('#firstName').type('Aline')
        cy.get('#lastName').type('Silva')
        cy.get('#email').type('@aline@teste.com')
        cy.get('#open-text-area').type('Teste A')
        cy.get('#phone-checkbox').check()
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible') 
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName').should('be.visible').type('Aline').clear().should('have.value','')
        cy.get('#lastName').should('be.visible').type('Silva').clear().should('have.value','')
        cy.get('#phone').type('3199999999').clear().should('have.value','')

    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible') 
    })

    it('envia o formuário com sucesso usando um comando customizado', function(){
       cy.fillMandatoryFieldsAndSubmit()
       cy.get('.success').should('be.visible') 
    })

    it('seleciona um produto (YouTube) por seu texto', function(){
        cy.get('#product').select('YouTube').should('have.value','youtube')
     })

     it('seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product').select('mentoria').should('have.value','mentoria')
     })

     it('seleciona um produto (Blog) por seu índice', function(){
        cy.get('#product').select(1).should('have.value','blog')
     })

     it('marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[value="feedback"]').check().should('have.value','feedback')
     })

     it('marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]')
        .should('have.length',3)
        .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
     })

     it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]').check().should('be.checked')
        cy.get('input[type="checkbox"]').last().uncheck().should('not.be.checked')
     })

     it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('#file-upload').should('not.have.value')
        .selectFile('./src/privacy.html')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('privacy.html')
        })
     })

     it('seleciona um arquivo simulando um drag-and-dro', function(){
        cy.get('#file-upload').should('not.have.value')
        .selectFile('./src/privacy.html',{action:'drag-drop'})
        .should(function($input){
            expect($input[0].files[0].name).to.equal('privacy.html')
        })
     })

     it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
      cy.fixture('example.json').as('alias')
      cy.get('#file-upload')
        .selectFile('@alias',{action:'drag-drop'})
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
        
     })

     it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('a[href="privacy.html"]').should('have.attr', 'target', '_blank')
     })

     it('acessa a página da política de privacidade removendo o target e então clicanco no link', function(){
        cy.get('a[href="privacy.html"]').invoke('removeAttr','target').click()
        cy.contains('CAC TAT - Política de privacidade').should('be.visible')
     })

     it('testa a página da política de privavidade de forma independente', function(){
        cy.visit('./src/privacy.html')
        cy.contains('CAC TAT - Política de privacidade').should('be.visible')
     })


  })