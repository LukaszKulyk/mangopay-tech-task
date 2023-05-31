import { searchBarLocators } from "../locators/locators";
const { expect } = require('@playwright/test');

class SearchBar {

    constructor(page) {
        this.page = page;
        this.searchButton =  page.locator(searchBarLocators.searchBoxInputLocator);
        this.clearSearchButton = page.getByRole('button').and(page.getByLabel('Clear search'));
        this.searchBoxSearchButton = page.locator(searchBarLocators.searchBoxSearchButtonLocator);
        this.availableSearchOptionsCarousel = page.locator(searchBarLocators.availableSearchOptionsCarouselLocator);
        this.foundDestinationHeader = page.locator('h1');
        this.foundDestinationCountryHeader = page.locator('h2 > span');
        this.directionsButton = page.locator(searchBarLocators.directionsButtonLocator);
        this.seeMoreButton = page.getByRole('button').and(page.getByLabel('See more'));
        this.destinationHotelsSection = page.getByRole('heading', { name: 'Hotels' });
        this.startingPointNavigation = page.locator(searchBarLocators.startingPointNavigationInputLocator);
        this.destinationPointNavigation = page.locator(searchBarLocators.destinationPointNavigationInputLocator);
        this.destinationAdressDetails = page.locator(searchBarLocators.destinationAdressDetailsLocator).first();
        this.cantFindDestinationMessage = page.locator(searchBarLocators.cantFindDestinationMessageLocator);
    }

    async verifyIfSearchBoxInputIsVisibleOnThePage() {
        await expect(this.searchButton).toBeVisible();
    }

    async verifyIfSearchBoxInputIsEnabledOnThePage() {
        await expect(this.searchButton).toBeEnabled();
    }

    async verifyIfSearchBoxInputIsVisibleAndEnabledOnThePage() {
        await expect(this.searchButton).toBeVisible();
        await expect(this.searchButton).toBeEnabled();
    }

    async fillSearchBoxInputWithValue(value) {
        await this.searchButton.clear();
        await this.searchButton.fill(value);
    }

    async simulateKeybordButtonPress(button) {
        await this.page.keyboard.press(button);
    }

    async writeDestinationAndClickKeywordButton(destination, button){
        await this.fillSearchBoxInputWithValue(destination);
        await this.simulateKeybordButtonPress(button);
    }

    async verifyIfUrlIncludes(partOfUrl) {
        await this.page.url().includes(`place/${partOfUrl}`);
    }

    async verifyIfSearchBoxInputContainsProperValue(value) {
        await expect(this.searchButton).toHaveValue(value);
    }

    async verifyIfClearSearchButtonIsVisible() {
        await expect(this.clearSearchButton).toBeVisible();
    }

    async verifyIfSearchBoxSearchButtonIsVisible() {
        await expect(this.searchBoxSearchButton).toBeVisible();
    }

    async verifyIfAvailableSearchOptionsCarouselIsVisible() {
        await expect(this.availableSearchOptionsCarousel).toBeVisible();
    }

    async verifyIfFoundDestinationHeaderHaveProperText(text) {
        await expect(this.foundDestinationHeader).toHaveText(text);
    }

    async verifyIfFoundDestinationCountryHeaderHaveProperText(text) {
        await expect(this.foundDestinationCountryHeader).toHaveText(text);
    }

    async verifyIfDirectionsButtonIsVisible() {
        await expect(this.directionsButton).toBeVisible();
    }

    async verifyIfSeeMoreButtonisVisible() {
        await expect(this.seeMoreButton).toBeVisible();
    }

    async verifyIfIconicPlacesForDestinationAreBeingDisplayed(destinationCity) {
        await expect(this.page.getByRole('heading', { name: `Iconic ${destinationCity}` })).toBeVisible();
    }

    async verifyIfHotelsSectionIsVisible() {
        await expect(this.destinationHotelsSection).toBeVisible();
    }

    async clickOnDirectionsButton() {
        await this.directionsButton.click();
    }

    async verifyIfStartingPointNavigationIsVisible() {
        await expect(this.startingPointNavigation).toBeVisible();
    }

    async verifyIfStartingPointNavigationIsEnabled() {
        await expect(this.startingPointNavigation).toBeEnabled();
    }

    async verifyIfStartingPointNavigationIsVisibleAndEnabled() {
        await expect(this.startingPointNavigation).toBeVisible();
        await expect(this.startingPointNavigation).toBeEnabled();
    }

    async verifyIfDestinationPointNavigationHasProperAttribute(attribute, value) {
        await expect(this.destinationPointNavigation).toHaveAttribute(attribute, value);
    }

    async verifyIfDestinationAdressDetailsContainsProperText(text) {
        await expect(this.destinationAdressDetails).toContainText(text);
    }

    async verifyIfCantFindDestinationMessageContainsCorrectText(text) {
        await expect(this.cantFindDestinationMessage).toContainText(text);
    }
}

export default SearchBar;