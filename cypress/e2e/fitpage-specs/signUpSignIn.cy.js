/// <reference types="cypress" />
import signUpSignIn from "../../page_objects/signUpSignIn";
import "cypress-file-upload";
import addEventPage from "../../page_objects/addEventPage";

const url = Cypress.config("baseUrl");

Cypress.on('uncaught:exception', (err, runnable) => {
  // return false to prevent test failure
  return false;
})

describe("Sign Up and Login test cases for India running website", function () {
  it("should show error message when OTP is invalid during sign-up", function () {
    cy.visit(url);
    signUpSignIn.enterEmail();
    signUpSignIn.getOtpButton();
    cy.wait(3000);
    signUpSignIn.fillOtp();
    signUpSignIn.verifyOtpButton();
    cy.wait(2000);
    signUpSignIn.signUp();
  });

  it("should display validation message for invalid email input", function () {
    cy.visit(url);
    signUpSignIn.enterEmail1();
    signUpSignIn.getOtpButton();
    signUpSignIn.incorrectEmail();
    cy.wait(2000);
  });

  it("Login with existing user", function () {
    cy.visit(url);
    signUpSignIn.login();
    cy.wait(2000);
    cy.url().should("include", "/events/all");
    cy.wait(2000);
    addEventPage.logoutButton();
    cy.wait(2000);
  });
});

describe("Create an event on india running dashboard", function () {
  it("Create an on ground event", function () {
    cy.reload();
    cy.visit(url);
    signUpSignIn.login1();
    addEventPage.eventInformationTab();
    addEventPage.eventDetailsTab();
    addEventPage.ticketTab();
    cy.wait(2000);
    cy.url().should("include", url);
  });
});

describe("Validate an event", function () {
  it("Validate created event on the india-running website ", function () {
    cy.visit("https://ir-staging.bombayrunning.com/");
    cy.wait(2000);
    addEventPage.validateEvent();
  });
});
