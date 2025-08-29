const { test, expect } = require('@playwright/test');

test('ICS - Options', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    // Navigate to login page
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

    await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/fields');

    // Navigate to club Slysa
    // await page.locator("//a[@title='Clubs']//span[contains(@class, 'mat-mdc-list-item-unscoped-content')]").click();
    // await page.getByRole('textbox', { name: 'Search' }).click();
    // await page.getByRole('textbox', { name: 'Search by name or description' }).fill('Slysa');
    // await page.waitForTimeout(2000);

    // await page.locator("//div[@class='mat-grid-tile-content']").first().click();
    // await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/fields/club/slysa');
    await page.getByRole('row', { name: 'Slysa 1 SLYSA' }).getByRole('button').first().click();

    // Navigate to ICS tab
    await page.goto('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/club/slysa/field/slysa-1/edit?tab=info');
    await page.locator("//span[@id='field-ics']").click();
    await page.goto('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/club/slysa/field/slysa-1/edit?tab=ics');

    // Fill ICS form
    await page.getByRole('spinbutton', { name: /Number of days to export/ }).fill('10');
    await page.getByLabel('', { exact: true }).dblclick();
    await page.getByLabel('', { exact: true }).fill('Test');
    await page.getByRole('button', { name: 'Copy link' }).click();


    const newTab = await context.newPage();

    // Trigger ICS file download directly
    const [download] = await Promise.all([
        newTab.waitForEvent('download'),
        newTab.evaluate(() => {
            window.location.href = 'https://club-arena-api-test2.azurewebsites.net/fields/520d6d0e-4327-f011-8b3d-000d3a38a741/calendar';
        })
    ]);

    const path = await download.path();
    console.log('ICS file downloaded to:', path);


});
