
const { test, expect } = require('@playwright/test');

//Club card view 
test('club card component visible', async ({ page }) => {

    await page.goto('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/auth/login?mode=login');
    await page.getByRole('textbox', { name: 'Email' }).fill('mihiliyamaheshika@gmail.com');
    await page.getByText('Password', { exact: true }).fill('Mm1234');
    await page.waitForSelector('button', { timeout: 5000 })
    await page.getByRole('button', { name: 'Log in' }).click();

    await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/clubs');

    await page.locator('//span[contains(text(), "Clubs")]').click();
    await page.getByRole('textbox', { name: 'Search' }).click();
    await page.getByRole('textbox', { name: 'Search by name or description' }).fill('slysa');
    await page.getByRole('img', { name: 'SLYSA' }).click();

 

});
