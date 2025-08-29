const { test, expect } = require('@playwright/test');

test.use({ storageState: 'Tests/booking.json' });

//Slysa 2 team manager booking request
test('Booking request 1 ', async ({ page }) => {

    // test.use({ storageState: 'Tests/booking.json' });
    await page.goto('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/auth/login?mode=login');
    await page.getByRole('textbox', { name: 'Email' }).fill('mihiliyamaheshika@gmail.com');
    await page.getByText('Password', { exact: true }).fill('Mm1234');
    await page.waitForSelector('button', { timeout: 5000 })
    await page.getByRole('button', { name: 'Log in' }).click();

    await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/bookings');

    // Navigation to field
    await page.click("//span[contains(text(),'Fields')]");
    await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/fields?mode=list');

    //  Accessing to a field 
    await page.getByRole('textbox', { name: 'Search' }).click();
    await page.getByRole('textbox', { name: 'Search by name or club' }).fill('slysa');
    await page.getByRole('row', { name: 'New test field' }).click();
    await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/club/slysa/field/new-test-field');

    await page.locator('td:nth-child(6) > .calendar-table-cell-day-booking-wrapper').click();
    const startCell = page.locator('td:nth-child(6) > .calendar-table-cell-day-booking-wrapper');
    const endCell = page.locator('td:nth-child(6) > .calendar-table-cell-day-booking-wrapper');
    await startCell.waitFor({ state: 'visible' });
    await startCell.dragTo(endCell);
    //    await page.pause();

    // Wait for booking modal
    await page.getByRole('textbox', { name: 'Start time' }).click();
    await page.getByRole('button', { name: '2', exact: true }).click();
    await page.getByRole('button', { name: 'Ok' }).click();
    await page.getByRole('textbox', { name: 'Finish time' }).click();
    await page.getByRole('button', { name: '5' }).click();
    await page.getByRole('button', { name: 'Ok' }).click();
    await page.getByRole('switch', { name: 'Match' }).click();

    await page.getByRole('button', { name: 'SEND REQUEST' }).click();

});

//Global admin booking flow
test('Booking  2 ', async ({ page }) => {

    await page.goto('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/auth/login?mode=login');
    await page.getByRole('textbox', { name: 'Email' }).fill('mihiliyamaheshika@gmail.com');
    await page.getByText('Password', { exact: true }).fill('Mm1234');
    await page.waitForSelector('button', { timeout: 5000 })
    await page.getByRole('button', { name: 'Log in' }).click();
    await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/clubs');

    // Navigation to field
    await page.click("//span[contains(text(),'Fields')]");
    await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/fields');
    await page.getByRole('textbox', { name: 'Search' }).click();
    await page.getByRole('textbox', { name: 'Search by name or club' }).fill('Slysa');
    await page.getByRole('row', { name: 'SLYSA 1 SLYSA' }).click();

    await page.getByRole('button').filter({ hasText: 'navigate_next' }).click();
    await page.getByRole('button').filter({ hasText: 'navigate_next' }).click();

    // Wait for calendar to show September
    await page.waitForSelector("//div[normalize-space()='Saturday, Sep 13']", { state: 'visible' });

    // Click the date
    await page.locator("//div[normalize-space()='Saturday, Sep 13']").click();

    await page.waitForSelector('.calendar-table-cell-day-booking-wrapper', { state: 'visible' });

    await page.locator('td:nth-child(6) > .calendar-table-cell-day-booking-wrapper').click();

    await page.getByRole('heading', { name: 'test 1' }).click();
    await page.getByRole('textbox', { name: 'Start time' }).click();
    await page.getByRole('button', { name: '1', exact: true }).click();
    await page.getByRole('button', { name: 'Ok', exact: true }).click();
    await page.getByRole('textbox', { name: 'Finish time' }).click();
    await page.getByRole('button', { name: '2', exact: true }).click();
    await page.getByRole('button', { name: 'Ok', exact: true }).click();

    await page.getByRole('textbox', { name: 'Title' }).fill('Test match 2 ');
    await page.getByRole('switch', { name: 'Match' }).click();
    await page.getByRole('button', { name: 'Book field' }).click();

});

//club admin booking flow 
test('Booking 3 ', async ({ page }) => {

    await page.goto('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/auth/login?mode=login');
    await page.getByRole('textbox', { name: 'Email' }).fill('mihiliyamaheshika@gmail.com');
    await page.getByText('Password', { exact: true }).fill('Mm1234');
    await page.waitForSelector('button', { timeout: 5000 })
    await page.getByRole('button', { name: 'Log in' }).click();

    await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/fields');

    //  Accessing to a field 
    await page.click("//mat-cell[normalize-space()='New test field']");
    await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/club/slysa/field/new-test-field');
    const isVisible = await page.isVisible("//span[@class='title-content ng-star-inserted']");
    console.log('Is element visible:', isVisible);

    await page.locator('td:nth-child(6) > .calendar-table-cell-day-booking-wrapper').click();
    const startCell = page.locator('td:nth-child(6) > .calendar-table-cell-day-booking-wrapper');
    const endCell = page.locator('td:nth-child(6) > .calendar-table-cell-day-booking-wrapper');
    await startCell.waitFor({ state: 'visible' });
    await startCell.dragTo(endCell);

    //await page.getByRole('heading', { name: '2-' }).click();
    await page.getByRole('textbox', { name: 'Finish time' }).click();
    await page.getByRole('button', { name: '10' }).click();
    await page.getByRole('button', { name: 'Ok', exact: true }).click();
    await page.getByRole('dialog', { name: 'Book field - New test field' }).click();
    await page.getByRole('textbox', { name: 'Title' }).fill('test  1');
    await page.getByRole('switch', { name: 'Match' }).click();
    await page.getByRole('button', { name: 'Book field' }).click();

});


//Field admin booking flow
test('Booking 4 ', async ({ page }) => {

    await page.goto('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/auth/login?mode=login');

    await page.getByRole('textbox', { name: 'Email' }).fill('mihiliyamaheshika@gmail.com');
    await page.getByText('Password', { exact: true }).fill('Mm1234');
    await page.waitForSelector('button', { timeout: 5000 })
    await page.getByRole('button', { name: 'Log in' }).click();

    await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/about');

    await page.getByRole('link', { name: 'Fields' }).click();
    await page.getByRole('cell', { name: 'Field BFour' }).click();
    await page.goto('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/fields');
    await page.getByRole('cell', { name: 'Field A' }).click();

    await page.locator('td:nth-child(7) > .calendar-table-cell-day-booking-wrapper').click();

    const startCell = page.locator('td:nth-child(7) > .calendar-table-cell-day-booking-wrapper');
    const endCell = page.locator('td:nth-child(7) > .calendar-table-cell-day-booking-wrapper');
    await startCell.waitFor({ state: 'visible' });
    await startCell.dragTo(endCell);

    await page.getByRole('heading', { name: '-2' }).click();
    await page.getByRole('textbox', { name: 'Start time' }).click();
    await page.getByRole('button', { name: '3' }).click();
    await page.getByRole('button', { name: 'Ok', exact: true }).click();
    await page.getByRole('textbox', { name: 'Finish time' }).click();
    await page.getByRole('button', { name: '9' }).click();
    await page.getByRole('button', { name: 'Ok', exact: true }).click();
    await page.getByText('Title').click();
    await page.getByRole('textbox', { name: 'Title' }).fill('test one');
    await page.getByRole('switch', { name: 'Match' }).click();
    // await page.getByRole('button', { name: 'Book field' }).click();
    await page.getByRole('button', { name: 'Update booking' }).click();

});

//Individual user booking tequest 
test('Booking  5 ', async ({ page }) => {

    await page.goto('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/auth/login?mode=login');
    await page.getByRole('textbox', { name: 'Email' }).fill('mihiliyamaheshika@gmail.com');
    await page.getByText('Password', { exact: true }).fill('Mm1234');
    await page.waitForSelector('button', { timeout: 5000 })
    await page.getByRole('button', { name: 'Log in' }).click();

    await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/bookings');
    await page.getByRole('link', { name: 'Fields' }).click();
    await page.getByRole('textbox', { name: 'Search' }).click();

    await page.getByRole('textbox', { name: 'Search by name or club' }).fill('Slysa');

    await page.getByRole('row', { name: 'New test field SLYSA' }).click();
    await page.getByRole('button').filter({ hasText: 'navigate_next' }).click();


    await page.locator('td:nth-child(7) > .calendar-table-cell-day-booking-wrapper').click();

    const startCell = page.locator('td:nth-child(7) > .calendar-table-cell-day-booking-wrapper');
    const endCell = page.locator('td:nth-child(7) > .calendar-table-cell-day-booking-wrapper');
    await startCell.waitFor({ state: 'visible' });
    await startCell.dragTo(endCell);


    await page.getByRole('textbox', { name: 'Title' }).fill('test 1');

    await page.getByRole('textbox', { name: 'Description' }).fill('automation testing');
    await page.getByRole('button', { name: 'SEND REQUEST' }).click();
   
    //await page.getByRole('button', { name: 'UPDATE BOOKING' }).click();

});

