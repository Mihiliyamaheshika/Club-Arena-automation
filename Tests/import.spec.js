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

test('import function', async ({ page }) => {
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

    // Zoom out to 50%
    await page.addStyleTag({ content: 'body { zoom: 0.5; }' });

    await page.locator("//a[@title='Import']").click();
    await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/import');

    await page.getByRole('textbox', { name: '+ Add a new Arena-ID' }).click();
    await page.getByRole('textbox', { name: '+ Add a new Arena-ID' }).fill('20371');
    await page.getByRole('button', { name: 'Get matches to import' }).click();


     //Should have change based on availability of import matches 
    await page.getByRole('button', { name: 'Matches to be imported (8)' }).click();
    await page.getByRole('row', { name: 'Week When Field Parts Team /' }).getByLabel('').uncheck();
    await page.getByRole('row', { name: '37 Wed, Sep 10, 18:30 - 18:55' }).getByLabel('').check();

    await page.locator("//span[normalize-space()='Import now']").click();
    await page.locator("//span[normalize-space()='Ok']").click();

});
