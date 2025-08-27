const { test, expect } = require('@playwright/test');


test('meeting rooms - create', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    // Navigate to login page
    await page.goto('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/auth/login?mode=login');
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

    await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/clubs');

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

    await page.locator("//span[normalize-space()='CREATE OBJECT']").click();

    await page.getByRole('menuitem', { name: 'Cafeteria' }).click();

    await page.getByRole('textbox', { name: 'Name' }).fill('Cafetest8');

    await page.getByRole('combobox', { name: 'Club' }).locator('svg').click();
    await page.getByRole('option', { name: 'SLYSA' }).locator('span').click();
    await page.getByRole('button', { name: 'Create cafeteria' }).click();

    // await page.getByRole('combobox', { name: 'Club' }).locator('svg').click();
    // await page.getByRole('option', { name: 'SLYSA' }).locator('span').click();
    // await page.getByRole('button', { name: 'Create cafeteria' }).click();

    // await page.getByText('Description', { exact: true }).click();

    // await page.getByRole('textbox', { name: 'Description' }).fill('Test one');
    // await page.getByText('Address', { exact: true }).click();

    // await page.getByRole('textbox', { name: 'Address' }).fill('Sri Lanka');
    // await page.getByRole('tab', { name: 'Settings' }).click();
    // await page.getByRole('tab', { name: 'Approval' }).click();
    // await page.getByRole('switch', { name: 'Turn on auto-approval' }).click();
    // await page.getByRole('tab', { name: 'Booking' }).click();

    // await page.getByRole('tab', { name: 'Booking' }).click();
    // await page.getByLabel('', { exact: true }).click();
    // await page.getByRole('tab', { name: 'Track parts' }).click();
    // await page.getByRole('tab', { name: 'Pricing details' }).click();
    // await page.getByText('Price', { exact: true }).click();
    // await page.getByRole('spinbutton', { name: 'Price' }).fill('500');
});

test('meeting rooms - edit', async ({ browser }) => {
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

    await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/clubs');

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
    //  await page.pause();
    await page.getByRole('row', { name: 'Cafe 1 SLYSA' }).getByRole('button').first().click();
    await page.getByRole('textbox', { name: 'Name' }).click();
    await page.getByRole('textbox', { name: 'Name' }).fill('Cafe 1');
    await page.getByRole('textbox', { name: 'Description' }).click();
    await page.getByRole('textbox', { name: 'Description' }).fill('Test one here');
    await page.getByText('Key info (optional) Here you').click();
    await page.getByText('Settings', { exact: true }).click();

    await page.getByRole('combobox', { name: 'Visibility Internal (Admins' }).locator('svg').click();

    await page.getByRole('option', { name: 'Internal (Admins and team' }).locator('span').click();
    await page.getByRole('spinbutton', { name: 'Snap time (minutes)' }).click();
    await page.getByRole('spinbutton', { name: 'Snap time (minutes)' }).fill('5');


});

test('meeting rooms - allocations', async ({ browser }) => {
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

    await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/clubs');

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

    await page.getByRole('row', { name: 'Cafetest SLYSA' }).getByRole('button').nth(1).click();
    await page.locator('td:nth-child(6) > .calendar-table-cell-day-booking-wrapper').dblclick();
    await page.locator('#select-field-part div').nth(3).click();
    await page.getByRole('combobox', { name: 'Select a club* Select a club*' }).locator('svg').click();
    await page.getByText('Slamsa').click();
    await page.getByRole('switch', { name: 'Send notification to club' }).click();
    await page.getByRole('textbox', { name: 'Start', exact: true }).click();
    await page.getByRole('textbox', { name: 'Start', exact: true }).fill('14:45');
    await page.getByRole('textbox', { name: 'End' }).click();
    await page.getByRole('textbox', { name: 'End' }).fill('18:15');
    await page.getByRole('switch', { name: 'Repeating timeslot' }).click();
    await page.getByRole('combobox', { name: 'Recurrence type Daily' }).click();
    await page.getByRole('listbox', { name: 'Recurrence type' }).click();
    await page.locator('mat-form-field').filter({ hasText: 'End of recurrene' }).getByLabel('Open calendar').click();
    await page.getByRole('button', { name: 'Next month' }).click();
    await page.getByRole('button', { name: 'September 28,' }).click();

    await page.getByRole('button', { name: 'Create allocation' }).click();


});


test.only('track meeting room', async ({ page }) => {
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

    await page.getByRole('row', { name: 'Cafe 1 SLYSA' }).getByRole('button').first().click();

    await page.getByText('Track parts').click();
    await page.getByRole('textbox', { name: 'Part' }).click();
    await page.getByRole('textbox', { name: 'Part' }).fill('track part');
    await page.getByRole('textbox', { name: 'Part' }).press('Enter');
    await page.locator('.layer').click();

});

//This below code script is a function of stage application.

// test('Add working hours', async ({ page }) => {
//     await page.goto('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/about');
//     await page.locator("//a[normalize-space()='Log in']").click();

//     const email = 'mihiliyamaheshika@gmail.com';
//     const password = 'Mm1234';

//     // Check if email format is valid using regex
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//         throw new Error(`Invalid email format: ${email}`);
//     }

//     await page.getByRole('textbox', { name: 'Email' }).fill(email);
//     await page.getByLabel('Password', { exact: true }).fill(password);
//     await page.waitForSelector('button', { timeout: 5000 });
//     await page.getByRole('button', { name: 'Log in' }).click();

//     await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/clubs');



//     await page.locator("//span[contains(text(),'Meeting rooms, etc.')]").click();
//     await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/objects');

//       await page.getByRole('textbox', { name: 'Search' }).click();
//     await page.getByRole('textbox', { name: 'Search by name or club' }).fill('slysa');

//     await page.getByRole('row', { name: 'Cafe 1 SLYSA' }).getByRole('button').first().click();
//     //await page.getByRole('menuitem', { name: 'Edit cafeteria' }).click();
//     await page.getByText('Working hours').click();
//     await page.locator('#operationalFrom_0_0').click();
//     await page.locator('#operationalFrom_0_0').fill('05:00');
//     await page.locator('#operationalTo0_0').click();
//     await page.locator('#operationalTo0_0').fill('12:00');
//     await page.getByRole('button', { name: 'Add another period' }).first().click();
//     await page.locator('#operationalFrom_0_3').click();
//     await page.locator('#operationalFrom_0_3').fill('00:01');
//     await page.locator('#operationalTo0_3').click();
//     await page.locator('#operationalTo0_3').fill('14:00');

// });

test('Add pricing details', async ({ page }) => {
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

    await page.getByRole('row', { name: 'Cafe 1 SLYSA' }).getByRole('button').first().click();

    await page.getByRole('tab', { name: 'Pricing details' }).click();
    await page.getByText('Price', { exact: true }).click();
    await page.getByRole('spinbutton', { name: 'Price' }).fill('500');
    await page.locator('.prices').click();

});
