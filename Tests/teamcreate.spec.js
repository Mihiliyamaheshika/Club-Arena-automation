
const { test, expect } = require('@playwright/test');

// Helper to dismiss cookie banner
async function dismissCookiesIfVisible(page) {
    const cookieAccept = page.getByRole('button', { name: 'Accept' });
    if (await cookieAccept.isVisible()) {
        await cookieAccept.click();
    }
}

test('create new team', async ({ page }) => {
    await page.goto('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/auth/login?mode=login');

    await page.getByRole('textbox', { name: 'Email' }).fill('mihiliyamaheshika@gmail.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('Mm1234');
    await page.getByRole('button', { name: 'Log in' }).click();

    await dismissCookiesIfVisible(page);

    // Accept cookie banner if visible
    const cookieAccept = page.getByRole('button', { name: 'Accept' });
    if (await cookieAccept.isVisible()) {
        await cookieAccept.click();
    }

    await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/clubs');

    //navigate to teams
    await page.click("//a[@title='Teams']//span[@class='mat-mdc-list-item-unscoped-content mdc-list-item__primary-text']");
    await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/teams');


    // Wait for the CREATE CLUB button to be clickable
    const createTeamBtn = page.locator("//span[normalize-space()='ADD TEAM']");
    await expect(createTeamBtn).toBeVisible();
    await createTeamBtn.click();

    // await page.pause();

    await page.goto('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/teams/create');

    await dismissCookiesIfVisible(page);
    await page.getByRole('textbox', { name: 'Name' }).click();
    await page.getByRole('textbox', { name: 'Name' }).fill('Test team 2');
    await page.getByRole('combobox', { name: 'Club', exact: true }).locator('path').click();
    await page.getByRole('option', { name: 'SLYSA' }).click();
    await page.getByRole('radio', { name: 'Girls' }).check();
    await page.getByText('Birth year').click();
    await page.getByRole('spinbutton', { name: 'Birth year' }).fill('2012');
    await page.getByText('Club for team').click();
    await page.getByRole('combobox', { name: 'Club for team' }).fill('Slysa');
    //await page.pause();

    await page.locator('#mat-select-6 svg').click();
    await page.getByRole('option', { name: '02' }).click();
    await page.locator('#mat-select-8 svg').click();
    await page.getByText('30').click();
    await page.getByRole('combobox', { name: 'Hours', exact: true }).locator('svg').click();
    await page.getByRole('option', { name: '03' }).click();
    await page.getByRole('combobox', { name: 'Min', exact: true }).locator('svg').click();
    await page.getByRole('option', { name: '45' }).click();


    const SaveChangesBtn = page.locator("//span[normalize-space()='Save changes']");
    await expect(SaveChangesBtn).toBeVisible();
    await SaveChangesBtn.click();
});
