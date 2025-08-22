const path = require('path');
const { test, expect } = require('@playwright/test');

test.only('create new club', async ({ page }) => {
    await page.goto('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/auth/login?mode=login');

    await page.getByRole('textbox', { name: 'Email' }).fill('mihiliyamaheshika@gmail.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('Mm1234');
    await page.getByRole('button', { name: 'Log in' }).click();

    // Accept cookie banner if visible
    const cookieAccept = page.getByRole('button', { name: 'Accept' });
    if (await cookieAccept.isVisible()) {
        await cookieAccept.click();
    }

    await page.click("//span[contains(text(),'Clubs')]");
    await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/clubs');


    const createClubBtn = page.locator("//span[normalize-space()='CREATE CLUB']");
    await expect(createClubBtn).toBeVisible();
    await createClubBtn.click();

    // Upload logo
    await page.locator("//span[contains(text(),'Upload club logo')]").click();

    const filePath = path.resolve('C:/Users/Mihi/Documents/Playwright Automation/Tests/logo.jpg');
    await page.setInputFiles('input[type="file"]', filePath);

    console.log('File upload step done.');
    // await page.pause();

    // await page.locator('#mat-mdc-form-field-label-12 span').click();
    await page.getByRole('textbox', { name: 'Name' }).fill('Test club 4');
    await page.getByText('Description').click();
    await page.getByRole('textbox', { name: 'Description' }).fill('This is  a test club ');
    //await page.getByText('Players', { exact: true }).click();
    //await page.getByRole('spinbutton', { name: 'Players' }).fill('20');
    await page.getByRole('combobox', { name: 'Country' }).locator('path').click();
    await page.getByRole('option', { name: 'China' }).click();

    await page.locator("//span[normalize-space()='Save club']").click();

    //await page.pause();

});



test('System does not allow duplicate club names', async ({ page }) => {
    await page.goto('https://coach-arena-test.azurewebsites.net/auth/login?mode=login');

    await page.getByRole('textbox', { name: 'Email' }).fill('mihiliyamaheshika@gmail.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('Mm1234');
    await page.getByRole('button', { name: 'Log in' }).click();

    // Accept cookie banner if visible
    const cookieAccept = page.getByRole('button', { name: 'Accept' });
    if (await cookieAccept.isVisible()) {
        await cookieAccept.click();
    }

    // Navigate to Clubs page
    await page.click("//span[contains(text(),'Clubs')]");
    await expect(page).toHaveURL('https://coach-arena-test.azurewebsites.net/clubs');

    // Click "Create Club" button
    const createClubBtn = page.locator("//span[normalize-space()='CREATE CLUB']");
    await expect(createClubBtn).toBeVisible();
    await createClubBtn.click();

    // Upload logo
    const filePath = path.resolve('C:/Users/Mihi/Documents/Playwright Automation/Tests/logo.jpg');
    await page.setInputFiles('input[type="file"]', filePath);

    console.log('File upload step done.');

    // Fill in duplicate club name
    await page.getByRole('textbox', { name: 'Name' }).fill('Slysa');

    // Attempt to save the form
    await page.locator("//span[normalize-space()='Save club']").click();

    // Assert validation error appears
    const errorMessage = page.locator("text=Name must be at least 5 characters long or is already taken");
    await expect(errorMessage).toBeVisible();

    console.log('Validation for duplicate club name passed.');
});
