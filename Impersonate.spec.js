const { test, expect } = require('@playwright/test');

test('Impersonate user ', async ({ page }) => {


    await page.goto('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/auth/login?mode=login');
    await page.getByRole('textbox', { name: 'Email' }).fill('mihiliyamaheshika@gmail.com');
    await page.getByText('Password', { exact: true }).fill('Mm1234');
    await page.waitForSelector('button', { timeout: 5000 })
    await page.getByRole('button', { name: 'Log in' }).click();
    await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/clubs');


    await page.getByRole('button', { name: 'Impersonate user' }).click();

    //access to field admin 
    // await page.getByRole('switch', { name: 'Select role' }).click();
    // await page.getByRole('combobox', { name: 'Role' }).click();
    // await page.getByRole('listbox', { name: 'Role' }).click();
    // await page.getByRole('combobox', { name: 'Field', exact: true }).click();
    // await page.getByRole('combobox', { name: 'Field', exact: true }).locator('path').click();
    // await page.getByText('Slysa-field').click();
    // await page.getByRole('button', { name: 'Select role' }).click();


    //access to club admin 
    // await page.getByRole('switch', { name: 'Select role' }).click();
    // await page.getByRole('combobox', { name: 'Role' }).click();
    // await page.getByText('Club admin').click();
    // await page.getByRole('combobox', { name: 'Club', exact: true }).click();
    // await page.getByRole('combobox', { name: 'Club', exact: true }).locator('svg').click();
    // await page.getByText('SLYSA', { exact: true }).click();
    // await page.getByRole('button', { name: 'Select role' }).click();



    //access to team manager
    // await page.getByRole('switch', { name: 'Select role' }).click();
    // await page.getByRole('combobox', { name: 'Role' }).click();
    // await page.getByText('Team manager').click();
    // await page.getByText('Team', { exact: true }).click();
    // await page.getByRole('combobox', { name: 'Team', exact: true }).press('CapsLock');
    // await page.getByRole('combobox', { name: 'Team', exact: true }).fill('SLYSA');
    // await page.getByText('SLYSA - team').click();
    // await page.getByRole('button', { name: 'Select role' }).click();


    //Access via user name 
    await page.getByText('User', { exact: true }).click();
    await page.getByRole('combobox', { name: 'User' }).fill('Mihi');
    await page.getByRole('option', { name: 'Mihiliya Maheshika' }).locator('span').click();
    await page.getByRole('button', { name: 'Select user' }).click();
    await page.getByRole('button', { name: 'Back to global admin' }).click();


});
