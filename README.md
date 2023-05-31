# MANGOPAY - Test Automation Framework for google.maps webpage.
## Summary
This repository contains Test Automation Framework for google.maps webpage. It is a part of **MANGOPAY** recruitment process. Framework has been done using Playwright and javascript. Only Playwright documentation ([playwright.dev](https://playwright.dev/)) has been used during development for any code verification and ideas. 

Solution has been done using Page Object Model design pattern. In my case I needed only one search bar page. All the locators are being kept in locators.js file for easy maintanance. Please keep in mind that this solution is my first true experience with playwright and there can be some antipatterns or not the best ways of doing some things.

As a part of the solution framework is configurated in the way of making screenshot in case of test failure. It is done by the `screenshot: 'only-on-failure'` parameter set in configuration file. 

Videos are being captured for all the tests but for all of the tests which have passed videos are being removed. Only videos for test failures are being kept. For doing that `video: 'retain-on-failure'` parameter is set in configuration file.

Solution contains few build in reportes:
* `html` -> this parameter creates reports as html file.
* `list` -> this parameter displays all the steps in the console.
* `json` -> this parameter creates json file with all the results.

Solution includes two required test cases and covers also few more scenarios:
* Verify if search button returns proper Paris value in case of writing Paris in search field.
* Verify if directions are being correctly suggested in case of clicking directions button.
* Verify if it is possible to find destination by writing proper coordinates in DD format.
* Verify if it is possible to find destination by writing proper coordinates in DMS format.
* Verify if it is possible to find destination by writing proper coordinates in DMM format.
* Verify if google maps validates last proper coordinations.
* Verify if google maps validates coordinations out of scale.

As a bonus I have decided to add simple CI/CD to the solution using GitHub Actions. GitHub Actions makes sure that the tests are running whenever new changes are going to be pushed to the repository.

## Instructions
To run tests locally follow the steps below:
1. Install dependences `npm install`
2. Init playwright `npm init playwright@latest`
3. Run tests from the command line `npx playwright test`
4. (Optional) To run the tests with UI preview to manage tests: `npx playwright test --ui`
5. (Optional) To see html report: `npx playwright show-report`

## Additional Information

**Page Load Time Testing** measures the time it takes for a web page to fully load in a browser. For testing it we can user for example Puppetter library. To do this in playwright we can use its ability to make HTTP requests and measure the time taken for the responses.

**API Performance Testing** can be done by running requests and measue it's response times. We can for example assume that we expect each response time to be below some value and measure it easly during API testing by verifying response time.

**Accessibility Testing** can be done for example with Axe tool. This is an open-source accessibility testing library and it is very popular in that testing area.