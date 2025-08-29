const path = require('path');
const { test, expect } = require('@playwright/test');

test('File upload should accept only Excel files', async ({ page }) => {
    await page.goto('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/auth/login?mode=login');

    const email = 'mihiliyamaheshika@gmail.com';
    const password = 'Mm1234';

    await page.getByRole('textbox', { name: 'Email' }).fill(email);
    await page.getByLabel('Password', { exact: true }).fill(password);
    await page.getByRole('button', { name: 'Log in' }).click();
    await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/fields', { timeout: 10000 });

    console.log('Login successful.');

    await page.goto('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/upload-team-leads');

    const uploadIcon = page.locator("//mat-icon[normalize-space()='cloud_upload']");
    await expect(uploadIcon).toBeVisible({ timeout: 10000 });
    await uploadIcon.click();

    //upload a valid file 
    //  const filePath = path.resolve('C:/Users/Mihi/Documents/Playwright Automation/Tests/TeamUpload (4) (4).xlsx');
    //  const fileInput = page.locator('input[type="file"]');
    //  await fileInput.setInputFiles(filePath);


    // Upload an invalid file (PDF)
    const invalidFile = path.resolve('C:/Users/Mihi/Documents/Playwright Automation/Tests/6.pdf');
    await page.locator('input[type="file"]').setInputFiles(invalidFile);

    // Wait for the expected error message to appear (updated to a partial match)
    const errorMessage = page.locator('text=The selected file type is not allowed');
    await expect(errorMessage).toBeVisible({ timeout: 5000 });

    console.log('Invalid file test passed.');
});
