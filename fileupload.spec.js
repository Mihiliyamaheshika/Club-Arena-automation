// const { test, expect } = require('@playwright/test');
// const path = require('path');

// test('Demo login test 2 - with email and password validation', async ({ page }) => {

//     await page.goto('https://coach-arena-test.azurewebsites.net/auth/login?mode=login');

//     const email = 'mihiliyamaheshika@gmail.com';
//     const password = 'Mm1234';

//     //Email format validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//         throw new Error(`Invalid email format: ${email}`);
//     }

//     await page.getByRole('textbox', { name: 'Email' }).fill(email);
//     await page.getByLabel('Password', { exact: true }).fill(password);
//     await page.getByRole('button', { name: 'Log in' }).click();

//     //Wait for either successful login or error message
//     try {

//         await expect(page).toHaveURL('https://coach-arena-test.azurewebsites.net/fields', { timeout: 5000 });
//         console.log('Login successful. Password is correct.');
//     } catch (error) {

//         const errorMessage = await page.locator('.MuiAlert-message').textContent();
//         console.error('Login failed. Possible invalid password. Message:', errorMessage);
//         throw new Error('Login failed: Invalid password or credentials');
//     }
// });




// test('verify file upload', async ({ page }) => {
//   await page.goto('https://coach-arena-test.azurewebsites.net/upload-team-leads');

//   //Define the correct file path
//   const filePath = path.resolve('C:/Users/Mihi/Documents/Playwright Automation/Tests/TeamUpload (4) (4).xlsx');

//   // Optional: Click the cloud_upload icon (if needed to trigger input)
//   await page.locator("//mat-icon[@class='mat-icon notranslate material-icons mat-ligature-font mat-icon-no-color'][normalize-space()='cloud_upload']").click();

//   // Use the actual <input type="file"> element
//   const fileInput = page.locator('input[type="file"]');
//   await fileInput.setInputFiles(filePath);

//   // Optional: Submit or check for upload success message
// });

const { test, expect } = require('@playwright/test');
const path = require('path');

test('Full flow: login and upload file', async ({ page }) => {

    await page.goto('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/auth/login?mode=login');

    const email = 'mihiliyamaheshika@gmail.com';
    const password = 'Mm1234';

    //Email format 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new Error(`Invalid email format: ${email}`);
    }

    await page.getByRole('textbox', { name: 'Email' }).fill(email);
    await page.getByLabel('Password', { exact: true }).fill(password);
    await page.getByRole('button', { name: 'Log in' }).click();

    await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/fields', { timeout: 10000 });
    console.log('Login successful.');

   
    await page.goto('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/upload-team-leads');


    const uploadIcon = page.locator("//mat-icon[normalize-space()='cloud_upload']");
    await expect(uploadIcon).toBeVisible({ timeout: 10000 });
    await uploadIcon.click();

    
    const filePath = path.resolve('C:/Users/Mihi/Documents/Playwright Automation/Tests/TeamUpload (4) (4).xlsx');
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(filePath);

    
     //await expect(page.getByText('Upload successful')).toBeVisible();
});
