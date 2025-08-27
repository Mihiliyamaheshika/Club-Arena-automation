const { test, expect } = require('@playwright/test');

test('Filter based on - team', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  // Navigate to login page
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


  // await page.locator("//a[@title='Clubs']//span[contains(@class, 'mat-mdc-list-item-unscoped-content')]").click();
  // await page.getByRole('textbox', { name: 'Search' }).click();
  // await page.getByRole('textbox', { name: 'Search by name or description' }).fill('Slysa');
  // await page.waitForTimeout(2000);

  await page.locator("//a[@title='Bookings']//span[@class='mat-mdc-list-item-unscoped-content mdc-list-item__primary-text']").click();
  await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/bookings');

  // await page.pause ();
  await page.locator('ca-booking-filter svg').first().click();
  await page.getByText('+ Add Teams').click();
  await page.getByRole('textbox', { name: 'Select teams' }).click();
  await page.getByRole('textbox', { name: 'Select teams' }).fill('slysa');
  await page.getByText('Slysa - team', { exact: true }).click();
  await page.getByRole('button', { name: 'Add Teams' }).click();
  await page.getByRole('button', { name: 'Ok' }).click();

});

test('Filter based on - date', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  // Navigate to login page
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


  // await page.locator("//a[@title='Clubs']//span[contains(@class, 'mat-mdc-list-item-unscoped-content')]").click();
  // await page.getByRole('textbox', { name: 'Search' }).click();
  // await page.getByRole('textbox', { name: 'Search by name or description' }).fill('Slysa');
  // await page.waitForTimeout(2000);

  await page.locator("//a[@title='Bookings']//span[@class='mat-mdc-list-item-unscoped-content mdc-list-item__primary-text']").click();
  await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/bookings');


  await page.getByRole('button', { name: 'Open calendar' }).click();
  await page.getByRole('button', { name: 'August 25,' }).click();


});
