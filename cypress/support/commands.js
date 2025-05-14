
//Produtos

Cypress.Commands.add("cadastrarProduto", (token, item) => {
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
      
Cypress.Commands.add("cadastrarProdutoIgual", (token, item) => {
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
  });

Cypress.Commands.add("deletarProduto", (token, id) => {
    return cy.request({
      method: "DELETE",
      url: `produtos/${id}`,
      headers: {authorization: token} 
    }).should((response) =>{
      expect(response.body.message).to.equal('Registro excluído com sucesso'),
      expect(response.status).to.equal(200)
    })
  });

//Usuários

Cypress.Commands.add("loginEmailErrado", () => {
  return cy.fixture("dadosLogin").then(dados=>{
    return cy.request({
      method: 'POST',
      url: 'login',
      body: {
        "email": dados[2].email,
        "password": dados[2].senha
      }, failOnStatusCode: false
    }).should(response =>{
      expect(response.body.email).to.equal('email deve ser um email válido')
      expect(response.status).to.equal(400)
  })
  })
  });

Cypress.Commands.add("cadastrarUsuario", (nome, email, senha) => {
  return cy.request({
      method: "POST",
      url: "usuarios",
      body: {
      "nome": nome,
      "email": email,
      "password": senha,
      "administrador": "true"
      }
      }).should((response) => {
      expect(response.status).to.equal(201)
      expect(response.body.message).to.equal("Cadastro realizado com sucesso")
  })
  });

Cypress.Commands.add("editarUsuario", (token, id, nome, email, senha) =>{
  cy.request({
    method:"PUT",
    url:`${"usuarios/" + id}`,
    headers: {authorization: token},
    body: {
      "nome": nome,
      "email": email,
      "password": senha,
      "administrador": "true"
    } 
    }).should((response) => {
      expect(response.body.message).equal("Registro alterado com sucesso")
      expect(response.status).equal(200)
    })
  });

Cypress.Commands.add("deletarUsuario", (token, id) =>{
  cy.request({
    method: "DELETE",
    url:`${"usuarios/" + id}`,
    headers: {authorization: token},
  }).should((response) => {
      expect(response.body.message).equal("Registro excluído com sucesso")
      expect(response.status).equal(200)
  })
  });























