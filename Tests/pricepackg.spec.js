const { test, expect } = require('@playwright/test');

//  function to auto-close modal
async function autoCloseModal(page, modalSelector, closeButtonText = 'End tour') {
    const modal = page.locator(modalSelector);
    if (await modal.isVisible().catch(() => false)) {
        const closeButton = modal.getByRole('button', { name: closeButtonText });
        if (await closeButton.isVisible().catch(() => false)) {
            await closeButton.click();
        }
    }
}

test('Price packages', async ({ page }) => {
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

    await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/clubs');

    await page.locator("//a[@title='Price Packages']//span[@class='mat-mdc-list-item-unscoped-content mdc-list-item__primary-text']").click();
    await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/price-packages');

    // Dismiss cookie banner if present
    const cookieBtn = page.locator('button', { hasText: 'Accept' });
    if (await cookieBtn.isVisible().catch(() => false)) {
        await cookieBtn.click();
    }


    await page.locator("//span[normalize-space()='CREATE PRICE PACKAGE']").click();

    //Automatically close tour modal if it appears
    await autoCloseModal(page, '#tour-modal-app-feature-release', 'End tour');



    await page.getByLabel('Create Price Package').getByText('Name').click();
    await page.getByRole('textbox', { name: 'Name' }).fill('Test package 1 ');
    await page.getByLabel('Create Price Package').getByText('NO. Max Bookings').click();
    await page.getByRole('spinbutton', { name: 'NO. Max Bookings' }).fill('10');
    await page.getByLabel('Create Price Package').getByText('Description').click();
    await page.getByRole('textbox', { name: 'Description' }).fill('This is a test one ');
    await page.getByLabel('Create Price Package').getByText('Price(NOK)', { exact: true }).click();
    await page.getByRole('spinbutton', { name: 'Price(NOK)', exact: true }).fill('500');
    await page.getByLabel('Create Price Package').getByText('Price(USD/EUR)', { exact: true }).click();
    await page.getByRole('spinbutton', { name: 'Price(USD/EUR)', exact: true }).fill('50');
    await page.getByLabel('Create Price Package').getByText('Ex. Booking Price(NOK)').click();
    await page.getByRole('spinbutton', { name: 'Ex. Booking Price(NOK)' }).fill('50');
    await page.getByLabel('Create Price Package').getByText('Ex. Booking Price(USD/EUR)').click();
    await page.getByRole('spinbutton', { name: 'Ex. Booking Price(USD/EUR)' }).fill('40');
    await page.locator('mat-form-field').filter({ hasText: 'Visibility Start Date' }).getByLabel('Open calendar').click();
    await page.getByRole('button', { name: 'August 23,' }).click();
    await page.locator('mat-form-field').filter({ hasText: 'Visibility End Date' }).getByLabel('Open calendar').click();
    await page.getByRole('button', { name: 'August 31,' }).click();


    await page.locator("//span[normalize-space()='Save']").click();


});
