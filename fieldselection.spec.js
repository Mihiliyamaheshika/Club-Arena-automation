const { test, expect } = require('@playwright/test');

test('field selection via drop down in calander', async ({ page }) => {
    await page.goto('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/');
    await page.locator("//a[normalize-space()='Log in']").click();

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

    await page.locator("//span[contains(text(),'Fields')]").click();
    await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/fields');

    // await page.click("//input[@id='mat-input-3']");

    await page.getByRole('textbox', { name: 'Search' }).click();
    await page.getByRole('textbox', { name: 'Search by name or club' }).fill('slysa');
    await page.getByRole('row', { name: 'Slysa 2 SLYSA' }).click();

    await page.getByRole('combobox', { name: 'Field Slysa' }).locator('path').click();
    await page.getByText('Slysa 1').click();
    await page.getByRole('combobox', { name: 'Field Slysa' }).locator('path').click();
    await page.getByText('slysa 2').click();
    await page.getByRole('combobox', { name: 'Field Slysa' }).locator('path').click();
    await page.getByText('slysa 3').click();

});
