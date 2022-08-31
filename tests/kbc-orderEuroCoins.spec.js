const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.kbc.be/');
});

test.describe('KBC - Order euro coins', () => {

    test('Order euro coins', async ({ page }) => {

        await page.frameLocator('iframe[title="TrustArc Cookie Consent Manager"]').locator('a.call').click();

        // Check if the URL is the expected one
        await expect(page).toHaveURL('https://www.kbc.be/particulieren/nl.html');

        // Click on the button for language change
        await page.locator('button[aria-controls="language-nav-list"]').click();

        // Change the language to EN
        await page.locator('a[data-lang="en"]').click();
        await expect(page).toHaveURL('https://www.kbc.be/retail/en.html?zone=topnav');

        //Search for banknotes
        const searchInput="coins";
        await page.locator('input.aem-searchbar__input[type="search"] >> nth=0').fill(searchInput);
        await page.locator('button.aem-searchbar__button[aria-label="Submit the search request"] >> nth=0').click();
        await expect(page).toHaveURL('https://www.kbc.be/retail/en/search.html?q='+searchInput+'&zone=topnav');

        //Select Order for euro banknotes URL
        await page.locator('a:has-text("Ordering euro banknotes and coins online")').click();
        await page.locator('a[title="Order euro coins"]').click();
        await page.waitForURL('https://www.kbc.be/retail/en/processes/payments/order-for-euro-coins.html');

        //Fill personal details
        await page.locator('input[name="firstname"]').fill('Elitsa');
        await page.locator('input[name="name"]').fill('Todorova');
        await page.locator('input#bestelling-euromunten-en_birthdate').fill('01-09-2000');
        await page.locator('input[name="email"]').fill('elitsatodorova@kbc.com');
        await page.locator('input[name="phone"]').fill('0885292055');

        //Fill order for euro coins
        const roll='1';
        await page.locator('input[name="euro2"]').fill(roll);
        await page.locator('input[name="euro1"]').fill(roll);
        await page.locator('input[name="cent50"]').fill(roll);
        await page.locator('input[name="cent20"]').fill(roll);
        await page.locator('input[name="cent10"]').fill(roll);
        await page.locator('input[name="cent05"]').fill(roll);
        await page.locator('input[name="cent02"]').fill(roll);
        await page.locator('input[name="cent01"]').fill(roll);

        const locatorTotalAmount = page.locator('input[name="totalAmount"]');
        locatorTotalAmount.click();
        await expect(locatorTotalAmount).toHaveValue("111.00");

        //Select branch
        const branch='9000';
        await page.locator('input#google-places-autocomplete__0').fill(branch);
        await page.locator('span.btn:has-text("Find branch")').click();

        const locatorOffice = page.locator('select[name="officeNumber"]');
        await locatorOffice.selectOption(["ORG7426", "ORG7441","ORG3395","ORG7439"]);
        await page.frameLocator('iframe[role="presentation"]').locator('span[role="checkbox"]').click();
    });

});