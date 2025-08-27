const { test, expect } = require('@playwright/test');

test.only('Filter based on - field', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    // Navigate to login page
    await page.goto('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/about');
    await page.locator("//a[normalize-space()='Log in']").click();

    const email = 'mihiliyamaheshika@gmail.com';
    const password = 'Mm1234';

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new Error(`Invalid email format: ${email}`);
    }


    await page.getByRole('textbox', { name: 'Email' }).fill(email);
    await page.getByLabel('Password', { exact: true }).fill(password);
    await page.waitForSelector('button', { timeout: 5000 });
    await page.getByRole('button', { name: 'Log in' }).click();

    await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/fields');


    // await page.locator("//a[@title='Clubs']//span[contains(@class, 'mat-mdc-list-item-unscoped-content')]").click();
    // await page.getByRole('textbox', { name: 'Search' }).click();
    // await page.getByRole('textbox', { name: 'Search by name or description' }).fill('Slysa');
    // await page.waitForTimeout(2000);

    await page.locator("//a[@title='Bookings']//span[@class='mat-mdc-list-item-unscoped-content mdc-list-item__primary-text']").click();
    await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/bookings');


    await page.getByText('Select fields').click();

    await page.getByText('+ Add Fields').click();
    await page.getByText('Slysa 1', { exact: true }).click();
    await page.getByRole('button', { name: 'Add Fields' }).click();
    await page.getByRole('button', { name: 'Ok' }).click();


});

