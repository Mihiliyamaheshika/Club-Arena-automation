const { test, expect } = require('@playwright/test');

test('new message - user', async ({ page }) => {
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


    //navigate to messages
    await page.click("//a[@title='Messages']//span[@class='mat-mdc-list-item-unscoped-content mdc-list-item__primary-text']");
    await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/messages');
    await page.click("//span[normalize-space()='NEW MESSAGE']");

    await page.getByRole('combobox', { name: '+ Add recipients' }).click();
    await page.getByRole('combobox', { name: '+ Add recipients' }).fill('T');
    await page.getByRole('combobox', { name: '+ Add recipients' }).click();

    await page.getByRole('combobox', { name: '+ Add recipients' }).fill('M');
    await page.getByRole('combobox', { name: '+ Add recipients' }).press('CapsLock');

    await page.getByText('Maheshika MAM (maheshikamam@').click();

    await page.getByRole('textbox', { name: 'Subject' }).fill('Test 1');
    await page.getByRole('textbox', { name: 'Message' }).click();

    await page.getByRole('textbox', { name: 'Message' }).fill('This is a test message ');

    await page.getByRole('button', { name: 'Send' }).click();

});

test('new message - club', async ({ page }) => {
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


    //navigate to messages
    await page.click("//a[@title='Messages']//span[@class='mat-mdc-list-item-unscoped-content mdc-list-item__primary-text']");
    await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/messages');


    await page.click("//span[normalize-space()='NEW MESSAGE']");
    await page.locator('#mat-radio-7-input').check();
    await page.locator('#mat-radio-2-input').check();


    await page.getByRole('combobox', { name: 'Club' }).click();


    const overlay = page.locator('div.cdk-overlay-container div.cdk-overlay-pane');


    const maxScrolls = 50;
    let clicked = false;

    for (let i = 0; i < maxScrolls; i++) {

        const option = overlay.locator(`text=SLYSA`);

        if (await option.count() > 0 && await option.isVisible()) {
            // Scroll the option into view and click
            await option.evaluate(el => el.scrollIntoView({ block: 'center', behavior: 'auto' }));
            await option.click();
            clicked = true;
            break;
        }

        // Scroll overlay container a bit
        await overlay.evaluate(el => el.scrollBy(0, 50));
        await page.waitForTimeout(100); // small wait for Angular to render
    }

    if (!clicked) {
        console.warn('Warning: SLYSA option was not found or clickable after scrolling overlay');
    }

    //  await page.getByRole('checkbox', { name: 'Include team admins' }).check();
    await page.getByRole('textbox', { name: 'Subject' }).click();
    await page.getByRole('textbox', { name: 'Subject' }).fill('Test message');
    await page.getByRole('textbox', { name: 'Message' }).click();
    await page.getByRole('textbox', { name: 'Message' }).fill('Test 1 ');
    await page.getByRole('button', { name: 'Send' }).click();

});

test('new message - team', async ({ page }) => {
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


    //navigate to messages
    await page.click("//a[@title='Messages']//span[@class='mat-mdc-list-item-unscoped-content mdc-list-item__primary-text']");
    await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/messages');


    await page.click("//span[normalize-space()='NEW MESSAGE']");
    await page.getByRole('radio', { name: 'Team' }).check();
    await page.getByRole('combobox', { name: 'Team' }).click();

    await page.getByRole('combobox', { name: 'Team' }).fill('Slysa team');
    await page.getByRole('dialog', { name: 'New message' }).click();
    await page.getByLabel('New message').getByText('Subject').click();

    await page.getByRole('textbox', { name: 'Subject' }).fill('Test 3 ');
    await page.getByRole('dialog', { name: 'New message' }).click();
    await page.getByText('Message', { exact: true }).click();

    await page.getByRole('textbox', { name: 'Message' }).fill('This is a test message ');
    await page.getByRole('button', { name: 'Send' }).click();

});
