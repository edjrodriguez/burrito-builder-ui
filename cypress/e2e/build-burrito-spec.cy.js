import ordersStub from '../fixtures/ordersStub'
import addOrderStub from '../fixtures/addOrderStub'

describe('Burrito Builder', () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3001/api/v1/orders", ordersStub)
    cy.intercept("POST", "http://localhost:3001/api/v1/orders", ordersStub)
    cy.visit('http://localhost:3000/')
  })
  
  it('Loads the page', () => {
    cy.location('pathname').should('eq', '/')
    cy.get('h1').contains('Burrito Builder')
      .get('form').should('exist')
      .get('button').should('exist')
      .get('button').contains('Submit Order')
      .get('form').contains('beans')
      .get('form').contains('pico')
      .get('form').contains('sour cream')
      .get('p').contains('Order')
      .get('p').contains('Nothing selected')
      .get('section').contains('Pat')
      .get('section').contains('Sam')
      .get('section').contains('Alex')
      .get('section').should('not.contain', 'This guy')
  })

  it('User can enter a name but cannot submit order until selecting an ingredient', () => {
    cy.get('form').should('exist')
      .get('.submit-order').should('be.disabled')
      .get('input').type('This guy')
      .get('.submit-order').should('be.disabled')
  })

  it('User can select an ingredient but cannot submit order until entering a name', () => {
    cy.get('form').should('exist')
      .get('.submit-order').should('be.disabled')
      .get('button[name="steak"]').click()
      .get('p').contains('Order')
      .get('p').contains('steak')
      .get('.submit-order').should('be.disabled')
  })

  it('User can enter a name and select an ingredient before submitting order', () => {
    cy.get('form').should('exist')
      .get('input').type('This guy')
      .get('.submit-order').should('be.disabled')
      .get('button[name="steak"]').click()
      .get('p').contains('Order')
      .get('p').contains('steak')
      .intercept("GET", "http://localhost:3001/api/v1/orders", addOrderStub)
      .get('.submit-order').should('not.be.disabled')
      .get('.submit-order').click() 
      .get('section').should('contain', 'This guy')
  })
})