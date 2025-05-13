/// <reference types="cypress" />
import contrato from "../e2e/contrato/produtos.contrato"


describe('Testes da Funcionalidade Usuários', () => {
    
    let token
    beforeEach(() => {
       cy.tokenadm().then(tkn =>{
          token = tkn
       })
       });

    it('Deve validar contrato de usuários', () => {
      cy.request('produtos').then(response =>{
        return contrato.validateAsync(response.body)
      })
    });
  
    it('Deve listar usuários cadastrados', () => {
        cy.request({
            method: "GET",
            url: "produtos"
       }).should((response) => {
        expect(response.status).to.equal(200)
        expect(response.body).to.have.property('produtos')
       })        
       });
  
    it('Deve cadastrar um usuário com sucesso', () => {
        cy.cadastrar(token, 0)
    });
  
    it('Deve validar um usuário com email inválido', () => {
      cy.loginEmailErrado()
    });
  
    it('Deve editar um usuário previamente cadastrado', () => {
        cy.cadastrar(token, 0).then(response =>{
            let id = response.body._id
         cy.editarProduto(token, 1, id)
        })
        });
  
    it('Deve deletar um usuário previamente cadastrado', () => {
        cy.cadastrar(token, 0).then(response =>{
            let id = response.body._id
         cy.deletarProduto(token, id)
        })
        });




    });
  