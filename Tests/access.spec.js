const { test, expect } = require('@playwright/test');

test('Access control checking with trace', async ({ page, context }) => {
  //  Start tracing before the test
  await context.tracing.start({ screenshots: true, snapshots: true });

  await page.goto('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/auth/login?mode=login');

  await page.getByRole('textbox', { name: 'Email' }).fill('mihiliyamaheshika@gmail.com');
  await page.getByLabel('Password', { exact: true }).fill('Mm1234');
  await page.getByRole('button', { name: 'Log in' }).click();

  await page.waitForLoadState('networkidle');

  //  Switch to Global Admin 
  await page.click('//*[@id="mat-select-value-3"]/span/mat-select-trigger/div');
  await page.waitForSelector("//mat-option[@id='mat-option-7']");
  await page.click("//mat-option[@id='mat-option-7']");
  await page.click("//mat-icon[@data-mat-icon-name='mdi_history']//*[name()='svg']");
  await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/logs');
  console.log('User role switched to Global admin successfully.');

  //  Switch to Club Admin 
  await page.click('//*[@id="mat-select-value-3"]/span/mat-select-trigger/div');
  await page.waitForSelector("//mat-option[@id='mat-option-8']");
  await page.click("//mat-option[@id='mat-option-8']");
  await page.click("//span[contains(text(),'Club Settings')]");
  await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/clubs/slysa/edit?tab=details');
  console.log('User role switched to SLYSA - club successfully.');

  //  Switch to Field Admin 
  await page.click('//*[@id="mat-select-value-3"]/span/mat-select-trigger/div');
  await page.waitForSelector("//div[@class='area-role-name'][normalize-space()='Admin']");
  await page.click("//div[@class='area-role-name'][normalize-space()='Admin']");
  await page.click("//span[contains(text(),'Import')]");
  await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/import');
  console.log('User role switched to Field - admin successfully.');

  //  Switch to Team Manager 
  await page.click('//*[@id="mat-select-value-3"]/span/mat-select-trigger/div');
  await page.waitForSelector("//div[@class='area-role-name'][normalize-space()='Team manager']");
  await page.click("//div[@class='area-role-name'][normalize-space()='Team manager']");
  await page.click("//span[contains(text(),'My team')]");
  await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/teams/my');
  console.log('User role switched to Team manager successfully.');

  // Switch to Individual User 
  await page.click('//*[@id="mat-select-value-3"]/span/mat-select-trigger/div');
  await page.waitForSelector("//mat-option[@id='mat-option-12']");
  await page.click("//mat-option[@id='mat-option-12']");
  console.log('User role switched to individual user successfully.');


  await context.tracing.stop({ path: 'trace-access.zip' });
});
