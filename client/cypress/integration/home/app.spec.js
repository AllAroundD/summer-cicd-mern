/* eslint no-undef: 0 */
/// <reference types="cypress" />

describe("homepage with default data", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3001");
  });

  it("displays three restaurants", () => {
    cy.get("#restaurants-display").children().should("have.length", 3);
  });
  it("updates the input value", () => {
    cy.get("#name").type("Waffle House");
  });
});
