const { test, expect } = require('@playwright/test');

test('Calander icon accessing to booking requests', async ({ browser }) => {
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

    await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/clubs');

    //navigate to booking requests 
    await page.click("//a[@title='Booking requests']//span[@class='mat-mdc-list-item-unscoped-content mdc-list-item__primary-text']");
    await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/requests');

    await page.getByRole('button', { name: 'Open calendar' }).click();
    await page.getByRole('button', { name: 'Next month' }).click();
    await page.getByRole('button', { name: 'October 10,' }).click();
});
