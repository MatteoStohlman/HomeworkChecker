describe("Testing Conversion Flow", () => {
  beforeEach(() => {
    cy.fixture("conversions").as("conversions");
  });

  it("Should accept inputs and show the conversion value", function() {
    this.conversions.forEach((conversion)=>{
      cy.visit("/");

      //Set From Value
      cy
        .get('[data-cy=fromValue] input')
        .type(conversion.fromValue)
        .should("have.value", String(conversion.fromValue));

      //Type in from unit
      cy
        .get('[data-cy=fromUnit] input')
        .type(conversion.fromUnit,{force: true})
        .should("have.value", String(conversion.fromUnit));
      //Pick from unit
      cy
        .get(".MuiListItem-root")
        .contains(String(conversion.fromUnit))
        .click()

      //Type in to unit
      cy
        .get('[data-cy=toUnit] input')
        .type(conversion.toUnit,{force: true})
        .should("have.value", String(conversion.toUnit));
      //pick to unit
      cy
        .get(".MuiListItem-root")
        .contains(String(conversion.toUnit))
        .click()

      //Type Student Guess Value
      cy
        .get("[data-cy=guess] input")
        .type(conversion.guess)
        .should("have.value", String(conversion.guess));

      //Verify Result is Equal to Guess If Is is Staged to Be
      if(conversion.isCorrect){
        cy
          .get("[data-cy=result]")
          .should('have.text',String(conversion.guess))
      }


      //Verify Color is equal to expected
      cy
        .get("[data-cy=row]")
        .should('have.css', 'background-color')
        .and('eq', conversion.isCorrect?'rgb(223, 239, 216)':'rgb(255, 224, 224)')
    })
  });

});
