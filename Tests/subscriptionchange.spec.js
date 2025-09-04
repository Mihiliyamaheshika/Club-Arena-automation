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


    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new Error(`Invalid email format: ${email}`);
    }

    await page.getByRole('textbox', { name: 'Email' }).fill(email);
    await page.getByLabel('Password', { exact: true }).fill(password);
    await page.waitForSelector('button', { timeout: 5000 });
    await page.getByRole('button', { name: 'Log in' }).click();

    await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/clubs');


    await page.getByRole('textbox', { name: 'Search' }).click();
    await page.getByRole('textbox', { name: 'Search by name or description' }).fill('slamsa');


    // Wait until a club tile with "slamsa" appears
    const clubTile = page.locator('mat-grid-tile', { hasText: /slamsa/i }).first();
    await clubTile.waitFor({ state: 'visible', timeout: 10000 });

    await page.locator('.mat-mdc-menu-trigger.options-icon').click();

    await page.getByRole('menuitem', { name: 'Edit club' }).click();
    await page.getByText('Subscription information').click();
    await page.getByRole('button', { name: 'Change subscription' }).click();

    await page.getByRole('combobox', { name: 'Package Medium (200/mnd) (500' }).locator('path').click();
    await page.getByText('Large (400/mnd) (1000 NOK) (').click();

    await page.getByRole('button', { name: 'Open calendar' }).click();
    await page.getByRole('button', { name: 'Next month' }).click();
    await page.getByRole('button', { name: 'Next month' }).click();
    await page.getByRole('button', { name: 'November 23,' }).click();
    await page.getByRole('button', { name: 'Update' }).click();
});
