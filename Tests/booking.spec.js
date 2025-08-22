const { test, expect } = require('@playwright/test');

test.use({ storageState: 'Tests/booking.json' });

//Slysa 2 team manager booking request
test('Booking request 1 ', async ({ page }) => {

    // test.use({ storageState: 'Tests/booking.json' });
    await page.goto('https://coach-arena-test.azurewebsites.net/auth/login?mode=login');
    await page.getByRole('textbox', { name: 'Email' }).fill('mihiliyamaheshika@gmail.com');
    await page.getByText('Password', { exact: true }).fill('Mm1234');
    await page.waitForSelector('button', { timeout: 5000 })
    await page.getByRole('button', { name: 'Log in' }).click();

    await expect(page).toHaveURL('https://coach-arena-test.azurewebsites.net/fields?mode=list');

    //  Accessing to a field 
    await page.getByRole('textbox', { name: 'Search' }).click();
    await page.getByRole('textbox', { name: 'Search by name or club' }).fill('slysa');
    await page.getByRole('row', { name: 'Slysa 2 SLYSA' }).click();
    await expect(page).toHaveURL('https://coach-arena-test.azurewebsites.net/club/slysa/field/slysa-2');
    const isVisible = await page.isVisible("//span[@class='title-content ng-star-inserted']");
    console.log('Is element visible:', isVisible);

    await page.locator('td:nth-child(5) > .calendar-table-cell-day-booking-wrapper').click();
    await page.getByRole('heading', { name: '3-' }).click();
    await page.getByRole('textbox', { name: 'Finish time' }).click();
    await page.getByRole('button', { name: '10' }).click();
    await page.getByRole('button', { name: 'Ok' }).click();
    await page.getByRole('heading', { name: '3-' }).click();
    await page.getByRole('button', { name: 'SEND REQUEST' }).click();

});

//Global admin booking flow
test.only('Booking  2 ', async ({ page }) => {

    await page.goto('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/auth/login?mode=login');
    await page.getByRole('textbox', { name: 'Email' }).fill('mihiliyamaheshika@gmail.com');
    await page.getByText('Password', { exact: true }).fill('Mm1234');
    await page.waitForSelector('button', { timeout: 5000 })
    await page.getByRole('button', { name: 'Log in' }).click();
    await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/clubs');

    // Navigation to field
    await page.click("//span[contains(text(),'Fields')]");
    await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/fields');

   await page.pause();
    await page.getByRole('textbox', { name: 'Search' }).click();
    await page.getByRole('textbox', { name: 'Search by name or club' }).fill('Slysa');
    await page.getByRole('row', { name: 'SLYSA 1 SLYSA' }).click();

    await page.getByRole('button').filter({ hasText: 'navigate_next' }).click();
    await page.getByRole('button').filter({ hasText: 'navigate_next' }).click();

    // Wait for calendar to show September
    await page.waitForSelector("//div[normalize-space()='Saturday, Sep 6']", { state: 'visible' });

    // Click the date
    await page.locator("//div[normalize-space()='Saturday, Sep 6']").click();

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


    await page.goto('https://coach-arena-test.azurewebsites.net/auth/login?mode=login');

    await page.getByRole('textbox', { name: 'Email' }).fill('mihiliyamaheshika@gmail.com');
    await page.getByText('Password', { exact: true }).fill('Mm1234');
    await page.waitForSelector('button', { timeout: 5000 })
    await page.getByRole('button', { name: 'Log in' }).click();


    await expect(page).toHaveURL('https://coach-arena-test.azurewebsites.net/fields');

    //  Accessing to a field 
    await page.click("//mat-cell[normalize-space()='Slysa 2']");
    await expect(page).toHaveURL('https://coach-arena-test.azurewebsites.net/club/slysa/field/slysa-2');
    const isVisible = await page.isVisible("//span[@class='title-content ng-star-inserted']");
    console.log('Is element visible:', isVisible);


    //await page.pause()
    await page.locator('td:nth-child(5) > .calendar-table-cell-day-booking-wrapper').click();
    await page.getByRole('heading', { name: '3-' }).click();
    await page.getByRole('textbox', { name: 'Finish time' }).click();
    await page.getByRole('button', { name: '10' }).click();
    await page.getByRole('button', { name: 'Ok', exact: true }).click();
    await page.getByRole('dialog', { name: 'Book field - Slysa' }).click();
    await page.getByRole('textbox', { name: 'Title' }).fill('test  1');
    await page.getByRole('switch', { name: 'Match' }).click();
    await page.getByRole('button', { name: 'Book field' }).click();


});


//Field admin booking flow
test('Booking 4 ', async ({ page }) => {


    await page.goto('https://coach-arena-test.azurewebsites.net/auth/login?mode=login');

    await page.getByRole('textbox', { name: 'Email' }).fill('mihiliyamaheshika@gmail.com');
    await page.getByText('Password', { exact: true }).fill('Mm1234');
    await page.waitForSelector('button', { timeout: 5000 })
    await page.getByRole('button', { name: 'Log in' }).click();


    await expect(page).toHaveURL('https://coach-arena-test.azurewebsites.net/fields');

    //  Accessing to a field 
    await page.click("//mat-cell[normalize-space()='LD CLUB Field']");
    await expect(page).toHaveURL('https://coach-arena-test.azurewebsites.net/club/ld-club/field/ld-club-field');
    const isVisible = await page.isVisible("//span[@class='title-content ng-star-inserted']");
    console.log('Is element visible:', isVisible);

    await page.locator('td:nth-child(6) > .calendar-table-cell-day-booking-wrapper').click();
    await page.getByRole('heading', { name: '4-8' }).click();
    await page.getByRole('textbox', { name: 'Start time' }).click();
    await page.getByRole('button', { name: '8' }).click();
    await page.getByRole('button', { name: 'Ok', exact: true }).click();
    await page.getByRole('textbox', { name: 'Title' }).dblclick();
    await page.getByRole('textbox', { name: 'Title' }).fill('test 2 ');
    await page.getByRole('switch', { name: 'Repeat bookings' }).click();
    await page.getByRole('combobox', { name: 'Recurrence type Weekly' }).click();
    await page.getByRole('listbox', { name: 'Recurrence type' }).click();

    await page.getByRole('checkbox', { name: 'Friday' }).uncheck();
    await page.getByRole('checkbox', { name: 'Thursday' }).uncheck();
    await page.getByRole('checkbox', { name: 'Wednesday' }).uncheck();
    await page.getByRole('checkbox', { name: 'Tuesday' }).uncheck();
    await page.locator('mat-form-field').filter({ hasText: 'Recurrence end' }).getByLabel('Open calendar').click();
    await page.getByRole('button', { name: 'Next month' }).click();
    await page.getByRole('button', { name: 'September 25,' }).click();
    await page.getByRole('button', { name: 'Book field' }).click();

});

//Individual user booking tequest 
test('Booking  5 ', async ({ page }) => {

    await page.goto('https://coach-arena-test.azurewebsites.net/auth/login?mode=login');
    await page.getByRole('textbox', { name: 'Email' }).fill('mihiliyamaheshika@gmail.com');
    await page.getByText('Password', { exact: true }).fill('Mm1234');
    await page.waitForSelector('button', { timeout: 5000 })
    await page.getByRole('button', { name: 'Log in' }).click();

    await expect(page).toHaveURL('https://coach-arena-test.azurewebsites.net/fields?mode=list');


    await page.getByRole('textbox', { name: 'Search' }).click();

    await page.getByRole('textbox', { name: 'Search by name or club' }).fill('Slysa');

    await page.getByRole('row', { name: 'SLYSA -field SLYSA' }).click();
    await page.locator('td:nth-child(7) > .calendar-table-cell-day-booking-wrapper').click();
    await page.locator('div:nth-child(4) > .field-part-group > .field-part-group-content > div > .field-part-name-container').click();
    await page.getByText('Title').click();
    await page.getByRole('textbox', { name: 'Title' }).fill('test');

    await page.getByRole('textbox', { name: 'Description' }).fill('automation testing');
    await page.getByRole('button', { name: 'SEND REQUEST' }).click();

});
