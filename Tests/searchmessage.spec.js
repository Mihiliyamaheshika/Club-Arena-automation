const { test, expect } = require('@playwright/test');

test('search message via club name ', async ({ page }) => {
    await page.goto('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/about');
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

    await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/fields');
   // await page.pause();

    //navigate to messages
    await page.click("//a[@title='Messages']//span[@class='mat-mdc-list-item-unscoped-content mdc-list-item__primary-text']");
    await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/messages');

    await page.getByRole('textbox', { name: 'Search' }).click();
    await page.getByRole('textbox', { name: 'Search by subject, message' }).fill('LD CLUB');
    
    // Grab all sender names from column 2 of the table rows
    const senderNames = await page.locator('mat-table mat-row mat-cell:nth-child(2) span').allTextContents();

    // Check all displayed rows contain "LD CLUB SS"
    for (const name of senderNames) {
        expect(name.trim()).toBe('LD CLUB SS');
    }
});
