const { test, expect } = require('@playwright/test');
const path = require('path');

// Reusable login function
async function login(page, email, password) {
    await page.goto('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/auth/login?mode=login');
    await page.getByRole('textbox', { name: 'Email' }).fill(email);
    await page.getByRole('textbox', { name: 'Password' }).fill(password);
    await page.getByRole('button', { name: 'Log in' }).click();
    await expect(page).toHaveURL("https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/clubs");

    // Dismiss cookie banner if it appears
    const cookieAccept = page.getByRole('button', { name: 'Accept' });
    if (await cookieAccept.isVisible()) {
        await cookieAccept.click();
    }
}

test.describe.serial('Global Admin Flow', () => {
    const email = 'mihiliyamaheshika@gmail.com';
    const password = 'Mm1234';

    test('1 - Create new club', async ({ page }) => {
        await login(page, email, password);
        await page.click("//span[contains(text(),'Clubs')]");

        const createClubBtn = page.locator("//span[normalize-space()='CREATE CLUB']");
        await expect(createClubBtn).toBeVisible();
        await createClubBtn.click();

        // Upload logo
        const filePath = path.resolve('C:/Users/Mihi/Documents/Playwright Automation/Tests/logo.jpg');
        await page.setInputFiles('input[type="file"]', filePath);

        const uniqueName = `Test Club Auto ${Date.now()}`;

        await page.getByRole('textbox', { name: 'Name' }).fill(uniqueName);
        await page.getByRole('textbox', { name: 'Description' }).fill('Automated test club');
        // Click the Country combobox
        await page.getByRole('combobox', { name: 'Country' }).click();


        {
            const overlay = page.locator('div.cdk-overlay-container div.cdk-overlay-pane').last();
            const option = overlay.getByRole('option', { name: 'China', exact: true });

            let clicked = false;
            for (let i = 0; i < 50; i++) {
                if (await option.count() > 0 && await option.isVisible()) {
                    await option.scrollIntoViewIfNeeded();
                    await option.click();
                    clicked = true;
                    break;
                }
                // Scroll the overlay if the option is not visible
                await overlay.evaluate(el => el.scrollBy(0, 100));
                await page.waitForTimeout(100);
            }

            if (!clicked) {
                console.warn('Warning: Country "China" was not found or clickable after scrolling overlay');
            }
        }

        await page.getByRole('spinbutton', { name: 'Grace Period' }).click();
        await page.getByRole('spinbutton', { name: 'Grace Period' }).fill('55');

        await page.locator("//span[normalize-space()='Save club']").click();


    });

    test('2 -  Prevent duplicate club name', async ({ page }) => {
        await login(page, email, password);
        await page.click("//span[contains(text(),'Clubs')]");
        const createClubBtn = page.locator("//span[normalize-space()='CREATE CLUB']");
        await createClubBtn.click();

        const filePath = path.resolve('C:/Users/Mihi/Documents/Playwright Automation/Tests/logo.jpg');
        await page.setInputFiles('input[type="file"]', filePath);
        await page.getByRole('textbox', { name: 'Name' }).fill('Slysa');
        await page.locator("//span[normalize-space()='Save club']").click();

        const errorMessage = page.locator("text=Name must be at least 5 characters long or is already taken");
        await expect(errorMessage).toBeVisible();
    });

    test('3 - Create new field', async ({ page }) => {
        await login(page, email, password);
        await page.click("//a[@title='Fields']");
        await expect(page).toHaveURL("https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/fields");


        //await page.getByRole('button', { name: 'End tour' }).click();
        //  await page.getByLabel('End Tour?').getByRole('button', { name: 'End tour' }).click();

        await page.getByRole('button', { name: 'CREATE FIELD' }).click();
        await page.getByRole('textbox', { name: 'Name' }).fill('Auto Field 1');
        // Select Club
        await page.getByRole('combobox', { name: 'Club' }).click();

        {
            const overlay = page.locator('div.cdk-overlay-container div.cdk-overlay-pane').last();
            const option = overlay.getByRole('option', { name: 'Slysa', exact: true });

            let clicked = false;
            for (let i = 0; i < 50; i++) {
                if (await option.count() > 0 && await option.isVisible()) {
                    await option.scrollIntoViewIfNeeded();
                    await option.click();
                    clicked = true;
                    break;
                }
                await overlay.evaluate(el => el.scrollBy(0, 100));
                await page.waitForTimeout(100);
            }

            if (!clicked) {
                console.warn('Warning: Club "Slysa" was not found or clickable after scrolling overlay');
            }
        }

        await page.getByRole('combobox', { name: 'Field layout' }).locator('svg').click();
        await page.getByRole('listbox', { name: 'Field layout' }).click();
        await page.getByRole('button', { name: 'Create field' }).click();
    });

    test('4 - Allocate a field', async ({ page }) => {
        await login(page, email, password);
        await page.locator("//a[@title='Fields']").click();
        await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/fields');

        //await page.getByRole('button', { name: 'End tour' }).click();
        // await page.getByRole('button', { name: 'Don\'t show again' }).click();
        await page.getByRole('row', { name: 'Slysa 1 SLYSA' }).getByRole('button').nth(1).click();
        // await page.getByRole('button', { name: 'End tour' }).click();
        // await page.getByRole('button', { name: 'Don\'t show again' }).click();

        await page.locator('td:nth-child(6) > .calendar-table-cell-day-booking-wrapper').click();
        // await page.pause();
        await page.getByRole('heading', { name: '-2' }).first().click();
        await page.getByRole('textbox', { name: 'Start', exact: true }).click();
        await page.getByRole('textbox', { name: 'Start', exact: true }).fill('11:15');
        await page.getByRole('textbox', { name: 'End', exact: true }).click();
        await page.getByRole('textbox', { name: 'End', exact: true }).fill('16:45');
        await page.pause();
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

    test('5 - Create new team', async ({ page }) => {
        await login(page, email, password);
        await page.click("//a[@title='Teams']");
        await expect(page).toHaveURL("https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/teams");

        await page.locator("//span[normalize-space()='ADD TEAM']").click();
        await page.getByRole('textbox', { name: 'Name' }).fill('Auto Team 1');

        await page.getByRole('combobox', { name: 'Club for team', exact: true }).click();

        {
            const overlay = page.locator('div.cdk-overlay-container div.cdk-overlay-pane').last();
            const option = overlay.getByRole('option', { name: 'SLYSA', exact: true });

            let clicked = false;
            for (let i = 0; i < 50; i++) {
                if (await option.count() > 0 && await option.isVisible()) {
                    await option.scrollIntoViewIfNeeded();
                    await option.click();
                    clicked = true;
                    break;
                }
                await overlay.evaluate(el => el.scrollBy(0, 100));
                await page.waitForTimeout(100);
            }

            if (!clicked) {
                console.warn('Warning: Club "SLYSA" was not found or clickable after scrolling overlay');
            }
        }
        await page.getByRole('radio', { name: 'Girls' }).check();
        await page.getByRole('spinbutton', { name: 'Birth year' }).fill('2012');
        await page.locator("//span[normalize-space()='Save changes']").click();
    });

    test('6. Create meeting room', async ({ page }) => {
        await login(page, email, password);
        await page.click("//span[contains(text(),'Meeting rooms, etc.')]");
        await expect(page).toHaveURL("https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/objects");

        await page.locator("//span[normalize-space()='CREATE OBJECT']").click();
        await page.getByRole('menuitem', { name: 'Cafeteria' }).click();
        await page.getByRole('textbox', { name: 'Name' }).fill('Cafe Auto 1');
        // Select Club (using dropdown with scroll logic)
        await page.getByRole('combobox', { name: 'Club', exact: true }).click();

        {
            const overlay = page.locator('div.cdk-overlay-container div.cdk-overlay-pane').last();
            const option = overlay.getByRole('option', { name: 'Slysa', exact: true });

            let clicked = false;
            for (let i = 0; i < 50; i++) {
                if (await option.count() > 0 && await option.isVisible()) {
                    await option.scrollIntoViewIfNeeded();
                    await option.click();
                    clicked = true;
                    break;
                }
                await overlay.evaluate(el => el.scrollBy(0, 100));
                await page.waitForTimeout(100);
            }

            if (!clicked) {
                console.warn('Warning: Club "Slysa" was not found or clickable after scrolling overlay');
            }
        }
        await page.pause();
        await page.getByRole('button', { name: 'Create cafeteria' }).click();
    });

    test('7 - Create price package', async ({ page }) => {
        await login(page, email, password);
        await page.click("//a[@title='Price Packages']");
        await expect(page).toHaveURL("https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/price-packages");

        await page.locator("//span[normalize-space()='CREATE PRICE PACKAGE']").click();
        await page.getByRole('textbox', { name: 'Name' }).fill('Auto Package 1');
        await page.getByRole('spinbutton', { name: 'NO. Max Bookings' }).fill('10');
        await page.getByRole('textbox', { name: 'Description' }).fill('Automated package');
        await page.getByRole('spinbutton', { name: 'Price(NOK)', exact: true }).fill('500');

        await page.getByRole('spinbutton', { name: 'Price(USD/EUR)', exact: true }).fill('50');
        await page.getByLabel('Create Price Package').getByText('Ex. Booking Price(NOK)').click();
        await page.getByRole('spinbutton', { name: 'Ex. Booking Price(NOK)' }).fill('500');
        await page.getByLabel('Create Price Package').getByText('Ex. Booking Price(USD/EUR)').click();
        await page.getByRole('spinbutton', { name: 'Ex. Booking Price(USD/EUR)' }).fill('50');

        //  dynamic dates (today to 2 weeks later)
        const today = new Date();
        const twoWeeksLater = new Date();
        twoWeeksLater.setDate(today.getDate() + 14);

        function formatDateForCalendar(date) {
            const options = { month: 'long', day: 'numeric' };
            return date.toLocaleDateString('en-US', options) + ',';
        }

        const startDateStr = formatDateForCalendar(today);
        const endDateStr = formatDateForCalendar(twoWeeksLater);

        //  dynamic start date
        await page.locator('mat-form-field').filter({ hasText: 'Visibility Start Date' })
            .getByLabel('Open calendar').click();
        await page.getByRole('button', { name: startDateStr }).click();

        //dynamic end date
        await page.locator('mat-form-field').filter({ hasText: 'Visibility End Date' })
            .getByLabel('Open calendar').click();
        await page.getByRole('button', { name: endDateStr }).click();

        await page.locator("//span[normalize-space()='Save']").click();

    });

    test('8 - Booking flow', async ({ page }) => {
        await login(page, email, password);

        await page.click("//span[contains(text(),'Fields')]");
        await expect(page).toHaveURL("https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/fields");
        await page.getByRole('textbox', { name: 'Search' }).click();
        await page.getByRole('textbox', { name: 'Search by name or club' }).fill('Slysa');
        await expect(page.getByRole('row', { name: 'Slysa 1 SLYSA' })).toBeVisible();
        await page.getByRole('row', { name: 'Slysa 1 SLYSA' }).click();


        // Dynamic Date Logic
        const today = new Date();
        const targetDate = new Date(today);

        // Move forward until next Saturday
        while (targetDate.getDay() !== 6) {
            targetDate.setDate(targetDate.getDate() + 1);
        }

        const targetDay = targetDate.getDate();
        const targetMonth = targetDate.toLocaleString('default', { month: 'short' }); // Ex: "Sep"
        const targetDayName = targetDate.toLocaleString('default', { weekday: 'long' }); // Ex:"Saturday"

        const formattedDate = `${targetDayName}, ${targetMonth} ${targetDay}`;
        console.log("Booking test will use date:", formattedDate);


        await page.waitForSelector(`//div[normalize-space()='${formattedDate}']`, { state: 'visible' });

        // Click the date dynamically
        await page.locator(`//div[normalize-space()='${formattedDate}']`).click();

        await page.waitForSelector('.calendar-table-cell-day-booking-wrapper', { state: 'visible' });

        await page.locator('td:nth-child(6) > .calendar-table-cell-day-booking-wrapper').click();
        //await page.pause();

        // await page.getByRole('heading', { name: '-2' }).first().waitFor({ state: 'visible' });
        // await page.getByRole('heading', { name: '-2' }).first().click();
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
        await page.getByRole('button', { name: '11', exact: true }).click();
        await page.getByRole('button', { name: 'Ok', exact: true }).click();
        await page.getByRole('textbox', { name: 'Finish time' }).click();
        await page.getByRole('button', { name: '1', exact: true }).click();
        await page.getByRole('button', { name: 'Ok', exact: true }).click();

        await page.getByRole('textbox', { name: 'Title' }).fill('Test match 2 ');
        await page.getByRole('switch', { name: 'Match' }).click();
        await page.getByRole('button', { name: 'Book field' }).click();
    });


    test('9 -  Send new message', async ({ page }) => {
        await login(page, email, password);
        await page.click("//span[contains(text(),'Messages')]");
        await page.locator("//span[normalize-space()='NEW MESSAGE']").click();

        await page.getByRole('radio', { name: 'User' }).check();
        await page.getByRole('textbox', { name: 'Subject' }).fill('Auto Subject');
        await page.getByRole('textbox', { name: 'Message' }).fill('Automated test message');
        await page.getByRole('button', { name: 'Send' }).click();
    });

    test('10 - Register new club', async ({ browser }) => {
        const context = await browser.newContext();
        const page = await context.newPage();


        await page.goto('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/about');


        await page.getByRole('link', { name: 'Register New Club' }).click();
        await page.getByText('Name of club').click();

        await page.getByRole('textbox', { name: 'Name of club' }).fill('Club test');
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

