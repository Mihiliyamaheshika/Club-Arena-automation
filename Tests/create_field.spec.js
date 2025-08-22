const { test, expect } = require('@playwright/test')

// test('create new field', async ({ page }) => {

//     await page.goto('https://coach-arena-test.azurewebsites.net/auth/login?mode=login');
//     //await page.pause()
//     await page.getByRole('textbox', { name: 'Email' }).fill('mihiliyamaheshika@gmail.com');
//     await page.getByText('Password', { exact: true }).fill('MiHi0102##');
//     await page.waitForSelector('button', { timeout: 5000 })
//     await page.getByRole('button', { name: 'Log in' }).click();

// await page.goto('https://coach-arena-test.azurewebsites.net/fields');
// await page.locator("//span[normalize-space()='CREATE FIELD']").click();
// await page.locator('//*[@id="mat-input-13"]').fill('New field 1 ');

// // Click the dropdown to open options
// await page.locator("//span[@class='mat-mdc-select-placeholder mat-mdc-select-min-line ng-tns-c1711764913-17 ng-star-inserted']").click();

// // Select the desired option from dropdown
// await page.locator('//*[@id="mat-select-value-15"]/span/span').click();

// await page.locator("//span[normalize-space()='Create field']").click();
// });


test('create new field', async ({ page }) => {

    await page.goto('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/auth/login?mode=login');
    await page.getByRole('textbox', { name: 'Email' }).fill('mihiliyamaheshika@gmail.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('Mm1234');
    await page.getByRole('button', { name: 'Log in' }).click();


    await page.waitForLoadState('networkidle');

    await page.goto('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/clubs');
    await page.waitForLoadState('networkidle');

    const acceptCookies = page.getByRole('button', { name: 'Accept' });
    if (await acceptCookies.isVisible()) {
        await acceptCookies.click();
    }

    //  Test Navigation to field 
    await page.click("//a[@title='Fields']//span[@class='mat-mdc-list-item-unscoped-content mdc-list-item__primary-text']");
    await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/fields');

    const createFieldButton = page.getByRole('button', { name: 'CREATE FIELD' });
    await expect(createFieldButton).toBeVisible({ timeout: 10000 });
    await createFieldButton.click();

    //await page.pause();
    // await createFieldButton.click();


    // await page.getByRole('textbox', { name: 'Name' }).fill('New field ');
    // await page.getByRole('combobox', { name: 'Field layout' }).locator('svg').click();
    // await page.getByRole('listbox', { name: 'Field layout' }).click();
    // await page.locator("//span[normalize-space()='Create field']").click();

    await page.getByRole('textbox', { name: 'Name' }).click();

    await page.getByRole('textbox', { name: 'Name' }).fill('New test field 1');
    await page.getByRole('combobox', { name: 'Club' }).click();
    await page.getByRole('option', { name: 'SLYSA' }).locator('span').click();
    await page.getByRole('combobox', { name: 'Field layout' }).click();
    await page.getByRole('listbox', { name: 'Field layout' }).click();
    await page.getByRole('button', { name: 'Create field' }).click();

});
