const { test, expect } = require('@playwright/test');
import { searchBarLocators } from '../locators/locators';
import SearchBar from '../pages/SearchBar';

const testData = {

    firstDestination: {
        city: 'Paris',
        country: 'France'
    },
    secondDestination: {
        city: 'London',
        country: 'United Kingdom'
    },
    thirdDestination: {
        city: 'Florence',
        country: 'Italy',
        coordinationsDD: '43.7799286 11.158567'
    },
    fourthDestination: {
        city: 'Stavanger',
        country: 'Norway',
        coordinationsDMS: "5°42'E 58°58'N"
    },
    fifthDestination: {
        city: 'Barcelona',
        country: 'Spain',
        coordinationsDMM: '41 24.2028, 2 10.4418'
    },
    sixthDestination: {
        place: 'Arctic Ocean',
        coordinationsDD: '90.00000, 180.00000'
    },

    lastCorrectCoordinations: {
        NS: '90.00000',
        WE: '180.00000'
    },

    wrongCooridnations: {
        NS: '90.00001',
        WE: '180.00001'
    },

    cantFindCoordinationMessage: "Google Maps can't find"
};

const confirmUrl = "https://www.google.com/maps";

test.describe('Verify google maps search bar', () => {

    test.use({ 
        locale: 'en-GB',
        timezoneId: 'Europe/Paris',
      });

    test.beforeEach(async ({ page }) => {
        
        await page.goto('/maps')
        const acceptAllCoockiesButtonLocator  = page.getByRole('button', { name: 'Accept all' });
        acceptAllCoockiesButtonLocator.click();
        await expect(page).toHaveURL(confirmUrl);

        const searchBar = new SearchBar(page);
        
        await searchBar.verifyIfSearchBoxInputIsVisibleAndEnabledOnThePage();
    })

    test('Verify if search button returns proper Paris value in case of writing Paris in search field.', async ({ page }) => {
        
        const searchBar = new SearchBar(page);

        await searchBar.writeDestinationAndClickKeywordButton(testData.firstDestination.city, 'Enter');

        await page.waitForSelector(searchBarLocators.availableSearchOptionsCarouselLocator);

        await searchBar.verifyIfUrlIncludes(testData.firstDestination.city);
        await searchBar.verifyIfSearchBoxInputContainsProperValue(testData.firstDestination.city);
        await searchBar.verifyIfClearSearchButtonIsVisible();
        await searchBar.verifyIfSearchBoxSearchButtonIsVisible();
        await searchBar.verifyIfAvailableSearchOptionsCarouselIsVisible();
        await searchBar.verifyIfFoundDestinationHeaderHaveProperText(testData.firstDestination.city);
        await searchBar.verifyIfFoundDestinationCountryHeaderHaveProperText(testData.firstDestination.country);
        await searchBar.verifyIfDirectionsButtonIsVisible();
        await searchBar.verifyIfSeeMoreButtonisVisible();

        await searchBar.verifyIfIconicPlacesForDestinationAreBeingDisplayed(testData.firstDestination.city);
        await searchBar.verifyIfHotelsSectionIsVisible();
    })

    test('Verify if directions are being correctly suggested in case of clicking directions button.', async ({ page }) => {
        
        const searchBar = new SearchBar(page);

        await searchBar.writeDestinationAndClickKeywordButton(testData.secondDestination.city, 'Enter');

        await page.waitForSelector(searchBarLocators.availableSearchOptionsCarouselLocator);

        await searchBar.verifyIfUrlIncludes(testData.secondDestination.city);
        await searchBar.verifyIfSearchBoxInputContainsProperValue(testData.secondDestination.city);
        await searchBar.verifyIfClearSearchButtonIsVisible();
        await searchBar.verifyIfSearchBoxSearchButtonIsVisible();
        await searchBar.verifyIfAvailableSearchOptionsCarouselIsVisible();
        await searchBar.verifyIfFoundDestinationHeaderHaveProperText(testData.secondDestination.city);
        await searchBar.verifyIfFoundDestinationCountryHeaderHaveProperText(testData.secondDestination.country);
        await searchBar.verifyIfSeeMoreButtonisVisible();

        await searchBar.verifyIfIconicPlacesForDestinationAreBeingDisplayed(testData.secondDestination.city);
        await searchBar.verifyIfHotelsSectionIsVisible();

        await searchBar.verifyIfDirectionsButtonIsVisible();
        await searchBar.clickOnDirectionsButton();

        await searchBar.verifyIfStartingPointNavigationIsVisibleAndEnabled();
        await searchBar.verifyIfDestinationPointNavigationHasProperAttribute('aria-label', 'Destination London, UK');

    })

    test('Verify if it is possible to find destination by writing proper coordinates in DD format.', async ({ page }) => {

        const searchBar = new SearchBar(page);

        await searchBar.writeDestinationAndClickKeywordButton(testData.thirdDestination.coordinationsDD, 'Enter');

        await page.waitForSelector(searchBarLocators.availableSearchOptionsCarouselLocator);

        await searchBar.verifyIfDestinationAdressDetailsContainsProperText(`${testData.thirdDestination.city}, ${testData.thirdDestination.country}`);
    })

    test('Verify if it is possible to find destination by writing proper coordinates in DMS format.', async ({ page }) => {

        const searchBar = new SearchBar(page);

        await searchBar.writeDestinationAndClickKeywordButton(testData.fourthDestination.coordinationsDMS, 'Enter');

        await page.waitForSelector(searchBarLocators.availableSearchOptionsCarouselLocator);

        await searchBar.verifyIfDestinationAdressDetailsContainsProperText(`${testData.fourthDestination.city}, ${testData.fourthDestination.country}`);
    })

    test('Verify if it is possible to find destination by writing proper coordinates in DMM format.', async ({ page }) => {

        const searchBar = new SearchBar(page);

        await searchBar.writeDestinationAndClickKeywordButton(testData.fifthDestination.coordinationsDMM, 'Enter');

        await page.waitForSelector(searchBarLocators.availableSearchOptionsCarouselLocator);

        await searchBar.verifyIfDestinationAdressDetailsContainsProperText(`${testData.fifthDestination.city}, ${testData.fifthDestination.country}`);
    })

    test('Verify if google maps validates last proper coordinations.', async ({ page }) => {

        const searchBar = new SearchBar(page);

        await searchBar.writeDestinationAndClickKeywordButton(`${testData.lastCorrectCoordinations.NS}, ${testData.lastCorrectCoordinations.WE}`, 'Enter');

        await page.waitForSelector(searchBarLocators.availableSearchOptionsCarouselLocator);

        await searchBar.verifyIfDestinationAdressDetailsContainsProperText(testData.sixthDestination.place);
    })

    test('Verify if google maps validates coordinations out of scale.', async ({ page }) => {

        const searchBar = new SearchBar(page);

        await searchBar.writeDestinationAndClickKeywordButton(`${testData.wrongCooridnations.NS}, ${testData.lastCorrectCoordinations.WE}`, 'Enter');

        await page.waitForSelector(searchBarLocators.cantFindDestinationMessageLocator);

        await searchBar.verifyIfCantFindDestinationMessageContainsCorrectText(`${testData.cantFindCoordinationMessage} ${testData.wrongCooridnations.NS}, ${testData.lastCorrectCoordinations.WE}`);

        await searchBar.writeDestinationAndClickKeywordButton(`${testData.lastCorrectCoordinations.NS}, ${testData.wrongCooridnations.WE}`, 'Enter');

        await page.waitForSelector(searchBarLocators.cantFindDestinationMessageLocator);

        await searchBar.verifyIfCantFindDestinationMessageContainsCorrectText(`${testData.cantFindCoordinationMessage} ${testData.lastCorrectCoordinations.NS}, ${testData.wrongCooridnations.WE}`);
    })
})