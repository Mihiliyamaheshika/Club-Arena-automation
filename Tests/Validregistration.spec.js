const { test, expect } = require('@playwright/test');

test('Validation of registration', async ({ page }) => {
    await page.goto('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/about');
    await page.locator("//a[@class='button button_orange']").click();

    await page.getByText('First name').click();
    await page.getByRole('textbox', { name: 'First name' }).fill('Dianne');
    await page.getByText('Last name').click();
    await page.getByRole('textbox', { name: 'Last name' }).fill('Keizel');
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('diannegmail.com');
    await page.getByText('Phone number').click();
    await page.getByRole('textbox', { name: 'Phone number' }).fill('0785434233');
    await page.getByText('Password', { exact: true }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill('1234');
    await page.locator("//button[@type='submit']//span[@class='mat-mdc-button-touch-target']").click();

    // Wait for the error message to appear
    const emailError = await page.locator("text=Not a valid email address");
    await expect(emailError).toBeVisible();

    // Wait for the error message to appear
    const passwordError = await page.locator("text=Password must be at least 5 characters long");
    await expect(passwordError).toBeVisible();

    //Empty field for first name 
    // const firstNameField = page.locator('mat-form-field', { hasText: 'First name' });
    // await expect(firstNameField).toHaveClass(/mat-form-field-invalid/);


});
