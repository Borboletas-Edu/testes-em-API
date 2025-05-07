class Cadastro {

  cadastrar(token, item){
    return cy.fixture("cadastroItens").then(dados=>{
      return cy.request({
          method: "POST",
          url: "produtos",
          headers: {authorization: token},
          body: {
              "nome": `${dados[item].item + Math.floor(Math.random() * 10000)}`,
              "preco": dados[item].valor,
              "descricao": dados[item].descr,
              "quantidade": dados[item].quant
              }
            }).should(response =>{
              expect(response.body.message).to.equal("Cadastro realizado com sucesso")
              expect(response.status).to.equal(201)
              });
          })
          }
      
  
  cadastrarIgual(token, item){
    return cy.fixture("cadastroItens").then(dados=>{
      return cy.request({
          method: "POST",
          url: "produtos",
          headers: {authorization: token},
          body: {
              "nome": dados[item].item,
              "preco": dados[item].valor,
              "descricao": dados[item].descr,
              "quantidade": dados[item].quant
              }, failOnStatusCode: false
            }).should(response =>{
              expect(response.body.message).to.equal("Já existe produto com esse nome")
              expect(response.status).to.equal(400)
            });
          })
          }
        
        

  editarProduto(token, item, id){
    return cy.fixture("cadastroItens").then(dados=>{
      return cy.request({
        method: "PUT",
        url: `produtos/${id}`,
        headers: {authorization: token},
        body: {
            "nome": `${dados[item].item + Math.floor(Math.random() * 10000)}`,
            "preco": dados[item].valor,
            "descricao": dados[item].descr,
            "quantidade": dados[item].quant
            }
        }).should((response) =>{
          expect(response.body.message).to.equal('Registro alterado com sucesso'),
          expect(response.status).to.equal(200)
        })
        })
        }

  deletarProduto(token, id){
    return cy.request({
      method: "DELETE",
      url: `produtos/${id}`,
      headers: {authorization: token} 
    }).should((response) =>{
      expect(response.body.message).to.equal('Registro excluído com sucesso'),
      expect(response.status).to.equal(200)
    })
    }





}



export default new Cadastro()