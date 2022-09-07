const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.kbc.be/');
});

test.describe('KBC - Open business account for director domiciled in Belgium', () => {

    test('Open business account for director domiciled in Belgium', async ({ page }) => {

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
        await page.locator('button.maia-button.maia-button--yes').click();

        // Fill address
        const buttonNextAddress = page.locator('button.maia-button--primary').locator('text="Next"');
        await expect(buttonNextAddress).toBeDisabled();
        await page.locator('input[placeholder="Postal code or city"]').type('9000');
        await page.locator('maia-option.ng-star-inserted.p-maia-option--active.maia-option--active').click();
        //await page.locator('maia-select-options[role="listbox"] div:has-text("9000 - GENT")').click();
        await page.locator('input[placeholder="Street"]').type('Abr');
        await page.locator('maia-select-options[role="listbox"] div:has-text("ABRAHAMSTRAAT")').click();
        await page.locator('input[placeholder="Housenumber"]').type('2');
        await expect(buttonNextAddress).toBeEnabled();
        buttonNextAddress.click();

        // Fill birth date
        const buttonNextDate = page.locator('c0b-date-of-birth button.maia-button--primary').locator('text="Next"');
        await expect(buttonNextDate).toBeDisabled();

        // Enter age<18 to get warning screen
        await page.locator('maia-input-date[formcontrolname="birthDate"]').fill('01092015');
        await expect(buttonNextDate).toBeEnabled();
        buttonNextDate.click();

        // Expect warning screen
        await expect(page).toHaveURL('https://www.kbc.be/retail/en/c0b#/generic/onboarding/warningScreen');
        await expect(page.locator('c0b-warningscreen')).toBeVisible(); //container for warning screen

        //Go back to try again and enter age>18
        await page.locator('button.close-button.maia-button--primary:has-text("Try again")').click();
        await page.locator('maia-input-date[formcontrolname="birthDate"]').fill('01092000');
        await expect(buttonNextDate).toBeEnabled();
        buttonNextDate.click();

        // Fill birth place
        const buttonNextPlace = page.locator('form[name="birthCountryForm"] button.maia-button--primary').locator('text="Next"');
        await expect(buttonNextPlace).toBeDisabled();
        await page.locator('input[placeholder="Select a country"]').click();
        await page.locator('maia-select-options[role="listbox"] div:has-text("Bulgaria")').click();
        await page.locator('input[placeholder="Place of birth"]').fill('Varna');
        await expect(buttonNextPlace).toBeEnabled();
        buttonNextPlace.click();

        // Choose Belgium or not Belgium national - no
        await page.locator('button.maia-button.maia-button--no').click();

        // Choose nationality
        const buttonNextNational = page.locator('c0b-nationality button.maia-button--primary').locator('text="Next"');
        await expect(buttonNextNational).toBeDisabled();
        await page.locator('input[placeholder="Select a country"]').type('Bulgaria');
        await page.locator('maia-select-options[role="listbox"] div:has-text("Bulgaria")').click();
        await expect(buttonNextNational).toBeEnabled();
        buttonNextNational.click();

        // Choose if you have Belgium national registration number - Yes
        const buttonNextNationalRegNum=page.locator('c0b-social-security button.maia-button--primary').locator('text="Next"');
        await expect(buttonNextNationalRegNum).toBeDisabled();
        //await page.locator('maia-checkbox#socialSecurityNumberInApplication').click(); //I don't have Belgium national registation number

        //Enter invalid Belgium national registration number
        await page.locator('maia-masked-input[id="mask_input__reactive_national_register_number"]').fill('20000901111');
        await expect(page.locator('maia-validation[type="error"]:has-text("doesn\'t correspond with your date of birth")')).toBeVisible();
        await expect(buttonNextNationalRegNum).toBeDisabled();

        //Enter valid Belgium national registration number
        await page.locator('maia-masked-input[id="mask_input__reactive_national_register_number"]').fill('00090111247');
        await expect(buttonNextNationalRegNum).toBeEnabled();
        buttonNextNationalRegNum.click();

        const buttonNextCivilState=page.locator('c0b-civil-state button.maia-button--primary').locator('text="Next"');
        await expect(buttonNextCivilState).toBeDisabled();
        await page.locator('input[placeholder="Select your marital status"]').click();
        await page.locator('maia-select-options[role="listbox"] div:has-text("living together")').click();
        await expect(buttonNextCivilState).toBeEnabled();
        buttonNextCivilState.click();

        // Check the overview and continue
        await page.locator('c0b-overview button.maia-button--primary').click();
        await page.locator('c0b-application-info-legal-questions button.maia-button--primary').locator('text="Next"').click();

        // Choose ocupation
        const buttonNextOccupation=page.locator('c0b-main-occupation button.maia-button--primary').locator('text="Next"');
        await expect(buttonNextOccupation).toBeDisabled();
        await page.locator('input[placeholder="Select your occupation"]').click();
        await page.locator('maia-select-options[role="listbox"] div:has-text("director")').click();
        await expect(buttonNextOccupation).toBeDisabled();

        await expect(page.locator('div.ng-star-inserted>>h2:has-text("What does your company do?")')).toBeVisible();
        //await page.locator('maia-select-options[role="listbox"] div:has-text("Advertising agency")').click();
        await page.locator('input[placeholder="Type and select it from this list"]').click();
        await page.locator('maia-select-options[role="listbox"] div:has-text("Advertising agency")').click();

        await expect(buttonNextOccupation).toBeEnabled();
        buttonNextOccupation.click();

        // Choose if you have second occupation
        await page.locator('button.maia-button.maia-button--yes').click();

        // Choose secondary occupation
        const buttonNextSecondOccupation=page.locator('c0b-second-occupation button.maia-button--primary').locator('text="Next"');
        await expect(buttonNextSecondOccupation).toBeDisabled();
        await page.locator('input[placeholder="Select your secondary occupation"]').click();
        await page.locator('maia-select-options[role="listbox"] div:has-text("self-employed person")').click();
        await expect(buttonNextSecondOccupation).toBeDisabled();

        await expect(page.locator('div.ng-star-inserted>>h2:has-text("What do you do on a self-employed basis?")')).toBeVisible();
        //await page.locator('maia-select-options[role="listbox"] div:has-text("Advertising agency")').click();
        await page.locator('input[placeholder="Type and select it from this list"]').click();
        await page.locator('maia-select-options[role="listbox"] div:has-text("Activities of sport clubs")').click();

        await expect(buttonNextSecondOccupation).toBeEnabled();
        buttonNextSecondOccupation.click();

        // Are you or any of your family or business contacts currently in political or public office or have you or they held such office in the past 12 months?
        const buttonNextOffice=page.locator('c0b-ppp button.maia-button--primary').locator('text="Next"');
        await expect(buttonNextOffice).toBeDisabled();
        await page.locator('maia-checkbox[role="checkbox"]:has-text("No")').click();
        await expect(buttonNextOffice).toBeEnabled();
        buttonNextOffice.click();

        // Do you receive money from or transfer money to a non-European country more than five times a month?
        await page.locator('c0b-non-european-transfer button.maia-button.maia-button--no').click();

        // Do you withdraw or deposit over 1000 euros in cash more than once a month?
        await page.locator('c0b-cash-payments button.maia-button.maia-button--no').click();

        // Do you pay taxes in a country other than Belgium?
        await page.locator('c0b-crs button.maia-button.maia-button--no').click();

        // Upload ID card photos
        const buttonNextPhotos=page.locator('c0b-upload-id button.maia-button--primary').locator('text="Next"');
        await expect(buttonNextPhotos).toBeDisabled();
        await page.locator('div.maia-input:has-text("Upload")').click();
        //const buttonSavePhotos=page.locator('c0b-upload-id button.maia-button--primary:has-text("Save")');
        const buttonSavePhotos=page.locator('button:has-text("Save")');
        await expect(buttonSavePhotos).toBeHidden();



        //Upload front ID card photo
        const uploadFront=page.locator('div.hermes-wrapper').nth(0);
        const [fileChooserFront] = await Promise.all([
            // It is important to call waitForEvent before click to set up waiting.
            page.waitForEvent('filechooser'),
            // Opens the file chooser.
            uploadFront.click(),
        ]);
        await fileChooserFront.setFiles('front.pdf');
        await page.waitForSelector('div.hermes-file.hermes-file--download-available.ng-star-inserted:has-text("front.pdf")');
        await expect(page.locator('div.hermes-name').nth(0)).toContainText('front.pdf');

        await expect(buttonSavePhotos).toBeVisible();
        await expect(buttonSavePhotos).toBeDisabled();


        // Upload back ID card photo
        const uploadBack=page.locator('div.hermes-wrapper').nth(0);
        const [fileChooserBack] = await Promise.all([
            // It is important to call waitForEvent before click to set up waiting.
            page.waitForEvent('filechooser'),
            // Opens the file chooser.
            uploadBack.click(),
        ]);
        await fileChooserBack.setFiles('back.pdf');
        await page.waitForSelector('div.hermes-file.hermes-file--download-available.ng-star-inserted:has-text("back.pdf")');
        await expect(page.locator('div.hermes-name').nth(1)).toContainText('back.pdf');

        await expect(buttonSavePhotos).toBeEnabled();
        await buttonSavePhotos.click();
        await page.frameLocator('iframe[role="presentation"]').locator('span[role="checkbox"]').click();

        await page.waitForTimeout(10000);

        await expect(buttonNextPhotos).toBeEnabled();
        await buttonNextPhotos.click();

        // Continue to finish applying
        const buttonNextFinishApplying=page.locator('c0b-thank-you button.maia-button--primary').locator('text="Next"');
        await expect(buttonNextFinishApplying).toBeEnabled();
        await buttonNextFinishApplying.click();

        // Switch to a KBC Plus Account - No
        await page.locator('maia-oscar-radio-button:has-text("Basic Account")').click();

        // Confirm the application
        const confirmButton = page.locator('button.maia-button--primary:has-text("Confirm")');
        await expect(confirmButton).toBeDisabled();
        await page.locator('maia-checkbox[name="condition"]').click();
        await expect(confirmButton).toBeEnabled();
        //confirmButton.click();
    });
});