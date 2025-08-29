const { test, expect } = require('@playwright/test');


test('Register new club', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    // Navigate to about page
  await page.goto('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/about');
    
  await page.getByRole('link', { name: 'Register New Club' }).click();
  await page.getByText('Name of club').click();
 
  await page.getByRole('textbox', { name: 'Name of club' }).fill('Club test');
  await page.getByRole('combobox', { name: 'Country Norway' }).locator('svg').click();
  await page.getByText('Sri Lanka').click();
  await page.locator('mat-card').filter({ hasText: 'Most popular Pay as you go 0' }).click();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('mihi@gmail.com');
  await page.getByRole('checkbox', { name: 'I wish to receive information' }).check();
  await page.getByRole('checkbox', { name: 'I accept subscription' }).check();
  await page.getByRole('button', { name: 'REGISTER CLUB' }).click();
 


  



    

  

    
});
