const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.kbc.be/');
});

test.describe('KBC - Open business account for non-domiciled in Belgium', () => {

    test('Open business account for non-domiciled in Belgium', async ({ page }) => {

        await page.frameLocator('iframe[title="TrustArc Cookie Consent Manager"]').locator('a.call').click();

        // Check if the URL is the expected one
        await expect(page).toHaveURL('https://www.kbc.be/particulieren/nl.html');

        // Change language
        await page.locator('button[aria-controls="language-nav-list"]').click();

        // Change the language to EN
        await page.locator('a[data-lang="en"]').click();
        await expect(page).toHaveURL('https://www.kbc.be/retail/en.html?zone=topnav');

        await page.locator('div.site-switch__item>>a:has-text("Businesses")').click();

        // Click the button for openning a business account
        await page.locator('a[title="Open your business account now"]').click();
        await expect(page).toHaveURL('https://www.kbc.be/business/en/products/making-and-receiving-payments/business-accounts/business-pro-account.html?zone=homepage-header');
        await page.locator('a[title="Open your business account plus free personal account now"] >> nth=0').click();

        await page.locator('a[title="Open the account online "]').click();

        // Choose to open an account for your self-employed activity
        await page.locator('maia-oscar-radio-button>>span.maia-label:has-text("Your self-employed activity")').click();

        await page.locator('button.lets-go-button.maia-button--primary').click();

        // Fill email
        const buttonNextEmail = page.locator('c0b-email button.maia-button--primary').locator('text="Next"');
        const errorMessage=page.locator('maia-validation[type="error"]');
        await expect(buttonNextEmail).toBeDisabled();
        await page.locator('input[formcontrolname="email"]').fill('elitsatodorova');
        await expect(errorMessage).toBeVisible();
        await expect(buttonNextEmail).toBeDisabled();
        await page.locator('input[formcontrolname="email"]').fill('elitsatodorova@kbc.com');
        await expect(buttonNextEmail).toBeEnabled();
        buttonNextEmail.click();

        // Fill mobile phone
        const buttonNextPhone = page.locator('c0b-mobilenumber button.maia-button--primary').locator('text="Next"');
        await expect(buttonNextPhone).toBeDisabled();
        await page.locator('input[name="mobileNumber"]').fill('4721414');
        await page.locator('h1:has-text("On which mobile number may we call you?")').click(); //need to click somewhere to get the error message
        await expect(errorMessage).toBeVisible();
        await expect(buttonNextPhone).toBeDisabled();
        await page.locator('input[name="mobileNumber"]').fill('472141414');
        await expect(buttonNextPhone).toBeEnabled();
        buttonNextPhone.click();

        //Choice for having or no itsme
        await page.locator('button.maia-button.maia-button--no').click();

        // Choose gender
        await page.locator('maia-oscar-radio-button[value="V"]').click();

        // Fill name
        const buttonNextName = page.locator('button.maia-button--primary').locator('text="Next"');
        await expect(buttonNextName).toBeDisabled();
        await page.locator('input[name="firstName"]').fill('123');
        await expect(errorMessage.nth(0)).toBeVisible();
        await page.locator('input[name="lastName"]').fill('#%&&');
        await expect(errorMessage.nth(1)).toBeVisible();
        await expect(buttonNextName).toBeDisabled();
        await page.locator('input[name="firstName"]').fill('Elitsa');
        await page.locator('input[name="lastName"]').fill('Todorova');
        await expect(buttonNextName).toBeEnabled();
        buttonNextName.click();

        // Are you currently domiciled in Belgium?
        await page.locator('button.maia-button.maia-button--no').click();

        // Expect warning screen
        await expect(page).toHaveURL('https://www.kbc.be/retail/en/c0b#/generic/onboarding/warningScreen');
        await expect(page.locator('c0b-warningscreen')).toBeVisible(); //container for warning screen

    });
});