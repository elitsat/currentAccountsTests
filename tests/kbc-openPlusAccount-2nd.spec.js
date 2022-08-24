const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.kbc.be/');
});

test.describe('KBC - Open plus account for myself and someone else', () => {

    test('Open plus account for myself and someone else', async ({ page }) => {

        await page.frameLocator('iframe[title="TrustArc Cookie Consent Manager"]').locator('a.call').click();

        // Check if the URL is the expected one
        await expect(page).toHaveURL('https://www.kbc.be/particulieren/nl.html');

        // Change language
        await page.locator('button[aria-controls="language-nav-list"]').click();

        // Change the language to EN
        await page.locator('a[data-lang="en"]').click();
        await expect(page).toHaveURL('https://www.kbc.be/retail/en.html?zone=topnav');

        // Click the button for openning an account
        await page.locator('a[title="Open your current account now"]').click();
        await expect(page).toHaveURL('https://www.kbc.be/retail/en/products/payments/current-accounts/compare-current-accounts.html?zone=homepage-header');

        // Choose plus account
        await page.locator('a[href="/retail/en/processes/payments/current-accounts/open-plus-account.html"]').click();
        await expect(page).toHaveURL('https://www.kbc.be/retail/en/processes/payments/current-accounts/open-plus-account.html');

        await page.locator('a[title="Open the account online"]').nth(0).click();
        await expect(page).toHaveURL('https://www.kbc.be/retail/en/processes/payments/current-accounts/open-current-account.html?producttype=3846&synonym=');

        // Open an account for myself
        await page.locator('maia-oscar-radio-button').locator('text="Myself and someone else"').click();
        await page.locator('button.lets-go-button.maia-button--primary').click();

        // Fill email
        const buttonNextEmail = page.locator('c0b-email button.maia-button--primary').locator('text="Next"');
        await expect(buttonNextEmail).toBeDisabled();
        await page.locator('input[formcontrolname="email"]').fill('elitsatodorova@kbc.com');
        await expect(buttonNextEmail).toBeEnabled();
        buttonNextEmail.click();

        // Fill mobile phone
        const buttonNextPhone = page.locator('c0b-mobilenumber button.maia-button--primary').locator('text="Next"');
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

        // Are you currently resident in Belgium?
        //await page.locator('button.maia-button.maia-button--no.maia-button--primary').click();

        //await page.locator('button.maia-button.maia-button--yes').click();

        // Fill birth date
        const buttonNextDate = page.locator('c0b-date-of-birth button.maia-button--primary').locator('text="Next"');
        await expect(buttonNextDate).toBeDisabled();
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

        // Choose if you have Belgium national registration number
        const buttonNextNationalRegNum=page.locator('c0b-social-security button.maia-button--primary').locator('text="Next"');
        await expect(buttonNextNationalRegNum).toBeDisabled();
        await page.locator('maia-checkbox#socialSecurityNumberInApplication').click();
        await expect(buttonNextNationalRegNum).toBeEnabled();
        buttonNextNationalRegNum.click();

        // Choose civil state
        const buttonNextCivilState=page.locator('c0b-civil-state button.maia-button--primary').locator('text="Next"');
        await expect(buttonNextCivilState).toBeDisabled();
        await page.locator('input[placeholder="Select your marital status"]').click();
        await page.locator('maia-select-options[role="listbox"] div:has-text("living together")').click();
        await expect(buttonNextCivilState).toBeEnabled();
        buttonNextCivilState.click();

        // Check the overview and continue
        await page.locator('c0b-overview button.maia-button--primary').click();
        await page.locator('c0b-application-info-legal-questions button.maia-button--primary').locator('text="Next"').click();

        // Choose occupation
        const buttonNextOccupation=page.locator('c0b-main-occupation button.maia-button--primary').locator('text="Next"');
        await expect(buttonNextOccupation).toBeDisabled();
        await page.locator('input[placeholder="Select your occupation"]').click();
        await page.locator('maia-select-options[role="listbox"] div:has-text("student")').click();
        await expect(buttonNextOccupation).toBeEnabled();
        buttonNextOccupation.click();

        // Choose if you have second occupation
        await page.locator('button.maia-button.maia-button--no').click();

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
        const uploadFront=page.locator('div.hermes-wrapper').first();
        //const uploadFront=page.locator('hermes-file-drop-zone.hermes-multi--zones.ng-star-inserted >> maia-rich-text:has-text("Front")');
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
        const uploadBack=page.locator('div.hermes-wrapper').first();
        const [fileChooserBack] = await Promise.all([
            // It is important to call waitForEvent before click to set up waiting.
            page.waitForEvent('filechooser'),
            // Opens the file chooser.
            uploadBack.click(),
        ]);
        await fileChooserBack.setFiles('back.pdf');
        await page.waitForSelector('div.hermes-file.hermes-file--download-available.ng-star-inserted:has-text("back.pdf")');
        await expect(page.locator('div.hermes-name').nth(1)).toContainText('back.pdf');
        await expect(buttonSavePhotos).toBeDisabled();

        // Upload a proof of current domicile address photo
        const uploadAddress=page.locator('div.hermes-wrapper').first();
        const [fileChooserAddress] = await Promise.all([
            // It is important to call waitForEvent before click to set up waiting.
            page.waitForEvent('filechooser'),
            // Opens the file chooser.
            uploadAddress.click(),
        ]);
        await fileChooserAddress.setFiles('address_proof.jpeg');
        await page.waitForSelector('div.hermes-file.hermes-file--download-available.ng-star-inserted:has-text("address_proof.jpeg")');
        await expect(page.locator('div.hermes-name').nth(2)).toContainText('address_proof.jpeg');
        await expect(buttonSavePhotos).toBeDisabled();

        // Upload a proof of future school or work place photo
        const uploadWork=page.locator('div.hermes-wrapper').first();
        const [fileChooserWork] = await Promise.all([
            // It is important to call waitForEvent before click to set up waiting.
            page.waitForEvent('filechooser'),
            // Opens the file chooser.
            uploadWork.click(),
        ]);
        await fileChooserWork.setFiles('work_proof.jpeg');
        await page.waitForSelector('div.hermes-file.hermes-file--download-available.ng-star-inserted:has-text("work_proof.jpeg")');
        await expect(page.locator('div.hermes-name').nth(3)).toContainText('work_proof.jpeg');


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

        ///////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////
        //////////////////////////////////////////////// Same for the second person

        await page.locator('button.lets-go-button.maia-button--primary').click();
        // Fill email
        const buttonNextEmail2 = page.locator('c0b-email button.maia-button--primary').locator('text="Next"');
        await expect(buttonNextEmail2).toBeDisabled();
        await page.locator('input[formcontrolname="email"]').fill('ivan.ivanov@gmail.com');
        await expect(buttonNextEmail2).toBeEnabled();
        buttonNextEmail2.click();

        // Fill mobile phone
        const buttonNextPhone2 = page.locator('c0b-mobilenumber button.maia-button--primary').locator('text="Next"');
        await expect(buttonNextPhone2).toBeDisabled();
        await page.locator('input[name="mobileNumber"]').fill('777777777');
        await expect(buttonNextPhone2).toBeEnabled();
        buttonNextPhone2.click();

        //Choice for having or no itsme
        await page.locator('button.maia-button.maia-button--no').click();

        // Choose gender
        await page.locator('maia-oscar-radio-button[value="M"]').click();

        // Fill name
        const buttonNextName2 = page.locator('button.maia-button--primary').locator('text="Next"');
        await expect(buttonNextName2).toBeDisabled();
        await page.locator('input[name="firstName"]').fill('Ivan');
        await page.locator('input[name="lastName"]').fill('Ivanov');
        await expect(buttonNextName2).toBeEnabled();
        buttonNextName2.click();

        // Are you currently domiciled in Belgium?
        await page.locator('button.maia-button.maia-button--yes').click();

        // Fill address
        const buttonNextAddress2 = page.locator('button.maia-button--primary').locator('text="Next"');
        await expect(buttonNextAddress2).toBeDisabled();
        await page.locator('input[placeholder="Postal code or city"]').type('9000');
        await page.locator('maia-option.ng-star-inserted.p-maia-option--active.maia-option--active').click();
        //await page.locator('maia-select-options[role="listbox"] div:has-text("9000 - GENT")').click();
        await page.locator('input[placeholder="Street"]').type('Abr');
        await page.locator('maia-select-options[role="listbox"] div:has-text("ABRAHAMSTRAAT")').click();
        await page.locator('input[placeholder="Housenumber"]').fill('2');

        await expect(buttonNextAddress2).toBeEnabled();
        await page.locator('input[placeholder="Mailbox"]').fill('2');
        buttonNextAddress2.click();


        // Fill birth date
        const buttonNextDate2 = page.locator('c0b-date-of-birth button.maia-button--primary').locator('text="Next"');
        await expect(buttonNextDate2).toBeDisabled();
        await page.locator('maia-input-date[formcontrolname="birthDate"]').fill('221119997');
        await expect(buttonNextDate2).toBeEnabled();
        buttonNextDate2.click();

        // Fill birth place
        const buttonNextPlace2 = page.locator('form[name="birthCountryForm"] button.maia-button--primary').locator('text="Next"');
        await expect(buttonNextPlace2).toBeDisabled();
        await page.locator('input[placeholder="Select a country"]').click();
        await page.locator('maia-select-options[role="listbox"] div:has-text("Bulgaria")').click();
        await page.locator('input[placeholder="Place of birth"]').fill('Varna');
        await expect(buttonNextPlace2).toBeEnabled();
        buttonNextPlace2.click();

        // Choose Belgium or not Belgium national - no
        await page.locator('button.maia-button.maia-button--no').click();

        // Choose nationality
        const buttonNextNational2 = page.locator('c0b-nationality button.maia-button--primary').locator('text="Next"');
        await expect(buttonNextNational2).toBeDisabled();
        await page.locator('input[placeholder="Select a country"]').type('Bulgaria');
        await page.locator('maia-select-options[role="listbox"] div:has-text("Bulgaria")').click();
        await expect(buttonNextNational2).toBeEnabled();
        buttonNextNational2.click();

        // Choose if you have Belgium national registration number
        const buttonNextNationalRegNum2=page.locator('c0b-social-security button.maia-button--primary').locator('text="Next"');
        await expect(buttonNextNationalRegNum2).toBeDisabled();
        await page.locator('maia-checkbox#socialSecurityNumberInApplication').click();
        await expect(buttonNextNationalRegNum2).toBeEnabled();
        buttonNextNationalRegNum2.click();

        // Choose civil state
        const buttonNextCivilState2=page.locator('c0b-civil-state button.maia-button--primary').locator('text="Next"');
        await expect(buttonNextCivilState2).toBeDisabled();
        await page.locator('input[placeholder="Select your marital status"]').click();
        await page.locator('maia-select-options[role="listbox"] div:has-text("living together")').click();
        await expect(buttonNextCivilState2).toBeEnabled();
        buttonNextCivilState2.click();

        // Check the overview and continue
        await page.locator('c0b-overview button.maia-button--primary').click();
        await page.locator('c0b-application-info-legal-questions button.maia-button--primary').locator('text="Next"').click();

        // Choose occupation
        const buttonNextOccupation2=page.locator('c0b-main-occupation button.maia-button--primary').locator('text="Next"');
        await expect(buttonNextOccupation2).toBeDisabled();
        await page.locator('input[placeholder="Select your occupation"]').click();
        await page.locator('maia-select-options[role="listbox"] div:has-text("student")').click();
        await expect(buttonNextOccupation2).toBeEnabled();
        buttonNextOccupation2.click();

        // Choose if you have second occupation
        await page.locator('button.maia-button.maia-button--no').click();

        // Are you or any of your family or business contacts currently in political or public office or have you or they held such office in the past 12 months?
        const buttonNextOffice2=page.locator('c0b-ppp button.maia-button--primary').locator('text="Next"');
        await expect(buttonNextOffice2).toBeDisabled();
        await page.locator('maia-checkbox[role="checkbox"]:has-text("No")').click();
        await expect(buttonNextOffice2).toBeEnabled();
        buttonNextOffice2.click();

        ////??????
        const buttonNextSubstantiate=page.locator('c0b-ppp2 button.maia-button--primary').locator('text="Next"');
        await expect(buttonNextSubstantiate).toBeDisabled();
        await page.locator('input[placeholder="Select"]').click();
        await page.locator('maia-select-options[role="listbox"] >> maia-option >> div:has-text("office ended more than 12 months ago")').click();
        await expect(buttonNextSubstantiate).toBeEnabled();
        buttonNextSubstantiate.click();

        // Do you receive money from or transfer money to a non-European country more than five times a month?
        await page.locator('c0b-non-european-transfer button.maia-button.maia-button--no').click();

        // Do you withdraw or deposit over 1000 euros in cash more than once a month?
        await page.locator('c0b-cash-payments button.maia-button.maia-button--no').click();

        // Do you pay taxes in a country other than Belgium?
        await page.locator('c0b-crs button.maia-button.maia-button--no').click();

        // Upload ID card photos
        const buttonNextPhotos2=page.locator('c0b-upload-id button.maia-button--primary').locator('text="Next"');
        await expect(buttonNextPhotos2).toBeDisabled();
        await page.locator('div.maia-input:has-text("Upload")').click();
        //const buttonSavePhotos=page.locator('c0b-upload-id button.maia-button--primary:has-text("Save")');
        const buttonSavePhotos2=page.locator('button:has-text("Save")');
        await expect(buttonSavePhotos2).toBeHidden();

        //Upload front ID card photo
        const uploadFront2=page.locator('div.hermes-wrapper').nth(0);
        const [fileChooserFront2] = await Promise.all([
            // It is important to call waitForEvent before click to set up waiting.
            page.waitForEvent('filechooser'),
            // Opens the file chooser.
            uploadFront2.click(),
        ]);
        await fileChooserFront2.setFiles('front.pdf');
        await page.waitForSelector('div.hermes-file.hermes-file--download-available.ng-star-inserted:has-text("front.pdf")');
        await expect(page.locator('div.hermes-name').nth(0)).toContainText('front.pdf');

        //expect(buttonSavePhotos).not.toBeHidden();
        await expect(buttonSavePhotos2).toBeVisible();
        await expect(buttonSavePhotos2).toBeDisabled();

        // Upload back ID card photo
        const uploadBack2=page.locator('div.hermes-wrapper').nth(0);
        const [fileChooserBack2] = await Promise.all([
            // It is important to call waitForEvent before click to set up waiting.
            page.waitForEvent('filechooser'),
            // Opens the file chooser.
            uploadBack2.click(),
        ]);
        await fileChooserBack2.setFiles('back.pdf');
        await page.waitForSelector('div.hermes-file.hermes-file--download-available.ng-star-inserted:has-text("back.pdf")');
        await expect(page.locator('div.hermes-name').nth(1)).toContainText('back.pdf');
        await expect(buttonSavePhotos2).toBeDisabled();


        // Upload a proof of current domicile address photo
        const uploadAddress2=page.locator('div.hermes-wrapper').nth(0);
        const [fileChooserAddress2] = await Promise.all([
            // It is important to call waitForEvent before click to set up waiting.
            page.waitForEvent('filechooser'),
            // Opens the file chooser.
            uploadAddress2.click(),
        ]);
        await fileChooserAddress2.setFiles('address_proof.jpeg');
        await page.waitForSelector('div.hermes-file.hermes-file--download-available.ng-star-inserted:has-text("address_proof.jpeg")');
        await expect(page.locator('div.hermes-name').nth(2)).toContainText('address_proof.jpeg');
        await expect(buttonSavePhotos2).toBeDisabled();

        // Upload a proof of future school or work place photo
        const uploadWork2=page.locator('div.hermes-wrapper').nth(0);
        const [fileChooserWork2] = await Promise.all([
            // It is important to call waitForEvent before click to set up waiting.
            page.waitForEvent('filechooser'),
            // Opens the file chooser.
            uploadWork2.click(),
        ]);
        await fileChooserWork2.setFiles('work_proof.jpeg');
        await page.waitForSelector('div.hermes-file.hermes-file--download-available.ng-star-inserted:has-text("work_proof.jpeg")');
        await expect(page.locator('div.hermes-name').nth(3)).toContainText('work_proof.jpeg');


        await expect(buttonSavePhotos2).toBeEnabled();
        await buttonSavePhotos2.click();
        await page.frameLocator('iframe[role="presentation"]').locator('span[role="checkbox"]').click();
        await page.waitForTimeout(10000);

        await expect(buttonNextPhotos2).toBeEnabled();
        await buttonNextPhotos2.click();

        // await page.locator('button.maia-button--primary:has-text("Confirm")').click();

        ////////////////////////////////////
        //////////////////////////////
        /////////////////////////////////////////////////////
        ///////////////////////////////////////////


        await page.locator('c0b-thank-you button.maia-button--primary').locator('text="Next"').click();

        // Choose a card look for the first person (from KBC gallery)
        await page.locator('maia-oscar-radio-button:has-text("Select a bank card with photo")').click();
        await page.locator('button.initial__button.button-border-color.user-selection#btn-gallery').click();
        await page.locator('button[aria-label="plant"]').click();
        await page.locator('button#btn-preview-small').click();
        await page.locator('button.preview-button-submit.confirm-button.user-selection#btn-preview-submit').click();

        // Choose a card look for the second person (uploaded photo)
        await page.locator('maia-oscar-radio-button:has-text("Select a bank card with photo")').click();



        const uploadCardPhoto=page.locator('button.initial__button.button-border-color.user-selection#btn-upload');
        const [fileChooserCardPhoto] = await Promise.all([
            // It is important to call waitForEvent before click to set up waiting.
            page.waitForEvent('filechooser'),
            // Opens the file chooser.
            uploadCardPhoto.click(),
        ]);
        await fileChooserCardPhoto.setFiles('bankCardPhoto.jpg');

        //await page.locator('button.initial__button.button-border-color.user-selection#btn-gallery').click();
        //await page.locator('button[aria-label="herfst"]').click();
        await page.locator('button#btn-preview-small').click();
        await page.locator('button.preview-button-submit.confirm-button.user-selection#btn-preview-submit').click();

        /////////////////////////////////////////
        // Switch to a KBC Plus Account - No
        //await page.locator('maia-oscar-radio-button:has-text("Basic Account")').click();

        // Confirm the application
        const confirmButton = page.locator('button.maia-button--primary:has-text("Confirm")');
        await expect(confirmButton).toBeDisabled();
        await page.locator('maia-checkbox[name="condition"]').click();
        await expect(confirmButton).toBeEnabled();
        //confirmButton.click();

    });
});