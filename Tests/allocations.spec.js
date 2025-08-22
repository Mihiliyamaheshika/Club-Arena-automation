const { test, expect } = require('@playwright/test');

test('Update - allocations', async ({ page }) => {
  await page.goto('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/about');
  await page.locator("//a[normalize-space()='Log in']").click();

  const email = 'mihiliyamaheshika@gmail.com';
  const password = 'Mm1234';

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error(`Invalid email format: ${email}`);
  }

  await page.getByRole('textbox', { name: 'Email' }).fill(email);
  await page.getByLabel('Password', { exact: true }).fill(password);
  await page.waitForSelector('button', { timeout: 5000 });
  await page.getByRole('button', { name: 'Log in' }).click();

  await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/clubs');



  await page.locator("//a[@title='Fields']").click();
  await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/fields');


  await page.goto('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/fields');
  //await page.getByRole('button', { name: 'End tour' }).click();
  // await page.getByRole('button', { name: 'Don\'t show again' }).click();
  await page.getByRole('row', { name: 'Slysa 1 SLYSA' }).getByRole('button').nth(1).click();
  // await page.getByRole('button', { name: 'End tour' }).click();
  // await page.getByRole('button', { name: 'Don\'t show again' }).click();
  await page.getByText('Saturday, Aug').click();
  await page.locator('td:nth-child(6) > .calendar-table-cell-day-booking-wrapper').click();
  await page.locator('.field-part-group-content').first().click();
  await page.getByRole('textbox', { name: 'Start', exact: true }).click();
  await page.getByRole('textbox', { name: 'Start', exact: true }).fill('11:15');
  await page.getByRole('textbox', { name: 'End', exact: true }).click();
  await page.getByRole('textbox', { name: 'End', exact: true }).fill('16:45');
  await page.getByRole('switch', { name: 'Repeating timeslot' }).click();

  await page.getByRole('switch', { name: 'Repeating timeslot' }).click();
  await page.getByRole('combobox', { name: 'Recurrence type Daily' }).locator('svg').click();
  await page.getByRole('listbox', { name: 'Recurrence type' }).click();
  await page.locator('mat-form-field').filter({ hasText: 'End of recurrene' }).getByLabel('Open calendar').click();
  await page.getByRole('button', { name: 'Next month' }).click();
  await page.getByRole('button', { name: 'September 28,' }).click();
  await page.getByRole('button', { name: 'Update changes' }).click();
  await page.getByRole('menuitem', { name: 'This allocation' }).click();
  // await page.getByRole('button', { name: 'Create allocation' }).click();




});
