Cypress.Commands.add("cadastrar", (token, item) => {
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
        });
      

Cypress.Commands.add("cadastrarIgual", (token, item) => {
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
          });

Cypress.Commands.add("editarProduto", (token, item, id) => {
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
        })

Cypress.Commands.add("deletarProduto", (token, id) => {
    return cy.request({
      method: "DELETE",
      url: `produtos/${id}`,
      headers: {authorization: token} 
    }).should((response) =>{
      expect(response.body.message).to.equal('Registro excluído com sucesso'),
      expect(response.status).to.equal(200)
    })
    })

Cypress.Commands.add("tokenadm", () => {
    return cy.fixture("dadosLogin").then(dados=>{
      return cy.request({
        method: 'POST',
        url: 'login',
        body: {
          email: dados[0].email,
          password: dados[0].senha
        }
      }).then((response) => {
        return response.body.authorization 
    })
    })
    })

    Cypress.Commands.add("loginEmailErrado", () => {
    cy.fixture("dadosLogin").then(dados=>{
      cy.request({
        method: 'POST',
        url: 'login',
        body: {
          "email": dados[1].email,
          "password": dados[1].senha
        }, failOnStatusCode: false
      }).should(response =>{
        expect(response.body.email).to.equal('email deve ser um email válido')
        expect(response.status).to.equal(400)
    })
    })
    })

























