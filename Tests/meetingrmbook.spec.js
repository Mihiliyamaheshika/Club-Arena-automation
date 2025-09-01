const { test, expect } = require('@playwright/test');


test('meeting rooms - booking - Club Admin', async ({ browser }) => {
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

    await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/fields');

    //navigate to meeting rooms
    await page.click("//span[contains(text(),'Meeting rooms, etc.')]");
    await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/objects');

    // Close the cookie banner if visible
    const cookieBanner = page.locator('.cookies-eu-banner');
    if (await cookieBanner.isVisible()) {
        const acceptBtn = cookieBanner.locator('text=Accept'); // Adjust based on actual button text
        if (await acceptBtn.isVisible()) {
            await acceptBtn.click();
        }
    }


    await page.getByRole('cell', { name: 'Cafetest5', exact: true }).click();
    await page.locator('td:nth-child(7) > .calendar-table-cell-day-booking-wrapper').click();
    //  await page.locator('td:nth-child(7) > .calendar-table-cell-day-booking-wrapper').click();

    const startCell = page.locator('td:nth-child(7) > .calendar-table-cell-day-booking-wrapper');
    const endCell = page.locator('td:nth-child(7) > .calendar-table-cell-day-booking-wrapper');
    await startCell.waitFor({ state: 'visible' });
    await startCell.dragTo(endCell);

    //await page.pause();
    await page.getByRole('textbox', { name: 'Start time' }).click();
    await page.getByRole('button', { name: '4' }).click();
    await page.getByRole('button', { name: 'Ok', exact: true }).click();

    await page.getByRole('textbox', { name: 'Finish time' }).click();
    await page.getByRole('button', { name: '9' }).click();
    await page.getByRole('button', { name: 'Ok', exact: true }).click();


    await page.getByRole('switch', { name: 'Match' }).click();

    await page.getByRole('textbox', { name: 'Title' }).click();

    await page.getByRole('textbox', { name: 'Title' }).fill('Test');
    await page.getByRole('button', { name: 'Book cafeteria' }).click();
});

test('booking - meeting rooms - Global admin', async ({ page }) => {
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

    //await page.pause();
    await page.getByRole('cell', { name: 'Cafetest4' }).click();
    await page.locator('td:nth-child(7) > .calendar-table-cell-day-booking-wrapper').click();
    const startCell = page.locator('td:nth-child(7) > .calendar-table-cell-day-booking-wrapper');
    const endCell = page.locator('td:nth-child(7) > .calendar-table-cell-day-booking-wrapper');
    await startCell.waitFor({ state: 'visible' });
    await startCell.dragTo(endCell);

    await page.getByRole('textbox', { name: 'Finish time' }).click();
    await page.getByRole('button', { name: '5' }).click();

    await page.getByRole('button', { name: 'Ok', exact: true }).click();
    await page.getByRole('textbox', { name: 'Title' }).click();
    await page.getByRole('textbox', { name: 'Title' }).fill('test 2 ');
    await page.getByRole('switch', { name: 'Repeat bookings' }).click();
    await page.locator('mat-form-field').filter({ hasText: 'Recurrence end' }).getByLabel('Open calendar').click();
    await page.getByRole('button', { name: 'September 28,' }).click();
    await page.getByRole('button', { name: 'BOOK CAFETERIA' }).click();
});

test('booking - meeting rooms - team manager', async ({ page }) => {
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

    await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/bookings');

    await page.locator("//span[contains(text(),'Meeting rooms, etc.')]").click();
    await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/objects?mode=list');


    await page.getByRole('cell', { name: 'Cafetest4' }).click();
    await page.locator('td:nth-child(5) > .calendar-table-cell-day-booking-wrapper').click();
    const startCell = page.locator('td:nth-child(5) > .calendar-table-cell-day-booking-wrapper');
    const endCell = page.locator('td:nth-child(5) > .calendar-table-cell-day-booking-wrapper');
    await startCell.waitFor({ state: 'visible' });
    await startCell.dragTo(endCell);

    await page.getByRole('textbox', { name: 'Start time' }).click();
    await page.getByRole('button', { name: '3', exact: true }).click();

    await page.getByRole('button', { name: 'Ok', exact: true }).click();

    await page.getByRole('button', { name: 'SEND REQUEST' }).click();
});

test.only('booking - meeting rooms - individual user', async ({ page }) => {
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

    await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/bookings');

    await page.locator("//span[contains(text(),'Meeting rooms, etc.')]").click();
    await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/objects?mode=list');

    await page.getByRole('textbox', { name: 'Search' }).click();

    await page.getByRole('textbox', { name: 'Search by name or club' }).fill('Cafetest');
    await page.getByRole('cell', { name: 'Cafetest5' }).click();
    await page.getByRole('button', { name: 'Cafetest5' }).click();


    await page.locator('td:nth-child(6) > .calendar-table-cell-day-booking-wrapper').click();
    const startCell = page.locator('td:nth-child(6) > .calendar-table-cell-day-booking-wrapper');
    const endCell = page.locator('td:nth-child(6) > .calendar-table-cell-day-booking-wrapper');
    await startCell.waitFor({ state: 'visible' });
    await startCell.dragTo(endCell);

    await page.getByRole('textbox', { name: 'Start time' }).click();
    await page.getByRole('button', { name: '3' }).click();

    await page.getByRole('textbox', { name: 'Title' }).click();
    await page.getByRole('textbox', { name: 'Title' }).fill('test 3 ');
    await page.getByText('Match').click();
    await page.locator("//button[normalize-space()='SEND REQUEST']").click();
});
