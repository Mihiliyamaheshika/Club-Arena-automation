const { test, expect } = require('@playwright/test');

test('delete meeting room', async ({ page }) => {
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

  await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/clubs');



  await page.locator("//span[contains(text(),'Meeting rooms, etc.')]").click();
  await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/objects');

  await page.getByRole('textbox', { name: 'Search' }).click();
  await page.getByRole('textbox', { name: 'Search by name or club' }).fill('slysa');

  await page.getByRole('row', { name: 'Cafetest3 SLYSA' }).getByRole('button').nth(3).click();
  //  await page.getByRole('menuitem', { name: 'Delete cafeteria' }).click();
  await page.getByRole('checkbox', { name: 'Send notification mails' }).check();
  await page.getByRole('button', { name: 'Delete' }).click();

});
