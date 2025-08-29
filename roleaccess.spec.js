const { test, expect } = require('@playwright/test');

test('Switch user role from dropdown in Club Arena', async ({ page }) => {


    await page.goto('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/auth/login?mode=login');

    await page.getByRole('textbox', { name: 'Email' }).fill('mihiliyamaheshika@gmail.com');
    await page.getByLabel('Password', { exact: true }).fill('Mm1234');
    await page.getByRole('button', { name: 'Log in' }).click();

    await page.waitForLoadState('networkidle');

    //Click on the User Role Dropdown
    await page.click('//*[@id="mat-select-value-3"]/span/mat-select-trigger/div');

    //Wait for Dropdown Options to appear
    await page.waitForSelector("//mat-option[@id='mat-option-8']");

    await page.click("//mat-option[@id='mat-option-8']");

    console.log('User role switched to SLYSA - club successfully.');

});
