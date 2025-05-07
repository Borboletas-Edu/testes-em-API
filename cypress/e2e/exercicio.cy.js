/// <reference types="cypress" />
import cadastroitens from "../support/page_objects/cadastroitens";
import login from "../support/page_objects/login"
import contrato from "../e2e/contrato/produtos.contrato"

describe('Testes da Funcionalidade Usuários', () => {
    
    let token
    beforeEach(() => {
       login.tokenDeAdm().then(tkn =>{
          token = tkn
       })
       });

    it.only('Deve validar contrato de usuários', () => {
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
        cadastroitens.cadastrar(token, 0)
    });
  
    it('Deve validar um usuário com email inválido', () => {
      login.loginEmailErrado()
    });
  
    it('Deve editar um usuário previamente cadastrado', () => {
        cadastroitens.cadastrar(token, 0).then(response =>{
            let id = response.body._id
         cadastroitens.editarProduto(token, 1, id)
        })
        });
  
    it('Deve deletar um usuário previamente cadastrado', () => {
        cadastroitens.cadastrar(token, 0).then(response =>{
            let id = response.body._id
         cadastroitens.deletarProduto(token, id)
        })
        });




    });
  