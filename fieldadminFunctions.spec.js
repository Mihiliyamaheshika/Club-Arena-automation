const { test, expect } = require('@playwright/test');
const path = require('path');

// Reusable login function
async function login(page, email, password) {
    await page.goto('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/auth/login?mode=login');
    await page.getByRole('textbox', { name: 'Email' }).fill(email);
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
    await page.getByRole('button', { name: 'Log in' }).click();
    await expect(page).toHaveURL("https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/about");

    //  Switch to Field Admin 
    //  await page.click('//*[@id="mat-select-value-3"]/span/mat-select-trigger/div');
    //   await page.waitForSelector("//div[@class='area-role-name'][normalize-space()='Admin']");
    //   await page.click("//div[@class='area-role-name'][normalize-space()='Admin']");

    // Dismiss cookie banner if it appears
    const cookieAccept = page.getByRole('button', { name: 'Accept' });
    if (await cookieAccept.isVisible()) {
        await cookieAccept.click();
    }
}

test.describe.serial('Field Admin Flow', () => {
    const email = 'mihiliyamaheshika@gmail.com';
    const password = 'Mm1234';

    test('2 - Field Booking flow', async ({ page }) => {
        await login(page, email, password);

        await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/about');

        await page.getByRole('link', { name: 'Fields' }).click();
        await page.goto('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/fields');
        await page.getByRole('cell', { name: 'Slysa3' }).click();

        await page.locator('td:nth-child(6) > .calendar-table-cell-day-booking-wrapper').click();
        const startCell = page.locator('td:nth-child(6) > .calendar-table-cell-day-booking-wrapper');
        const endCell = page.locator('td:nth-child(6) > .calendar-table-cell-day-booking-wrapper');
        await startCell.waitFor({ state: 'visible' });
        await startCell.dragTo(endCell);

        const fieldPartHeading = page.getByRole('heading', { name: '1-4' }).first();

        // Ensure it's in the DOM and visible
        await expect(fieldPartHeading).toBeVisible({ timeout: 5000 });
        await expect(fieldPartHeading).toBeEnabled();

        // Try normal click first
        try {
            await fieldPartHeading.click({ timeout: 5000 });
        } catch (e) {
            console.warn("Normal click failed, trying force click in headless mode...");
            await fieldPartHeading.click({ force: true });
        }

        await page.getByRole('textbox', { name: 'Start time' }).click();
        await page.getByRole('button', { name: '12' }).click();
        await page.getByRole('button', { name: 'Ok', exact: true }).click();
        await page.getByRole('textbox', { name: 'Finish time' }).click();
        await page.getByRole('button', { name: '10' }).click();
        await page.getByRole('button', { name: 'Ok', exact: true }).click();
        await page.getByText('Title').click();
        await page.getByRole('textbox', { name: 'Title' }).fill('test one');
        await page.getByRole('switch', { name: 'Match' }).click();
        await page.getByRole('button', { name: 'Book field' }).click();

    });

    test('3 - Meeting room booking ', async ({ page }) => {
        await login(page, email, password);
        await page.locator("//span[contains(text(),'Meeting rooms, etc.')]").click();
        await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/objects');


        await page.getByRole('cell', { name: 'Test meeting room' }).click();
        await page.locator('td:nth-child(6) > .calendar-table-cell-day-booking-wrapper').click();
        const startCell = page.locator('td:nth-child(6) > .calendar-table-cell-day-booking-wrapper');
        const endCell = page.locator('td:nth-child(6) > .calendar-table-cell-day-booking-wrapper');
        await startCell.waitFor({ state: 'visible' });
        await startCell.dragTo(endCell);

        await page.getByRole('heading', { name: '1' }).click();
        await page.getByRole('textbox', { name: 'Start time' }).click();
        await page.getByRole('button', { name: '2', exact: true }).click();
        await page.getByRole('button', { name: 'Ok', exact: true }).click();
        await page.getByRole('textbox', { name: 'Finish time' }).click();
        await page.getByRole('button', { name: '5' }).click();
        await page.getByRole('button', { name: 'Ok', exact: true }).click();
        await page.getByRole('textbox', { name: 'Title' }).click();
        await page.getByRole('textbox', { name: 'Title' }).fill('For test meeting');
        await page.getByRole('textbox', { name: 'Description' }).click();
        await page.getByRole('textbox', { name: 'Description' }).fill('Test meeting');
        await page.getByRole('switch', { name: 'Match' }).click();
        await page.getByRole('dialog', { name: 'Book meeting room - Test' }).click();
    });



    test('4 - Import matches', async ({ page }) => {
        await login(page, email, password);

        await page.locator("//a[@title='Import']").click();
        await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/import');

        await page.getByRole('textbox', { name: '+ Add a new Arena-ID' }).click();
        await page.getByRole('textbox', { name: '+ Add a new Arena-ID' }).fill('2340');
        await page.getByRole('button', { name: 'Get matches to import' }).click();


        await page.getByRole('button', { name: /Matches to be imported/i }).click();

        // Select the first row in the import list
        await page.getByRole('row', { name: 'Week When Field Parts Team /' }).getByLabel('').uncheck();

        const firstRowCell = page.locator(
            "//mat-expansion-panel[contains(@class,'mat-expanded')]//mat-row[1]//mat-cell[1]"
        );

        await firstRowCell.locator("input[type='checkbox']").check();

        await firstRowCell.locator("mat-checkbox").click();

        await page.locator("//span[normalize-space()='Import now']").click();
        await page.locator("//span[normalize-space()='Ok']").click();

    });

    test('5 - Upload team leads ', async ({ page }) => {
        await login(page, email, password);
        await page.locator("//span[normalize-space()='Upload team leads']").click();
        await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/upload-team-leads');

        const uploadIcon = page.locator('label').getByText('cloud_upload');
        await expect(uploadIcon).toBeVisible({ timeout: 10000 });
        await uploadIcon.click();

        const filePath = path.resolve('C:/Users/Mihi/Documents/Playwright Automation/Tests/TeamUpload (4) (4).xlsx');
        const fileInput = page.locator('input[type="file"]');
        await fileInput.setInputFiles(filePath);
    });


    test('6 -  Send new message', async ({ page }) => {
        await login(page, email, password);
        await page.click("//span[contains(text(),'Messages')]");
        await page.locator("//span[normalize-space()='NEW MESSAGE']").click();
        await page.getByRole('textbox', { name: 'Subject' }).fill('Auto Subject');
        await page.getByRole('textbox', { name: 'Message' }).fill('Automated test message');
        await page.getByRole('button', { name: 'Send' }).click();
    });

    test('7 - Register new club', async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();


        await page.goto('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/about');


        await page.getByRole('link', { name: 'Register New Club' }).click();
        await page.getByText('Name of club').click();

        // Generate a unique club name with timestamp
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
