const { test, expect } = require('@playwright/test');
const path = require('path');

test('new logo updated for a club', async ({ page }) => {

    await page.goto('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/auth/login?mode=login');

    const email = 'mihiliyamaheshika@gmail.com';
    const password = 'Mm1234';

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new Error(`Invalid email format: ${email}`);
    }

    await page.getByRole('textbox', { name: 'Email' }).fill(email);
    await page.getByLabel('Password', { exact: true }).fill(password);
    await page.getByRole('button', { name: 'Log in' }).click();

    await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/fields', { timeout: 10000 });
    console.log('Login successful.');

    // Navigate to Club Settings
    await page.click("//span[contains(text(),'Club Settings')]");
    await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/clubs/slysa/edit?tab=details');

    // Click on 'Upload club logo' 
    await page.click("//span[contains(text(),'Upload club logo')]");

    
    const filePath = path.resolve('C:/Users/Mihi/Documents/Playwright Automation/Tests/logo.jpg');

    await page.setInputFiles('input[type="file"]', filePath);

    console.log('File upload step done.');

});
