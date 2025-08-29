const { test, expect } = require('@playwright/test');

test('search function', async ({ page }) => {
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

  await page.getByRole('textbox', { name: 'Search' }).click();
  await page.getByRole('textbox', { name: 'Search by name or description' }).fill('slysa');


  await page.locator("//span[contains(text(),'Fields')]").click();
  await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/fields');


  await page.getByRole('textbox', { name: 'Search' }).click();
  await page.getByRole('textbox', { name: 'Search by name or club' }).fill('slysa');
  await page.getByRole('row', { name: 'Slysa 2 SLYSA' }).click();




  await page.locator("//a[@title='Teams']//span[@class='mat-mdc-list-item-unscoped-content mdc-list-item__primary-text']").click();
  await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/teams');

  await page.getByRole('textbox', { name: 'Search' }).click();
  await page.getByRole('textbox', { name: 'Search by team name' }).fill('slysa');

  //  await page.click("//mat-cell[normalize-space()='SLYSA - team']");

  await page.locator("//a[@title='Help center']").click();
  await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/help-center');
 
  await page.getByText('Search', { exact: true }).click();
  await page.getByRole('textbox', { name: 'Search' }).fill('account');
  await page.getByRole('button', { name: 'Account Management' }).click();
});

test('search function - meeting rooms', async ({ page }) => {
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



  await page.locator("//span[contains(text(),'Meeting rooms, etc.')]").click();
  await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/objects');

  await page.getByRole('textbox', { name: 'Search' }).click();
  await page.getByRole('textbox', { name: 'Search by name or club' }).fill('slysa');


});
