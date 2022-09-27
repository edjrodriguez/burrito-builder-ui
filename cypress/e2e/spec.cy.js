const ordersStub = {

}


describe('Burrito Builder', () => {

  beforeEach()
  
  cy.intercept('GET', "http://localhost:3000/ ", ordersStub )


  it('Visits the page', () => {
    cy.visit('http://localhost:3000/')
  })


})