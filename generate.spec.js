const fs = require('fs');
const path = require('path');
const { test, expect } = require('@playwright/test');

test('Generate - booking files', async ({ page }) => {
    await page.goto('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/auth/login?mode=login');

    const email = 'mihiliyamaheshika@gmail.com';
    const password = 'Mm1234';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new Error(`Invalid email format: ${email}`);
    }

    await page.getByRole('textbox', { name: 'Email' }).fill(email);
    await page.getByLabel('Password', { exact: true }).fill(password);
    await page.waitForSelector('button', { timeout: 5000 });
    await page.getByRole('button', { name: 'Log in' }).click();

    await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/fields');

    // Navigate to Bookings
    await page.click("//a[@title='Bookings']//span[@class='mat-mdc-list-item-unscoped-content mdc-list-item__primary-text']");
    await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/bookings');

    await page.locator("//mat-icon[normalize-space()='assessment']").click();

    await page.locator('mat-form-field').filter({ hasText: 'From' }).getByLabel('Open calendar').click();
    await page.getByRole('button', { name: 'August 12,' }).click();

    await page.locator('mat-form-field').filter({ hasText: 'To' }).getByLabel('Open calendar').click();
    await page.getByRole('button', { name: 'Next month' }).click();
    await page.getByRole('button', { name: 'Next month' }).click();
    await page.getByRole('button', { name: 'October 2,' }).click();

    // Download file
    const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.getByRole('button', { name: 'Download' }).click()
    ]);

    // Define target path
    const suggestedFileName = download.suggestedFilename();
    const targetPath = path.resolve('C:/Users/Mihi/Downloads', suggestedFileName);

    // Save download to specific path
    await download.saveAs(targetPath);
    console.log('File saved to:', targetPath);
});
