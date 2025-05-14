/// <reference types="cypress" />
import contrato from "./contrato/usuario.contrato"
import { faker } from "@faker-js/faker";

describe('Testes da Funcionalidade Usuários', () => {

let nome = faker.person.firstName()
let email = faker.internet.email()
let senha = faker.person.firstName()
let token

beforeEach(() => {
  cy.request({
    method: 'POST',
    url: 'login',
    body: {
      email: "Rashad.Hackett@yahoo.com",
      password: "MtQR2g6H7R1ovet"
    }
  }).then(response => {
    token = response.body.authorization;
  });
  });

 

it('Deve validar contrato de usuários', () => {
    cy.request('usuarios').then(response =>{
    return contrato.validateAsync(response.body)
    })
});


it('Deve listar usuários cadastrados', () => {
    cy.request({
        method: "GET",
        url: "usuarios"
    }).should((response) => {
    expect(response.status).to.equal(200)
    expect(response.body).to.have.property('usuarios')
    })        
    });
  
it('Deve cadastrar um usuário com sucesso', () => {
    cy.cadastrarUsuario(nome, email, senha)
  });

it('Deve validar um usuário com email inválido', () => {
    cy.loginEmailErrado()
  });

it('Deve editar um usuário previamente cadastrado', () => {
  let emaileditar = faker.internet.email()
  cy.cadastrarUsuario(`${"ItemParaTesteEdição" + Math.floor(Math.random() * 100000)}`, emaileditar, senha)
  .then(response => { 
    let id = response.body._id 
    cy.editarUsuario(token, id, `${"ItemEditado" + Math.floor(Math.random() * 100000)}`, emaileditar, senha)
  })
  });
    
it('Deve deletar um usuário previamente cadastrado', () => {
  let emaildeletar = faker.internet.email()
   cy.cadastrarUsuario(`${"ItemParaTesteDeletar" + Math.floor(Math.random() * 100000)}`, emaildeletar, senha)
  .then(response => { 
    let id = response.body._id 
    cy.deletarUsuario(token, id)
  })
  }); 

});
