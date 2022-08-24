// @ts-check
const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
    await page.goto('https://demoqa.com/');
});

test.describe('Testing demoqa.com', () => {

        test('Test elements', async ({ page }) => {
            //await page.goto('https://demoqa.com/');
            //text box
            await page.locator(".category-cards > div:nth-child(1)").click();
            await expect(page).toHaveURL("https://demoqa.com/elements");
            await page.locator('li:has-text("Text Box")').click();
            await page.locator('id=userName').fill('Elitsa Todorova');
            await page.locator('id=userEmail').fill('elitsa@kbc.com');
            await page.locator('id=currentAddress').fill('Varna, Ivats 6');
            await page.locator('id=permanentAddress').fill('Varna, Vasil Chekalarov 16');
            await page.locator('id=submit').click();

            //check box
            //await page.locator('li#item-1').click();
            //await page.locator('name=like').first().click();

            //radio button
            //await page.locator('li:has-text("Text Box")').click();
            //const locator = page.locator('id=noRadio');
            //await expect(locator).toBeDisabled();
        });

        /*test('Test TextBox', async ({ page }) => {
            await page.locator('li:has-text("Text Box")').click();
            await page.locator('id=userName').fill('Elitsa Todorova');
            await page.locator('id=userEmail').fill('elitsa@kbc.com');
            await page.locator('id=currentAddress').fill('Varna, Ivats 6');
            await page.locator('id=permanentAddress').fill('Varna, Vasil Chekalarov 16');


        });

        test('Test CheckBox', async ({ page }) => {
            
        });*/


});
test.describe('Testing Forms', () => {

    test('Open forms', async ({ page }) => {
        await page.locator(".category-cards > div:nth-child(2)").click();
        await expect(page).toHaveURL("https://demoqa.com/forms");
        await page.locator('li:has-text("Practice form")').click();
        await page.locator('id=firstName').fill('Elitsa');
        await page.locator('id=lastName').fill('Todorova');
        await page.locator('id=userEmail').fill('elitsa@kbc.com');
        await page.locator('text=Female').check();
        await page.locator('id=userNumber').fill('0885123456');
        await page.locator('id=dateOfBirthInput').fill('09/01/2000');
        await page.locator('text=Sports').check();
        //await page.locator('.subjects-auto-complete__value-container subjects-auto-complete__value-container--is-multi css-1hwfws3').fill("subject1");
        await page.locator('id=currentAddress').fill('Current addressCurrent addressCurrent address');
        await page.locator('id=state').click();//.selectOption('Haryana');
        //await page.locator('label=Haryana').select();

    });

    /*// ->2
    test('test elements', async ({ page }) => {




    });

    // ->3
    test('test forms', async ({ page }) => {

    });

*/

});