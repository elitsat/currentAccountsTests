// @ts-check
const { test, expect } = require('@playwright/test');

test('Open saucedemo.com', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Swag/);

  // create a locator usernname
  await page.locator('#user-name').fill('standard_user');

  // create a locator password
  await page.locator('#password').fill("secret_sauce");
  
  await page.locator("#login-button").click();
  await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
 /* await Promise.all([
    // It is important to call waitForNavigation before click to set up waiting.
    page.waitForNavigation({ url: 'https://www.saucedemo.com/inventory.html' }),
     // Triggers a navigation with a script redirect.
    //page.locator('text=Click me').click(),
  ]);
  */
  //page.wait();
  
});
