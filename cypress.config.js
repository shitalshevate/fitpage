const { defineConfig } = require("cypress");
require('dotenv').config(); // 
module.exports = defineConfig({
  projectId: 'fy6zev',
  e2e: {
    baseUrl: "https://indiarunning-organizer-dashboard-staging.bombayrunning.com",
    env: {
      API_KEY: process.env.API_KEY, 
    },
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}", 
  },
projectId: "fy6zev",
});
