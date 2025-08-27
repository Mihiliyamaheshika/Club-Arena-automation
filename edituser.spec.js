const { test, expect } = require('@playwright/test');

test('Edit user details ', async ({ page }) => {


    await page.goto('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/auth/login?mode=login');

    await page.getByRole('textbox', { name: 'Email' }).fill('mihiliyamaheshika@gmail.com');
    await page.getByLabel('Password', { exact: true }).fill('Mm1234');
    await page.getByRole('button', { name: 'Log in' }).click();

    await page.click("//span[@class='hide-lt-sm ng-star-inserted']");

    await page.click("//span[contains(text(),'Edit user info')]");

    // await page.pause();
    await page.getByRole('textbox', { name: 'First name' }).fill('Mihiliya');
    await page.getByRole('textbox', { name: 'Last name' }).fill('Maheshika');
    await page.getByRole('button', { name: 'Save changes' }).click();

});


test.only('Edit user details via search by name ', async ({ page }) => {


    await page.goto('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/auth/login?mode=login');

    await page.getByRole('textbox', { name: 'Email' }).fill('mihiliyamaheshika@gmail.com');
    await page.getByLabel('Password', { exact: true }).fill('Mm1234');
    await page.getByRole('button', { name: 'Log in' }).click();

    await page.click("//span[contains(text(),'Users')]");
    await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/users');

    await page.getByRole('textbox', { name: 'Search' }).click();

    await page.getByRole('textbox', { name: 'Search by name, mobile or' }).fill('Mihiliya');
    await page.getByRole('row', { name: 'Mihiliya Maheshika 0764537427' }).click();

    await page.getByRole('textbox', { name: 'First name' }).fill('Mihiliya');
    await page.getByRole('textbox', { name: 'Last name' }).fill('Maheshika');
    //await page.getByRole('button', { name: 'Save changes' }).click();

});
