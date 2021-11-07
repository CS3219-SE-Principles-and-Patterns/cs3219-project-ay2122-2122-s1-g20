describe("Login form", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it.only("Successfully loads!", () => {
    cy.focused().should("have.id", "email");
  });

  it.only("Email field accepts input", () => {
    const testEmail = "tester123@gmail.com";
    cy.get("#email").type(testEmail).should("have.value", testEmail);
  });

  it.only("Password field accepts input", () => {
    const testPassword = "testpassword";
    cy.get("#password").type(testPassword).should("have.value", testPassword);
  });

  // it.only("Form submission successful", () => {
  //   cy.request("POST", "http://localhost:8080/api/user/login", {
  //     email: "tester123@gmail.com",
  //     password: "testpassword",
  //   }).then((response) => {
  //     expect(response.status).to.eq(422);
  //     expect(response.body).to.have.property(
  //       "message",
  //       "This email is not registered with us."
  //     );
  //   });
  // });
});
