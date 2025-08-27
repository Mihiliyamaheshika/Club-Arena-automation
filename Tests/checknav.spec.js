const { test, expect } = require('@playwright/test');

test('Navigation Test - Menu Links with trace', async ({ browser }) => {
  // Create a new browser context for tracing
  const context = await browser.newContext();

  // Start tracing
  await context.tracing.start({ screenshots: true, snapshots: true });

  const page = await context.newPage();

  // Login
  await page.goto('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/auth/login?mode=login');
  await page.getByRole('textbox', { name: 'Email' }).fill('mihiliyamaheshika@gmail.com');
  await page.getByText('Password', { exact: true }).fill('Mm1234');
  await page.waitForSelector('button', { timeout: 5000 });
  await page.getByRole('button', { name: 'Log in' }).click();

  await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/clubs');

  // Access field
  // await page.getByRole('textbox', { name: 'Search' }).click();
  // await page.getByRole('textbox', { name: 'Search by name or club' }).fill('slysa');
  // await page.getByRole('row', { name: 'SLYSA -field SLYSA' }).click();

  // Navigation through menu links
  const links = [
    { selector: "//a[@title='Bookings']//span[@class='mat-mdc-list-item-unscoped-content mdc-list-item__primary-text']", url: 'https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/bookings' },
    { selector: "//a[@title='Booking requests']//span[@class='mat-mdc-list-item-unscoped-content mdc-list-item__primary-text']", url: 'https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/requests' },
    { selector: "//a[@title='Fields']//span[@class='mat-mdc-list-item-unscoped-content mdc-list-item__primary-text']", url: 'https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/fields' },
    { selector: "//span[contains(text(),'Meeting rooms, etc.')]", url: 'https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/objects' },
    { selector: "//a[@title='Users']//span[@class='mat-mdc-list-item-unscoped-content mdc-list-item__primary-text']", url: 'https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/users' },
    { selector: "//span[contains(text(),'Clubs')]", url: 'https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/clubs' },
    { selector: "//a[@title='Teams']//span[@class='mat-mdc-list-item-unscoped-content mdc-list-item__primary-text']", url: 'https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/teams' },
     { selector: "//span[contains(text(),'Logs')]", url: 'https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/logs' },
    { selector: "//a[@title='Messages']//span[@class='mat-mdc-list-item-unscoped-content mdc-list-item__primary-text']", url: 'https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/messages' },
    { selector: "//span[normalize-space()='Help center']", url: 'https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/help-center' },
    { selector: "//span[normalize-space()='About']", url: 'https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/about' },
  ];

  for (const link of links) {
    await page.click(link.selector);
    await expect(page).toHaveURL(link.url);
  }

  //  Stop tracing and save file
  await context.tracing.stop({ path: 'trace-navigation.zip' });
});
