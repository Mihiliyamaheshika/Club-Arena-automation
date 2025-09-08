const { test, expect } = require('@playwright/test');

test('new message - required field validations', async ({ page }) => {
    await page.goto('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/about');
    await page.locator("//a[normalize-space()='Log in']").click();

    const email = 'mihiliyamaheshika@gmail.com';
    const password = 'Mm1234';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new Error(`Invalid email format: ${email}`);
    }

    await page.getByRole('textbox', { name: 'Email' }).fill(email);
    await page.getByLabel('Password', { exact: true }).fill(password);
    await page.waitForSelector('button', { timeout: 5000 });
    await page.getByRole('button', { name: 'Log in' }).click();

    await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/fields');


    await page.click("//a[@title='Messages']//span[@class='mat-mdc-list-item-unscoped-content mdc-list-item__primary-text']");
    await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/messages');
    await page.click("//span[normalize-space()='NEW MESSAGE']");


    await page.getByRole('combobox', { name: '+ Add recipients' }).click();
    await page.getByRole('combobox', { name: '+ Add recipients' }).fill('M');
    await page.getByText('Maheshika MAM (maheshikamam@').click();


    await page.getByRole('button', { name: 'Send' }).click();


    await expect(page.getByRole('textbox', { name: 'Subject' })).toHaveClass(/ng-invalid|mdc-text-field--invalid/);

    //message to emplty field in message 
    const messageError = page.locator("//mat-error[contains(text(),'Message') or contains(text(),' Name must be at least 3 characters long or is already taken')]");
    await expect(messageError).toBeVisible();


    await page.getByRole('textbox', { name: 'Subject' }).fill('Test subject only');
    await page.getByRole('button', { name: 'Send' }).click();
    await expect(messageError).toBeVisible();

    //Add message but leave subject empty
    await page.getByRole('textbox', { name: 'Subject' }).fill('');
    await page.getByRole('textbox', { name: 'Message' }).fill('Test message only');
    await page.getByRole('button', { name: 'Send' }).click();

    // Subject is empty should be marked invalid
    const subjectField = page.getByRole('textbox', { name: 'Subject' });

    //Angular Material invalid class
    await expect(subjectField).toHaveClass(/ng-invalid/);


    // Fill both subject & message properly and send
    await page.getByRole('textbox', { name: 'Subject' }).fill('Final Test Subject');
    await page.getByRole('textbox', { name: 'Message' }).fill('This is a test message');
    await page.getByRole('button', { name: 'Send' }).click();


});
