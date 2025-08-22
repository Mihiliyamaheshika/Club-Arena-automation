const { test, expect } = require('@playwright/test');

test('Add user with Team manager role', async ({ browser }) => {
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

   // await page.locator("//*[name()='path' and contains(@d,'M12 2C17.5')]").click();


    // Navigate to Users page
    await page.locator("//a[@title='Users']//span[contains(text(),'Users')]").click();
    await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/users');

    // Handle cookie banner
    const cookieBanner = page.locator('.cookies-eu-banner');
    if (await cookieBanner.isVisible()) {
        const acceptBtn = cookieBanner.locator('text=Accept');
        if (await acceptBtn.isVisible()) {
            await acceptBtn.click();
            await page.waitForTimeout(500);
        } else {
            await page.evaluate(() => {
                const banner = document.querySelector('.cookies-eu-banner');
                if (banner) banner.style.display = 'none';
            });
        }
    }

    // Remove transparent backdrop if blocking
    await page.evaluate(() => {
        const backdrop = document.querySelector('.cdk-overlay-backdrop');
        if (backdrop) backdrop.style.display = 'none';
    });

    // Click add icon to open add user modal
    await page.locator("//mat-icon[normalize-space()='add']").click();

    // Fill email field
    await page.getByRole('textbox', { name: 'Email' }).fill('maheshikamam.21@uom.lk');

    // Check Global Admin
    // await page.getByRole('checkbox', { name: 'Global admin' }).check();

    // Click Add new role
    await page.getByRole('button', { name: 'Add new role' }).click();

    // Open role dropdown
    const roleDropdown = page.getByRole('combobox', { name: 'Choose role' }).locator('svg');
    await expect(roleDropdown).toBeVisible();
    await roleDropdown.click();

    // Wait for and select "Team manager"
    await page.waitForSelector('text=Team manager', { state: 'visible' });
    await page.getByText('Team manager').click();


});
