const { test, expect } = require('@playwright/test');

test('Change password', async ({ page }) => {

    await page.goto('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/auth/login?mode=login');

    const email = 'mihiliyamaheshika@gmail.com';
    const password = 'Mm1234';

    // Check if email format is valid using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new Error(`Invalid email format: ${email}`);
    }

    await page.getByRole('textbox', { name: 'Email' }).fill(email);
    await page.getByLabel('Password', { exact: true }).fill(password);
    await page.waitForSelector('button', { timeout: 5000 });
    await page.getByRole('button', { name: 'Log in' }).click();

    await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/clubs');


    await page.click("//span[@class='hide-lt-sm ng-star-inserted']");
    await page.getByRole('menuitem', { name: 'Change password' }).click();
    await page.getByRole('textbox', { name: 'Current password' }).click();
    await page.getByRole('textbox', { name: 'Current password' }).fill('Mm1234');
    await page.locator('mat-form-field').filter({ hasText: 'Current password' }).locator('mat-icon').click();
    await page.locator('section:nth-child(2) > div > .mat-mdc-form-field > .mat-mdc-text-field-wrapper > .mat-mdc-form-field-flex > .mat-mdc-form-field-infix').click();
    await page.getByRole('textbox', { name: 'New password' }).fill('Mm1234');
    await page.getByText('Confirm password').click();
    await page.getByRole('textbox', { name: 'Confirm password' }).fill('Mn1234');
    await page.getByRole('button', { name: 'Change' }).click();
});
