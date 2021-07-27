/* eslint no-undef: 0 */
/// <reference types="cypress" />

describe("homepage with default data", () => {
  beforeEach(() => {
    cy.exec("cd .. && npm run seed");
    cy.visit("http://localhost:3001");
  });

  const nameToTest = "Waffle House";
  const addressToTest = "1508 Saint Cloud Road";
  const phoneToTest = "888-888-8887";
  const cuisineToTest = "Chinese";

  it("displays three restaurants", () => {
    cy.get("#restaurants-display").children().should("have.length", 3);
  });
  it("updates the input value", () => {
    cy.get("#name").type(nameToTest);
    cy.get("#name").should("have.have.value", nameToTest);
    cy.get("#restaurant-address").type(addressToTest);
    cy.get("#restaurant-address").should("have.have.value", addressToTest);
    cy.get("#restaurant-phone").type(phoneToTest);
    cy.get("#restaurant-phone").should("have.have.value", phoneToTest);
    cy.get("#restaurant-cuisine").type(cuisineToTest);
    cy.get("#restaurant-cuisine").should("have.have.value", cuisineToTest);
  });
  it("should submit the form", () => {
    cy.get("#name").type(nameToTest);
    cy.get("#restaurant-address").type(addressToTest);
    cy.get("#restaurant-phone").type(phoneToTest);
    cy.get("#restaurant-cuisine").type(`${cuisineToTest}{enter}`);
    cy.get("#restaurants-display").children().should("have.length", 4);
    cy.contains(nameToTest);
    cy.contains(addressToTest);
    cy.contains(phoneToTest);
    cy.contains(cuisineToTest);
  });
});
