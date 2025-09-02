const { test, expect } = require('@playwright/test');

test('Update - bookings', async ({ page }) => {
  await page.goto('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/auth/login?mode=login');
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

  await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/fields');

  await page.click("//span[contains(text(),'Bookings')]");
  await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/bookings');


  await page.getByRole('textbox', { name: 'Search' }).click();


  await page.getByRole('textbox', { name: 'Search' }).click();
  await page.getByRole('textbox', { name: 'Search by name, title or field' }).fill('new');
  await page.locator('mat-row:nth-child(4) > mat-cell:nth-child(5) > .booking-title').click();
  await page.getByText('Show in calendar').first().click();
  await page.locator('div:nth-child(2) > .calendar-table-cell-day-booking-content-wrapper > ca-booking-interval > .booking-interval-wrapper > .booking-interval > .bookings-wrapper').click();
  await page.getByRole('textbox', { name: 'Start time' }).click();
  await page.getByRole('button', { name: '4' }).click();
  await page.getByRole('button', { name: 'Ok', exact: true }).click();

  await page.locator('mat-form-field').filter({ hasText: 'Recurrence end' }).getByLabel('Open calendar').click();
  //await page.getByRole('button', { name: 'Next month' }).click();
  await page.getByRole('button', { name: 'October 20,' }).click();
  await page.getByRole('button', { name: 'Update booking' }).click();
  await page.getByRole('menuitem', { name: 'This and future reservations' }).click();



});
