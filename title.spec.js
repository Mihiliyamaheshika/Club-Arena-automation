const { test,expect } = require('@playwright/test')

test ('My first test' , async ({page}) => {

  await page.goto('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/about');
  await expect(page).toHaveTitle ('Club Arena')

});
