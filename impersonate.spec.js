const { test, expect } = require('@playwright/test');

test('Impersonate user', async ({ page }) => {

    await page.goto('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/auth/login?mode=login');
    await page.getByRole('textbox', { name: 'Email' }).fill('mihiliyamaheshika@gmail.com');
    await page.getByLabel('Password').fill('Mm1234');
    await page.getByRole('button', { name: 'Log in' }).click();
    await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/clubs');

    await page.getByRole('button', { name: 'Impersonate user' }).click();


    // await page.getByRole('switch', { name: 'Select role' }).click();
    // await page.getByRole('combobox', { name: 'Role' }).click();
    // await page.getByRole('listbox', { name: 'Role' }).click();


    // await page.getByRole('combobox', { name: 'Field', exact: true }).click();


    // const overlay = page.locator('div.cdk-overlay-container div.cdk-overlay-pane');
    // const maxScrolls = 50;
    // let clicked = false;

    // for (let i = 0; i < maxScrolls; i++) {
    //     const option = overlay.locator(`text=Slysa-field`);
    //     if (await option.count() > 0 && await option.isVisible()) {
    //         await option.evaluate(el => el.scrollIntoView({ block: 'center', behavior: 'auto' }));
    //         await option.click();
    //         clicked = true;
    //         break;
    //     }
    //     await overlay.evaluate(el => el.scrollBy(0, 50));
    //     await page.waitForTimeout(100);
    // }

    // if (!clicked) {
    //     console.warn('Warning: Slysa-field option was not found or clickable after scrolling overlay');
    // }

    // // Confirm role selection
    // await page.getByRole('button', { name: 'Select role' }).click();



    //access to club admin 
 
    // await page.getByRole('switch', { name: 'Select role' }).click();

    // await page.getByRole('combobox', { name: 'Role' }).click();


    // {
    //     const overlay = page.locator('div.cdk-overlay-container div.cdk-overlay-pane');
    //     const maxScrolls = 50;
    //     let clicked = false;

    //     for (let i = 0; i < maxScrolls; i++) {
    //         const option = overlay.locator(`text=Club admin`);
    //         if (await option.count() > 0 && await option.isVisible()) {
    //             await option.evaluate(el => el.scrollIntoView({ block: 'center', behavior: 'auto' }));
    //             await option.click();
    //             clicked = true;
    //             break;
    //         }
    //         await overlay.evaluate(el => el.scrollBy(0, 50));
    //         await page.waitForTimeout(100);
    //     }

    //     if (!clicked) {
    //         console.warn('Warning: Club admin option was not found or clickable after scrolling overlay');
    //     }
    // }

    
    // await page.getByRole('combobox', { name: 'Club', exact: true }).click();

   
    // {
    //     const overlay = page.locator('div.cdk-overlay-container div.cdk-overlay-pane');
    //     const maxScrolls = 50;
    //     let clicked = false;

    //     for (let i = 0; i < maxScrolls; i++) {
    //         const option = overlay.locator(`text=SLYSA`);
    //         if (await option.count() > 0 && await option.isVisible()) {
    //             await option.evaluate(el => el.scrollIntoView({ block: 'center', behavior: 'auto' }));
    //             await option.click();
    //             clicked = true;
    //             break;
    //         }
    //         await overlay.evaluate(el => el.scrollBy(0, 50));
    //         await page.waitForTimeout(100);
    //     }

    //     if (!clicked) {
    //         console.warn('Warning: SLYSA option was not found or clickable after scrolling overlay');
    //     }
    // }


    // await page.getByRole('button', { name: 'Select role' }).click();




    //access to team manager
    // await page.getByRole('switch', { name: 'Select role' }).click();
    // await page.getByRole('combobox', { name: 'Role' }).click();
    // await page.getByText('Team manager').click();
    // await page.getByText('Team', { exact: true }).click();
    // await page.getByRole('combobox', { name: 'Team', exact: true }).fill('SLYSA');
    // await page.getByText('SLYSA - team').click();
    // await page.getByRole('button', { name: 'Select role' }).click();


    //Access via user name 
    await page.getByText('User', { exact: true }).click();
    await page.getByRole('combobox', { name: 'User' }).fill('Mihi');
    await page.getByRole('option', { name: 'Mihiliya Maheshika' }).locator('span').click();
    await page.getByRole('button', { name: 'Select user' }).click();
    await page.getByRole('button', { name: 'Back to global admin' }).click();


});
