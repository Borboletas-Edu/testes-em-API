class login {

  tokenDeAdm() {
    return cy.fixture("dadosLogin").then(dados=>{
      return cy.request({
        method: 'POST',
        url: 'login',
        body: {
          email: dados[0].email,
          password: dados[0].senha
        }
      }).then((response) => {
        return response.body.authorization; 
      });
    })
  }

  loginEmailErrado() {
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
      })}


}

export default new login();
