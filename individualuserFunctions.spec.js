const { test, expect } = require('@playwright/test');
const path = require('path');

// Reusable login function
async function login(page, email, password) {
    await page.goto('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/auth/login?mode=login');
    await page.getByRole('textbox', { name: 'Email' }).fill(email);
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
    await page.getByRole('button', { name: 'Log in' }).click();
    await expect(page).toHaveURL("https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/bookings");
    
  // Switch to Individual User 
//   await page.click('//*[@id="mat-select-value-3"]/span/mat-select-trigger/div');
//   await page.waitForSelector("//mat-option[@id='mat-option-12']");
//   await page.click("//mat-option[@id='mat-option-12']");
//   console.log('User role switched to individual user successfully.');

    // Dismiss cookie banner if it appears
    const cookieAccept = page.getByRole('button', { name: 'Accept' });
    if (await cookieAccept.isVisible()) {
        await cookieAccept.click();
    }
}

test.describe.serial('Individual User Flow', () => {
    const email = 'mihiliyamaheshika@gmail.com';
    const password = 'Mm1234';

    test('2 - Field Booking flow', async ({ page }) => {
        await login(page, email, password);

        await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/bookings');

        await page.getByRole('link', { name: 'Fields' }).click();
        await page.goto('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/fields');

                await page.getByRole('button', { name: 'Slysa' }).click();
        await page.getByRole('cell', { name: 'Slysa 2' }).click();
        await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/club/slysa/field/slysa-2');

        await page.locator('td:nth-child(6) > .calendar-table-cell-day-booking-wrapper').click();
        const startCell = page.locator('td:nth-child(6) > .calendar-table-cell-day-booking-wrapper');
        const endCell = page.locator('td:nth-child(6) > .calendar-table-cell-day-booking-wrapper');
        await startCell.waitFor({ state: 'visible' });
        await startCell.dragTo(endCell);

        // Select field part
        const fieldPart = page.getByRole('heading', { name: '1-6', exact: true });
        await fieldPart.waitFor({ state: 'visible' });
        await fieldPart.click();

        await page.getByRole('textbox', { name: 'Start time' }).click();
        await page.getByRole('button', { name: '12', exact: true }).click();
        await page.getByRole('button', { name: 'Ok' }).click();

        await fieldPart.click();

        await page.getByRole('textbox', { name: 'Finish time' }).click();
        await page.getByRole('button', { name: '6' }).click();
        await page.getByRole('button', { name: 'Ok' }).click();
        await page.getByRole('switch', { name: 'Match' }).click();
        await page.getByRole('button', { name: 'SEND REQUEST' }).click();

    });

    test('3 - Meeting room booking ', async ({ page }) => {
        await login(page, email, password);
        await page.locator("//span[contains(text(),'Meeting rooms, etc.')]").click();
        await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/objects?mode=list');

        // await page.pause();

        await page.getByRole('button', { name: 'Test Club' }).click();
        await page.getByRole('cell', { name: 'Test meeting room' }).click();
        await page.locator('td:nth-child(6) > .calendar-table-cell-day-booking-wrapper').click();
        const startCell = page.locator('td:nth-child(6) > .calendar-table-cell-day-booking-wrapper');
        const endCell = page.locator('td:nth-child(6) > .calendar-table-cell-day-booking-wrapper');
        await startCell.waitFor({ state: 'visible' });
        await startCell.dragTo(endCell);

        await page.getByRole('heading', { name: '1' }).click();
        await page.getByRole('textbox', { name: 'Start time' }).click();
        await page.getByRole('button', { name: '3', exact: true }).click();
        await page.getByRole('button', { name: 'Ok', exact: true }).click();
        await page.getByRole('textbox', { name: 'Finish time' }).click();
        await page.getByRole('button', { name: '6' }).click();
        await page.getByRole('button', { name: 'Ok', exact: true }).click();
        await page.getByRole('textbox', { name: 'Description' }).click();
        await page.getByRole('textbox', { name: 'Description' }).fill('Automation Test meeting');
        await page.getByRole('switch', { name: 'Match' }).click();
        await page.getByRole('button', { name: 'SEND REQUEST' }).click();
    });


    test('4 -  Send new message', async ({ page }) => {
        await login(page, email, password);
        await page.click("//span[contains(text(),'Messages')]");
        await page.locator("//span[normalize-space()='NEW MESSAGE']").click();
        await page.getByRole('textbox', { name: 'Subject' }).fill('Auto Subject');
        await page.getByRole('textbox', { name: 'Message' }).fill('Automated test message');
        await page.getByRole('button', { name: 'Send' }).click();
    });

    test('5 - Register new club', async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();


        await page.goto('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/about');


        await page.getByRole('link', { name: 'Register New Club' }).click();
        await page.getByText('Name of club').click();

        // Unique club name with timestamp
        const uniqueClubName = `ClubTest_${Date.now()}`;

        // Fill the textbox with the unique name
        await page.getByRole('textbox', { name: 'Name of club' }).fill(uniqueClubName);

        await page.getByRole('combobox', { name: 'Country Norway' }).locator('svg').click();
        await page.getByText('Sri Lanka').click();
        await page.locator('form mat-card').filter({ hasText: 'Pay as you go 0 NOK (0 USD' }).click();
        await page.getByRole('textbox', { name: 'Email' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('mihi@gmail.com');
        await page.getByRole('checkbox', { name: 'I wish to receive information' }).check();
        await page.getByRole('checkbox', { name: 'I accept subscription' }).check();
        await page.getByRole('button', { name: 'REGISTER CLUB' }).click();

    });

});

