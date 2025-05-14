/// <reference types="cypress" />



describe('Testes da Funcionalidade Produtos', () => {
    
    let token
    beforeEach(() => {
       cy.tokenadm().then(tkn =>{
          token = tkn
       })
       });
  
    it('Deve listar produtos cadastrados', () => {
        cy.request({
            method: "GET",
            url: "produtos"
       }).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('produtos')
       })        
       });
  
    it('Deve cadastrar um produto com sucesso', () => {
        cy.cadastrarProduto(token, 0)
    });
  
    it('Deve editar um produto previamente cadastrado', () => {
        cy.cadastrarProduto(token, 0).then(response =>{
            let id = response.body._id
         cy.editarProduto(token, 1, id)
        })
        });
  
    it('Deve deletar um produto previamente cadastrado', () => {
        cy.cadastrarProduto(token, 0).then(response =>{
            let id = response.body._id
         cy.deletarProduto(token, id)
        })
        });

    it('Deve exibir uma mensagem de erro ao cadastrar produto igual', () => {
      cy.cadastrarProdutoIgual(token, 0)
    });


    });
  