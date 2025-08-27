const { test, expect } = require('@playwright/test');

test('Field - Details Edit', async ({ browser }) => {
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

  await page.locator("//span[contains(text(),'Fields')]").click();
  await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/fields');

  await page.getByRole('row', { name: 'Slysa 1 SLYSA' }).getByRole('button').first().click();
  await page.goto('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/club/slysa/field/slysa-1/edit?tab=info');
  await page.getByRole('textbox', { name: 'Description' }).click();
  await page.getByRole('textbox', { name: 'Description' }).fill('This is a test field in automation ');
  await page.getByRole('textbox', { name: 'Address' }).click();

  await page.getByRole('textbox', { name: 'Address' }).fill('Sri Lanka ');


  await page.getByRole('combobox', { name: /Deck type/i }).click();
  await page.getByRole('option', { name: 'Rubber' }).click();

  await page.getByRole('radio', { name: 'Outdoor' }).check();
  await page.locator('div').filter({ hasText: /^Field is lighted$/ }).click();
  await page.getByRole('tab', { name: 'Settings' }).click();
  await page.getByRole('tab', { name: 'Approval' }).click();
  await page.getByRole('tab', { name: 'Booking' }).click();
  await page.getByRole('tab', { name: 'Track parts' }).click();

  await page.getByRole('textbox', { name: 'Part test 1' }).click();
  await page.getByRole('textbox', { name: 'Part test 1' }).fill('test 1 ');
  await page.getByRole('textbox', { name: 'Part Test 2', exact: true }).click();

  await page.getByRole('textbox', { name: 'Part Test 2', exact: true }).fill('Test 2');

  await page.getByRole('tab', { name: 'Pricing details' }).click();
  await page.getByRole('spinbutton', { name: 'Part test 1' }).click();
  await page.getByRole('spinbutton', { name: 'Part test 1' }).fill('600');

  await page.getByRole('spinbutton', { name: 'Part Test 2' }).click();
  await page.getByRole('spinbutton', { name: 'Part Test 2' }).fill('400');

  await page.locator('body').press('Enter');


});
