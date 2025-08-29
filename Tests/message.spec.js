
const { test, expect } = require('@playwright/test');

//Reply for a message
test('Message', async ({ page }) => {

    await page.goto('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/auth/login?mode=login');
    await page.getByRole('textbox', { name: 'Email' }).fill('mihiliyamaheshika@gmail.com');
    await page.getByText('Password', { exact: true }).fill('Mm1234');
    await page.waitForSelector('button', { timeout: 5000 })
    await page.getByRole('button', { name: 'Log in' }).click();

    await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/clubs');

    await page.locator('//span[contains(text(), "Messages")]').click();

    await page.getByText('/26/2025 18:42').click();
    await page.getByRole('cell', { name: '08/26/2025 18:42 Club B Club' }).locator('mat-label').click();
    await page.getByRole('textbox', { name: 'Reply' }).fill('This is a reply message');
    await page.getByRole('button', { name: 'Reply' }).click();
});


//Message filtering 
test.only('Message filters', async ({ page }) => {

    await page.goto('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/auth/login?mode=login');
    await page.getByRole('textbox', { name: 'Email' }).fill('mihiliyamaheshika@gmail.com');
    await page.getByText('Password', { exact: true }).fill('Mm1234');
    await page.waitForSelector('button', { timeout: 5000 })
    await page.getByRole('button', { name: 'Log in' }).click();

    await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/clubs');

    await page.locator('//span[contains(text(), "Messages")]').click();
    await page.getByRole('button').filter({ hasText: 'filter_listali' }).click();
    await page.getByRole('combobox', { name: 'Sent as' }).locator('svg').click();
    await page.getByRole('listbox', { name: 'Sent as' }).click();
    await page.getByRole('combobox', { name: 'By Team', exact: true }).fill('Slysa');
    await page.getByRole('switch', { name: 'Show unread messages only' }).click();
    await page.locator("//span[normalize-space()='Apply']").click();


});


//New message 
test.only('New Message', async ({ page }) => {
    // 1. Log in
    await page.goto('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/auth/login?mode=login');
    await page.getByRole('textbox', { name: 'Email' }).fill('mihiliyamaheshika@gmail.com');
    await page.getByText('Password', { exact: true }).fill('Mm1234');
    await page.waitForSelector('button', { timeout: 5000 });
    await page.getByRole('button', { name: 'Log in' }).click();

    await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/clubs');

    // 2. Go to Messages
    await page.locator('//span[contains(text(), "Messages")]').click();

    // 3. Click "NEW MESSAGE"
    await page.locator("//span[normalize-space()='NEW MESSAGE']").click();


    // 4. Select the radio button: Club
    await page.getByRole('radio', { name: 'User' }).check();
    await page.getByRole('textbox', { name: 'Subject' }).fill('Text Subject');
    await page.getByRole('textbox', { name: 'Message' }).click();
    await page.getByRole('textbox', { name: 'Message' }).fill('Text ');
    await page.getByRole('button', { name: 'Send' }).click();

});


