import testData from "../fixtures/testData.json";
import { faker } from "@faker-js/faker";
import "cypress-file-upload";

const randomEmail = faker.internet.email();
const randomPhoneNumber = faker.phone.number();
const today = new Date().toISOString().split("T")[0];

class signUpSignIn {
  enterEmail() {
    cy.get("#email").eq(0).click().should("be.visible").type(randomEmail);
  }

  enterEmail1() {
    cy.get("#email").eq(0).click().should("be.visible").type(testData.email1);
  }

  enterEmail2() {
    cy.get("#email").eq(0).click().should("be.visible").type(testData.email2);
  }

  enterExistingEmail() {
    cy.get("#email").eq(0).click().should("be.visible").type(testData.email);
  }

  getOtpButton() {
    cy.contains("button", "Get OTP").click();
  }

  verifyOtpButton() {
    cy.contains("button", "Verify OTP").click();
  }

  fillOtp(otp = "1234") {
    [...otp].forEach((digit, i) => {
      cy.get(`#otp${i}`).type(digit);
    });
  }

  firstName() {
    cy.get("#firstName").type(testData.firstName);
  }

  lastName() {
    cy.get("#lastName").type(testData.lastName);
  }

  phoneNumber() {
    cy.get(".form-control").type(randomPhoneNumber);
  }

  organizationName() {
    cy.get("#organization-name").type(testData.organizationName);
  }

  continueButton() {
    cy.contains("button", "Continue").click();
  }

  dashboardHeader() {
    cy.get(
      ":nth-child(1) >:nth-child(1) > div:nth-child(1) > div:nth-child(1) > span:nth-child(1)"
    ).should("have.text", "My Events");
  }

  incorrectOtp() {
    cy.get(".text-red-500.mt-2.text-left").should(
      "have.text",
      testData.incorrectOtp
    );
  }

  incorrectEmail() {
    cy.get(".mt-2.text-red-500").should("have.text", testData.incorrectEmail);
  }

  signUp() {
    cy.contains(testData.emailCreation);
    cy.wait(2000);
    this.firstName();
    this.lastName();
    this.phoneNumber();
    this.organizationName();
    this.continueButton();
    this.fillOtp();
    cy.wait(2000);
    this.verifyOtpButton();
    cy.wait(2000);
    this.incorrectOtp();
  }

  login() {
    this.enterExistingEmail();
    this.getOtpButton();
    this.fillOtp();
    this.verifyOtpButton();
    this.dashboardHeader();
  }

  login1() {
    this.enterEmail2();
    this.getOtpButton();
    this.fillOtp();
    this.verifyOtpButton();
    this.dashboardHeader();
  }
}

export default new signUpSignIn();
