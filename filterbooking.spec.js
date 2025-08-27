
const { test, expect } = require('@playwright/test');

//Filter bookings  
test('filter bookings - via view options', async ({ page }) => {

    await page.goto('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/auth/login?mode=login');
    await page.getByRole('textbox', { name: 'Email' }).fill('mihiliyamaheshika@gmail.com');
    await page.getByText('Password', { exact: true }).fill('Mm1234');
    await page.waitForSelector('button', { timeout: 5000 })
    await page.getByRole('button', { name: 'Log in' }).click();

    await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/fields');


    //navigate to bookings 
    await page.click("//a[@title='Bookings']");
    await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/bookings');

    // await page.pause();
    await page.locator("//mat-icon[@class='mat-icon notranslate chevron-icon menu-icon mat-icon-no-color']//*[name()='svg']").click();
    await page.getByRole('switch', { name: 'Show cancelled' }).click();
});
