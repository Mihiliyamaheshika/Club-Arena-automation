const { test, expect } = require('@playwright/test');

test('overlapping restriction checking', async ({ page }) => {
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

  // await page.pause();
  await page.click("//input[@id='mat-input-3']");
  await page.getByRole('textbox', { name: 'Search by name or club' }).click();
  await page.getByRole('textbox', { name: 'Search by name or club' }).fill('slysa');
  await page.getByRole('row', { name: 'New test field SLYSA' }).click();

  await page.goto('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/club/slysa/field/new-test-field');
 
  await page.locator('td:nth-child(4) > .calendar-table-cell-day-booking-wrapper').click();

  const startCell = page.locator('td:nth-child(4) > .calendar-table-cell-day-booking-wrapper');
  const endCell = page.locator('td:nth-child(4) > .calendar-table-cell-day-booking-wrapper');
  await startCell.waitFor({ state: 'visible' });
  await startCell.dragTo(endCell);

  await page.getByRole('textbox', { name: 'Start time' }).click();
  await page.getByRole('button', { name: '3' }).click();
  await page.getByRole('button', { name: 'Ok', exact: true }).click();

  await page.getByRole('textbox', { name: 'Title' }).press('CapsLock');

  await page.getByRole('textbox', { name: 'Title' }).fill('Test overlapping');
  await page.getByRole('switch', { name: 'Repeat bookings' }).click();
  await page.locator('mat-form-field').filter({ hasText: 'Recurrence end' }).getByLabel('Open calendar').click();
  await page.getByRole('button', { name: 'September 30,' }).click();
  await page.getByRole('button', { name: 'Book field' }).click();

  //This booking should prevent by defualt since this is already all field parts are booked. 
});

