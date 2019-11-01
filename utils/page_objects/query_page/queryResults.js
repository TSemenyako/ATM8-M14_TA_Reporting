const logger = require('../../../config/logger.config');
const EC = protractor.ExpectedConditions;

class Grid {
    constructor (){
        this.queryResultsGrid = element(by.xpath("//*[contains(@class, 'k-grid-aria-root')]"));
        this.queryNameLabel = element(by.xpath("//*[contains(@class, 'ca-query-results__query-name')]"));
        this.firstRecordLink = element(by.css("[id*='-r2c1']/navigation-result-value/a/span/span"));
    }

    async isQueryLoaded(expectedQueryName) {
        let isQueryLoaded = false;
        const gridIsDisplayed = await browser.wait(EC.visibilityOf(this.queryResultsGrid), 3000);
        const actualQueryName = await this.getQueryLabel();
        if (actualQueryName == expectedQueryName && gridIsDisplayed) {
            isQueryLoaded = true;
            logger.info(`Query ${expectedQueryName} is loaded.`);
        }
        return isQueryLoaded;
    }

    async getQueryLabel() {
        const queryNameLabelText = await this.queryNameLabel.getText()
        logger.info(`Getting Query name from Query Results: "${queryNameLabelText}"`);
        return queryNameLabelText;
    }

    async isGridDisplayed() {
        logger.info(`Verifying if grid is displayed`);
        return browser.wait(EC.visibilityOf(this.queryResultsGrid), 3000);
    }
}

module.exports = Grid;