const { test, expect } = require('@playwright/test');
const path = require('path');

// Reusable login function
async function login(page, email, password) {
    await page.goto('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/auth/login?mode=login');
    await page.getByRole('textbox', { name: 'Email' }).fill(email);
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
    await page.getByRole('button', { name: 'Log in' }).click();
    await expect(page).toHaveURL("https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/fields");

    //      //  Switch to Club Admin 
    //   await page.click('//*[@id="mat-select-value-3"]/span/mat-select-trigger/div');
    //   await page.waitForSelector("//mat-option[@id='mat-option-8']");
    //   await page.click("//mat-option[@id='mat-option-8']");
    //   await page.click("//span[contains(text(),'Club Settings')]");
    //   await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/clubs/slysa/edit?tab=details');
    //   console.log('User role switched to SLYSA - club successfully.');

    // Dismiss cookie banner if it appears
    const cookieAccept = page.getByRole('button', { name: 'Accept' });
    if (await cookieAccept.isVisible()) {
        await cookieAccept.click();
    }
}

test.describe.serial('Club Admin Flow', () => {
    const email = 'mihiliyamaheshika@gmail.com';
    const password = 'Mm1234';

    test('2 - Create new field', async ({ page }) => {
        await login(page, email, password);
        
        await page.click("//a[@title='Fields']");
        await expect(page).toHaveURL("https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/fields");

        await page.getByRole('button', { name: 'CREATE FIELD' }).click();
        const uniqueFieldName = `Auto Test Field ${Date.now()}`;
        await page.getByRole('textbox', { name: 'Name' }).fill(uniqueFieldName);

        await page.getByRole('combobox', { name: 'Field layout' }).click();
        await page.getByRole('listbox', { name: 'Field layout' }).click();
        await page.getByRole('button', { name: 'Create field' }).click();
    });

    test('3 - Allocate a field', async ({ page }) => {
        await login(page, email, password);

        await page.locator("//mat-icon[normalize-space()='arrow_drop_down']").click();

        //Accessing to Slaysa field
        const slysaOption = page.locator("//mat-option//div[normalize-space()='Slysa']");
        await slysaOption.waitFor({ state: 'visible' });
        await slysaOption.click();

        await page.locator("//a[@title='Fields']").click();
        await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/fields');

        //await page.getByRole('button', { name: 'End tour' }).click();
        // await page.getByRole('button', { name: 'Don\'t show again' }).click();
        await page.getByRole('row', { name: 'Slysa 2 SLYSA' }).getByRole('button').nth(1).click();
        // await page.getByRole('button', { name: 'End tour' }).click();
        // await page.getByRole('button', { name: 'Don\'t show again' }).click();

        await page.locator('td:nth-child(6) > .calendar-table-cell-day-booking-wrapper').click();
        await page.locator('.field-part-group-content').first().click();
        await page.getByRole('textbox', { name: 'Start', exact: true }).click();
        await page.getByRole('textbox', { name: 'Start', exact: true }).fill('11:15');
        await page.getByRole('textbox', { name: 'End', exact: true }).click();
        await page.getByRole('textbox', { name: 'End', exact: true }).fill('16:45');
        await page.getByRole('switch', { name: 'Repeating timeslot' }).click();

        await page.getByRole('combobox', { name: 'Recurrence type Daily' }).locator('svg').click();
        await page.getByRole('listbox', { name: 'Recurrence type' }).click();

        const today = new Date();
        today.setDate(today.getDate() + 30);

        const year = today.getFullYear();
        const month = today.toLocaleString('default', { month: 'long' });
        const day = today.getDate();

        await page.locator('mat-form-field')
            .filter({ hasText: 'End of recurrene' })
            .getByLabel('Open calendar')
            .click();

        // Navigate months until correct one is visible
        while (!(await page.getByRole('button', { name: new RegExp(`${month} ${day}, ${year}`) }).isVisible())) {
            await page.getByRole('button', { name: 'Next month' }).click();
        }

        // Click the dynamic date
        await page.getByRole('button', { name: `${month} ${day}, ${year}` }).click();

        await page.getByRole('button', { name: 'Create allocation' }).click();
    });

    test('4 - Create new team', async ({ page }) => {
        await login(page, email, password);
        await page.click("//a[@title='Teams']");
        await expect(page).toHaveURL("https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/teams");

        await page.locator("//span[normalize-space()='ADD TEAM']").click();
        const uniqueTeamName = `Auto Team ${Date.now()}`;
        await page.getByRole('textbox', { name: 'Name' }).fill(uniqueTeamName);

        await page.getByRole('radio', { name: 'Girls' }).check();
        await page.getByRole('spinbutton', { name: 'Birth year' }).fill('2012');
        // await page.pause();
        await page.locator('#mat-select-4 svg').click();
        await page.getByRole('listbox', { name: 'Hours' }).click();
        await page.locator('#mat-select-6').click();
        await page.getByRole('listbox', { name: 'Min' }).click();
        await page.locator('#mat-select-8 svg').click();
        await page.getByRole('listbox', { name: 'Hours' }).click();
        await page.locator('#mat-select-10 path').click();
        await page.getByRole('listbox', { name: 'Min' }).click();
        await page.locator("//span[normalize-space()='Save changes']").click();
    });

    test('5 -  Create meeting room', async ({ page }) => {
        await login(page, email, password);
        await page.click("//span[contains(text(),'Meeting rooms, etc.')]");
        await expect(page).toHaveURL("https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/objects");

        await page.locator("//span[normalize-space()='CREATE OBJECT']").click();
        await page.getByRole('menuitem', { name: 'Cafeteria' }).click();
        const uniqueCafeName = `Cafe Auto ${Date.now()}`;
        await page.getByRole('textbox', { name: 'Name' }).fill(uniqueCafeName);
        await page.getByRole('button', { name: 'Create cafeteria' }).click();
    });



    test('6 - Booking flow', async ({ page }) => {
        await login(page, email, password);

        await page.locator("//mat-icon[normalize-space()='arrow_drop_down']").click();

        //Accessing to Slaysa field
        const slysaOption = page.locator("//mat-option//div[normalize-space()='Slysa']");
        await slysaOption.waitFor({ state: 'visible' });
        await slysaOption.click();

        await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/fields');
        //Access to a field 
        await page.click("//mat-cell[normalize-space()='Slysa 2']");
        await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/club/slysa/field/slysa-2');
        const isVisible = await page.isVisible("//span[@class='title-content ng-star-inserted']");
        console.log('Is element visible:', isVisible);

        await page.locator('td:nth-child(6) > .calendar-table-cell-day-booking-wrapper').click();
        const startCell = page.locator('td:nth-child(6) > .calendar-table-cell-day-booking-wrapper');
        const endCell = page.locator('td:nth-child(6) > .calendar-table-cell-day-booking-wrapper');
        await startCell.waitFor({ state: 'visible' });
        await startCell.dragTo(endCell);

        const fieldPartHeading = page.getByRole('heading', { name: '-2' }).first();
        await expect(fieldPartHeading).toBeVisible();
        await expect(fieldPartHeading).toBeEnabled();

        //  normal click first
        try {
            await fieldPartHeading.click({ timeout: 5000 });
        } catch (e) {
            // If still not clickable in headless mode, fallback to force click
            await fieldPartHeading.click({ force: true });
        }

        await page.getByRole('textbox', { name: 'Start time' }).click();
        await page.getByRole('button', { name: '12', exact: true }).click();
        await page.getByRole('button', { name: 'Ok', exact: true }).click();
        await page.getByRole('textbox', { name: 'Finish time' }).click();
        await page.getByRole('button', { name: '6' }).click();
        await page.getByRole('button', { name: 'Ok', exact: true }).click();
        await page.getByRole('dialog', { name: 'Book field - Slysa 2' }).click();
        await page.getByRole('textbox', { name: 'Title' }).fill('Automation test');
        await page.getByRole('switch', { name: 'Match' }).click();
        await page.getByRole('button', { name: 'Book field' }).click();

    });

    test('7 - Import matches', async ({ page }) => {
        await login(page, email, password);

        await page.locator("//mat-icon[normalize-space()='arrow_drop_down']").click();

        //Accessing to Slamsa field
        // Accessing the "Slamsa" field
        const slamsaOption = page.locator("//div[@class='area-area-name ng-star-inserted'][normalize-space()='Slamsa']");

        // Wait until it's visible and enabled
        await expect(slamsaOption).toBeVisible();
        await expect(slamsaOption).toBeEnabled();

        // Click the option
        await slamsaOption.click();


        await page.locator("//a[@title='Import']").click();
        await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/import');

        await page.getByRole('textbox', { name: '+ Add a new Arena-ID' }).click();
        await page.getByRole('textbox', { name: '+ Add a new Arena-ID' }).fill('20371');
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


    test('8 -  Send new message', async ({ page }) => {
        await login(page, email, password);
        await page.click("//span[contains(text(),'Messages')]");
        await page.locator("//span[normalize-space()='NEW MESSAGE']").click();
        await page.getByRole('textbox', { name: 'Subject' }).fill('Auto Subject');
        await page.getByRole('textbox', { name: 'Message' }).fill('Automated test message');
        await page.getByRole('button', { name: 'Send' }).click();
    });

    test('9 - Register new club', async ({ browser }) => {
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
