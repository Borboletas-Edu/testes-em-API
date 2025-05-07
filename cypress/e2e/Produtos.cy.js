/// <reference types= 'cypress'/>
import cadastroitens from "../support/page_objects/cadastroitens";
import login from "../support/page_objects/login"



describe('Teste de API em produtos', () => {

   let token

   beforeEach(() => {
      login.tokenDeAdm().then(tkn =>{
         token = tkn
      })
      });

   it('Deve listar produtos cadastrados - GET', () => {
    cy.request({
        method: "GET",
        url: "produtos"
   }).should((response) => {
    expect(response.status).to.equal(200)
    expect(response.body).to.have.property('produtos')
   })        
   });
   
    it('Deve cadastrar produtos únicos- POST', () => {
      cadastroitens.cadastrar(token, 0)
      });
       
   it('Deve cadastrar produtos iguais - POST', () => {
      cadastroitens.cadastrarIgual(token, 0)
      });
   
   it('Deve editar produto - PUT', () => {
      cadastroitens.cadastrar(token, 0).then(response =>{
         let id = response.body._id
      cadastroitens.editarProduto(token, 1, id)
      })
   });
      
   it('Deve deletar produto - DELETE', () => {
      cadastroitens.cadastrar(token, 0).then(response =>{
         let id = response.body._id
      cadastroitens.deletarProduto(token, id)
      })
   });
})
