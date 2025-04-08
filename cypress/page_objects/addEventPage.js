import testData from "../fixtures/testData.json";
import { faker } from "@faker-js/faker";
import "cypress-file-upload";

const randomEmail = faker.internet.email();
const randomPhoneNumber = faker.phone.number();
const today = new Date().toISOString().split("T")[0];

class addEventPage {
clickCreateEventButton() {
    cy.get(
      "div[class='absolute right-0 z-10 px-4 py-3 text-base font-medium text-white rounded-lg cursor-pointer text-end bg-primary-500 hover:bg-primary-400']"
    ).click();
  }

  verifyEventInfoTab() {
    cy.get(
      "div[class='flex flex-row justify-center w-full'] div:nth-child(1) div:nth-child(1) div:nth-child(1) div:nth-child(2) p:nth-child(1)"
    ).should("have.text", "Event Information");
  }

  typeEventName() {
    cy.get("input[id='Event Name_text']").type(testData.eventName);
  }

  onGroundEvent() {
    cy.get("#On-Ground").click().should("be.checked");
  }

  startDate() {
    cy.get("#event_start_date").type("2025-04-09");
  }

  endDate() {
    cy.get("#event_end_date").type("2025-12-07");
  }

  saveAndProceedButton() {
    cy.get(".px-3").click();
  }

  locationInput() {
    cy.get("input[placeholder='Search location here']").type("BKC");
  }

  checkLocationsuggestion() {
    cy.contains(
      "Bandra Kurla Complex, Bandra East, Mumbai, Maharashtra, India",
      { timeout: 10000 }
    ).click();
  }

  addressField() {
    cy.get("#Address_text").should(
      "have.value",
      "Diamond Market Rd, G Block BKC, Bandra Kurla Complex, Bandra East, Mumbai, Maharashtra 400051, India"
    );
  }

  areaText() {
    cy.get("#Area_text").should("have.value", "G Block BKC");
  }

  aboutRaceInput() {
    cy.get(".ql-editor").type("50km race");
  }

  uploadPhoto() {
    cy.fixture("runToday.jpg", "base64").then((fileContent) => {
      cy.get("span[class='pt-4']").attachFile(
        {
          fileContent,
          fileName: "runToday.jpg",
          mimeType: "image/jpg",
          encoding: "base64",
        },
        { subjectType: "drag-n-drop", force: true }
      );
    });
  }

  city() {
    cy.get("#City_text").should("have.value", "Mumbai");
  }

  state() {
    cy.get("#State_text").should("have.value", "Maharashtra");
  }

  pinCode() {
    cy.get("#PinCode").should("have.value", "400051");
  }

  completedEventInformation() {
    cy.get(
      "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > form:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1)"
    ).should("be.visible");
  }
  //Commented code as did not work for image upload
  // cropButton() {
  //   return cy
  //     .get(".justify-between > .text-white", { timeout: 5000 })
  //     .should("be.visible")
  //     .click();
  // }

  // saveCroppedImageButton() {
  //   return cy
  //     .get(".inline-flex", { timeout: 5000 })
  //     .should("be.visible")
  //     .click();
  // }

  activityTypeRunning() {
    cy.get("#Running").click().should("be.checked");
  }

  distanceDropdown() {
    cy.get('[id="tickets.0.distance"]').select("50 Kilometers Ultra");
  }

  nameOfCategory() {
    cy.get("input[id='Name of the Category_text']").type("50 KM Race");
  }

  addTicketPrice() {
    cy.get("input[id='Base Price']").type("500");
  }

  minAgeForReg() {
    cy.get("input[id='Age Limit for Registration']").type("18");
  }

  // maxAgeForReg(){
  //   cy.get("#Maximum Age (optional)").type("60");
  // }

  regOpenDate() {
    cy.get(
      "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > form:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(18) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1)"
    )
      .clear()
      .type(today);
  }

  regOpenTime() {
    cy.get(
      "body > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > form:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(18) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > input:nth-child(1)"
    )
      .clear()
      .type("07:00");
  }

  updateTicketButton() {
    cy.get("button[type='button']").click();
  }

  proceedToCreateFormButton() {
    cy.get(
      "button[class='px-6 py-3 text-base font-medium text-white rounded-lg cursor-pointer bg-primary-500 hover:bg-primary-400']"
    ).click();
  }

  publishEventButton() {
    cy.contains("button ", "Publish Now").click();
  }

  yesConfirmButton() {
    cy.get(
      "button[class='inline-flex justify-center w-full px-2 py-2 mt-3 text-xs font-medium text-white border-2 rounded-md md:px-12 md:py-4 md:text-base bg-primary-500 hover:bg-primary-400 border-primary-500 sm:mt-0 sm:w-auto ']"
    ).click();
  }

  searchEvent() {
    cy.get("input[placeholder='Search by events or city']").type(
      testData.eventName
    ).click();
  }

  validateCreatedEvent() {
    cy.get(
      "a:nth-child(1) div:nth-child(1) div:nth-child(2) div:nth-child(3) div:nth-child(1)"
    ).should("have.text", testData.eventName);
  }

  logoutButton() {
    cy.get(
      ".flex.items-center.justify-center.cursor-pointer.bg-gradient-to-r.from-secondary-700.to-secondary-800.h-sideNavMenuHeight"
    ).click();
  }

  checkPublishedEvent() {
    cy.get('#root > div > div:nth-child(1) > div.flex.flex-col.pl-24 > div.bg-modal-bg-blue.px-6.false > div.h-screen.overflow-auto > div:nth-child(1) > div > div.w-full.ml-6.text-start > div.flex.items-center.justify-between.pt-1 > div.flex.items-center > div:nth-child(1) > span > span > span')
  .should('be.visible')

  }

  liveEventPopUp() {    
    cy.get("img[alt='pop-up-icon']").should('be.visible');
  }

  closePopUpButton() {
    cy.get(".w-5.h-5.cursor-pointer").click();
  }

  eventInformationTab() {
    this.clickCreateEventButton();
    this.verifyEventInfoTab();
    this.typeEventName();
    this.onGroundEvent();
    this.startDate();
    this.endDate();
    this.locationInput();
    this.checkLocationsuggestion();
    this.addressField();
    this.areaText();
    this.city();
    this.state();
    this.pinCode();
    this.saveAndProceedButton();
    cy.wait(2000);
    this.completedEventInformation();
  }

  eventDetailsTab() {
    this.aboutRaceInput();
    this.uploadPhoto(); //Tried many ways to upload image but not able to upload, cant see on UI
    cy.wait(2000);
    this.saveAndProceedButton();
    cy.wait(2000);
  }

  ticketTab() {
    this.activityTypeRunning();
    cy.wait(2000);
    this.distanceDropdown();
    cy.wait(2000);
    this.nameOfCategory();
    this.addTicketPrice();
    this.minAgeForReg();
    cy.wait(2000);
    this.regOpenDate();
    cy.wait(2000);
    this.regOpenTime();
    cy.wait(2000);
    this.updateTicketButton();
    cy.wait(2000);
    this.proceedToCreateFormButton();
    this.publishEventButton();
    cy.wait(2000);
    this.yesConfirmButton();
    cy.wait(2000);
    this.liveEventPopUp();
    cy.wait(3000);
    this.closePopUpButton();
    cy.wait(2000);
    this.checkPublishedEvent();
    cy.wait(2000); 
    this.logoutButton();
  }

  validateEvent() {
    this.searchEvent();
    cy.wait(3000);
    this.validateCreatedEvent();
    cy.wait(2000);
  }
}
  export default new addEventPage()