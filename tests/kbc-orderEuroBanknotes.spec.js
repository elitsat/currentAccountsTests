const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.kbc.be/');
});

test.describe('KBC - Order euro banknotes', () => {

    test('Order euro banknotes', async ({ page }) => {
        //page.frameLocator('role="dialog"').locator('text=Aanvaard alle doelen').click();

        //await page.frameLocator('div[aria-label="Your choices regarding the use of cookies on this site"]').locator('span[role="checkbox"]').click();
        await page.frameLocator('iframe[title="TrustArc Cookie Consent Manager"]').locator('a.call').click();


        // Check if the URL is the expected one
        await expect(page).toHaveURL('https://www.kbc.be/particulieren/nl.html');
        //await page.locator('a.call').click();
        // page.on('dialog', dialog => dialog.accept());

        // Click on the button for language change
        await page.locator('button[aria-controls="language-nav-list"]').click();

        // Change the language to EN
        await page.locator('a[data-lang="en"]').click();
        await expect(page).toHaveURL('https://www.kbc.be/retail/en.html?zone=topnav');

        //Search for banknotes
        const searchInput="banknotes";
        await page.locator('input.aem-searchbar__input[type="search"] >> nth=0').fill(searchInput);
        await page.locator('button.aem-searchbar__button[aria-label="Submit the search request"] >> nth=0').click();
        await expect(page).toHaveURL('https://www.kbc.be/retail/en/search.html?q='+searchInput+'&zone=topnav');

        //Select Order for euro banknotes URL
        await page.locator('a:has-text("Order for euro banknotes")').click();
        await page.waitForURL('https://www.kbc.be/retail/en/processes/payments/order-for-euro-banknotes.html');

        //Fill personal details
        await page.locator('input[name="firstname"]').fill('Elitsa');
        await page.locator('input[name="name"]').fill('Todorova');
        await page.locator('input#bestelling-eurobiljetten-en_birthdate').fill('01-09-2000');
        await page.locator('input[name="email"]').fill('elitsatodorova@kbc.com');
        await page.locator('input[name="phone"]').fill('0885292055');

        //Fill order for euro banknotes
        //await page.locator('select#bestelling-eurobiljetten-en_fivehundredEuro').toBeDisabled();

        const locatorFiveHundredEuro = page.locator('select#bestelling-eurobiljetten-en_fivehundredEuro');
        await locatorFiveHundredEuro.selectOption(["0"]);
        await !expect(locatorFiveHundredEuro).toBeEditable();
        const euro='1';
        await page.locator('input[name="twohundredEuro"]').fill(euro);
        await page.locator('input[name="onehundredEuro"]').fill(euro);
        await page.locator('input[name="fiftyEuro"]').fill(euro);
        await page.locator('input[name="twintyEuro"]').fill(euro);
        await page.locator('input[name="tenEuro"]').fill(euro);
        await page.locator('input[name="fiveEuro"]').fill(euro);

        const locatorTotalAmount = page.locator('input[name="totalAmount"]');
        locatorTotalAmount.click();
        await expect(locatorTotalAmount).toHaveValue("4375");

        //Select branch
        const branch='9000';
        await page.locator('input#google-places-autocomplete__0').fill(branch);
        await page.locator('span.btn:has-text("Find branch")').click();

        const locatorOffice = page.locator('select[name="officeNumber"]');
        await locatorOffice.selectOption(["ORG7426", "ORG7441","ORG3395","ORG7439"]);
        await page.frameLocator('iframe[role="presentation"]').locator('span[role="checkbox"]').click();


    });

});