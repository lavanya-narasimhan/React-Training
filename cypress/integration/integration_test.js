describe("Integration Test", () => {
  it("Visits the Home page", () => {
    cy.visit("http://localhost:3000/");
  });

  it("Adds Items", () => {
    cy.contains("Add To Do Item").click();
    cy.url().should("include", "/add");
    cy.get("#inputField").type("Buy groceries");
    cy.get("#button").click();
    cy.get("#inputField").type("Complete tutorial");
    cy.get("#button").click();
    cy.get("#inputField").type("Do laundry");
    cy.get("#button").click();
    cy.get("#inputField").type("Read a book");
    cy.get("#button").click();
    cy.get("#inputField").type("Do Yoga");
    cy.get("#button").click();
    cy.contains("Home").click();
  });

  it("Checks if all items are added", () => {
    cy.get("#HomeTable").find("tr").should("have.length", 6);
  });

  it("Deletes an item", () => {
    cy.contains("Edit To Do Items").click();
    cy.url().should("include", "/edit");
    cy.contains("td", "2").siblings().contains("button", "Delete").click();
    cy.contains("td", "2").siblings().contains("Do laundry");
  });

  it("Edits an item", () => {
    cy.contains("td", "4").siblings().contains("button", "Edit").click();
    cy.contains("td", "4").siblings().get("#editedText").clear();
    cy.contains("td", "4")
      .siblings()
      .get("#editedText")
      .type("Finish assignment");
    cy.contains("td", "4").siblings().get("#SaveButton").click();
  });

  it("Checks if item was edited", () => {
    cy.contains("td", "4").siblings().should("contain", "Finish assignment");
  }),
    it("Checks if item was deleted", () => {
      cy.get("#HomeButton").click();
      cy.get("#HomeTable").find("tr").should("have.length", 5);
    });
});
