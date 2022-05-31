describe("Integration Test", () => {
  it("Visits the Home page", () => {
    cy.visit("http://localhost:3000/");
  });

  const addItems = [
    "Buy groceries",
    "Complete tutorial",
    "Do laundry",
    "Read a book",
    "Do Yoga",
  ];
  const editedArr = [
    "Buy groceries",
    "Do laundry",
    "Read a book",
    "Finish assignment",
  ];

  it("Adds Items", () => {
    cy.contains("Add To Do Item").click();
    cy.url().should("include", "/add");
    addItems.map((item) => {
      cy.get("#inputField").type(item);
      cy.get("#button").click();
    });
    cy.contains("Home").click();
  });

  it("Checks if all items are added", () => {
    cy.get("#HomeTable").find("tr").should("have.length", 6);
    addItems.map((item) => {
      cy.should("contain", item);
    });
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
    editedArr.map((item) => {
      cy.get("#TableView").should("contain", item);
    });
  });
  it("Checks if item was deleted", () => {
    cy.get("#HomeButton").click();
    cy.get("#HomeTable").find("tr").should("have.length", 5);
  });

  it("Checks if items remain checked after changing page", () => {
    cy.get("#checkedInput").check();
    cy.contains("Add To Do Item").click();
    cy.contains("Home").click();
    cy.get("#checkedInput").should("be.checked");
  });
});
