const { test, expect } = require('@playwright/test');

test('Filter message via club name ', async ({ page }) => {
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


  //navigate to messages
  await page.click("//a[@title='Messages']//span[@class='mat-mdc-list-item-unscoped-content mdc-list-item__primary-text']");
  await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/messages');

  await page.getByRole('button').filter({ hasText: 'filter_listali' }).click();
  await page.getByRole('combobox', { name: 'Sent as' }).locator('svg').click();
  await page.getByRole('listbox', { name: 'Sent as' }).click();
  //await page.pause();
  await page.locator('mat-sidenav').filter({ hasText: 'Filter From Sent as By Team' }).click();
  await page.locator('#mat-mdc-form-field-label-22').getByText('By Team').click();

  await page.getByRole('combobox', { name: 'By Team', exact: true }).fill('Slysa team');
  await page.locator("//span[normalize-space()='Apply']").click();

});
