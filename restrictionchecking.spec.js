const { test, expect } = require('@playwright/test');

test.use({ storageState: 'Tests/booking.json' });


test('Booking should show message if selected time is outside allocation', async ({ page }) => {


  await page.goto('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/auth/login?mode=login');
  await page.getByRole('textbox', { name: 'Email' }).fill('mihiliyamaheshika@gmail.com');
  await page.getByText('Password', { exact: true }).fill('Mm1234');
  await page.waitForSelector('button', { timeout: 5000 });
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/clubs');

 
  await page.click("//span[contains(text(),'Fields')]");
  await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/fields');
  await page.getByRole('textbox', { name: 'Search' }).click();
  await page.getByRole('textbox', { name: 'Search by name or club' }).fill('Slysa');
  await page.getByRole('row', { name: 'SLYSA 1 SLYSA' }).click();

 
  await page.waitForSelector("//div[normalize-space()='Saturday, Sep 13']", { state: 'visible' });
  await page.locator("//div[normalize-space()='Saturday, Sep 13']").click();

  
  await page.waitForSelector('.calendar-table-cell-day-booking-wrapper', { state: 'visible' });
  await page.locator('td:nth-child(6) > .calendar-table-cell-day-booking-wrapper').click();

 
  await page.getByRole('heading', { name: 'test 1' }).click();

 
  await page.getByRole('textbox', { name: 'Start time' }).click();
  await page.getByRole('button', { name: '1', exact: true }).click(); 
  await page.getByRole('button', { name: 'Ok', exact: true }).click();

  await page.getByRole('textbox', { name: 'Finish time' }).click();
  await page.getByRole('button', { name: '5', exact: true }).click();   // Example invalid finish
  await page.getByRole('button', { name: 'Ok', exact: true }).click();

  await page.getByRole('textbox', { name: 'Title' }).fill('Test match 2 ');
  await page.getByRole('switch', { name: 'Match' }).click();

   
  const errorMessage = page.getByText(
    'No parts available for the selected time. Please choose a time within one of the available allocation periods below.'
  );
  await expect(errorMessage).toBeVisible();

});
