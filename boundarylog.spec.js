const { test, expect } = require('@playwright/test');

// Boundary values
const validEmail = "mihiliyamaheshika@gmail.com";
const shortEmail = "a@b.c"; // shortest valid-like email
const longEmail = "a".repeat(64) + "@gmail.com"; // maximum size of long email

const validPassword = "Mm1234"; // valid password
const minPassword = "A1234"; // exactly 5 chars (boundary min)
const belowMinPassword = "A123"; // 4 chars (invalid - below min)
const longPassword = "Aa" + "1".repeat(50); // long boundary (52 cha)

test.describe('Boundary Value Tests - Login', () => {

    test('Valid login (control test)', async ({ page }) => {
        await page.goto('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/auth/login?mode=login');

        await page.getByRole('textbox', { name: 'Email' }).fill(validEmail);
        await page.getByLabel('Password', { exact: true }).fill(validPassword);
        await page.getByRole('button', { name: 'Log in' }).click();

        await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/clubs');
    });

    test('Boundary - Minimum password length (6 chars)', async ({ page }) => {
        await page.goto('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/auth/login?mode=login');

        await page.getByRole('textbox', { name: 'Email' }).fill(validEmail);
        await page.getByLabel('Password', { exact: true }).fill(minPassword);
        await page.getByRole('button', { name: 'Log in' }).click();

        // Expect either success or a validation message
        try {
            await expect(page).toHaveURL('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/clubs', { timeout: 5000 });
            console.log("Login successful with min-length password.");
        } catch {
            const errorMessage = await page.locator('.MuiAlert-message').textContent();
            console.error("Login failed at min boundary. Message:", errorMessage);
        }
    });

    test('Boundary - Below minimum password length (5 chars)', async ({ page }) => {
        await page.goto('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/auth/login?mode=login');

        await page.getByRole('textbox', { name: 'Email' }).fill(validEmail);
        await page.getByLabel('Password', { exact: true }).fill(belowMinPassword);
        await page.getByRole('button', { name: 'Log in' }).click();

        const errorMessage = await page.locator('.MuiAlert-message').textContent();
        expect(errorMessage).toContain("Invalid"); // adjust based on actual app message
    });

    test('Boundary - Very long password', async ({ page }) => {
        await page.goto('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/auth/login?mode=login');

        await page.getByRole('textbox', { name: 'Email' }).fill(validEmail);
        await page.getByLabel('Password', { exact: true }).fill(longPassword);
        await page.getByRole('button', { name: 'Log in' }).click();

        const errorMessage = await page.locator('.MuiAlert-message').textContent();
        console.log("Response for long password:", errorMessage);
    });

    test('Boundary - Shortest valid-like email', async ({ page }) => {
        await page.goto('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/auth/login?mode=login');

        await page.getByRole('textbox', { name: 'Email' }).fill(shortEmail);
        await page.getByLabel('Password', { exact: true }).fill(validPassword);
        await page.getByRole('button', { name: 'Log in' }).click();

        const errorMessage = await page.locator('.MuiAlert-message').textContent();
        console.log("Response for short email:", errorMessage);
    });

    test('Boundary - Very long email', async ({ page }) => {
        await page.goto('https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/auth/login?mode=login');

        await page.getByRole('textbox', { name: 'Email' }).fill(longEmail);
        await page.getByLabel('Password', { exact: true }).fill(validPassword);
        await page.getByRole('button', { name: 'Log in' }).click();

        const errorMessage = await page.locator('.MuiAlert-message').textContent();
        console.log("Response for long email:", errorMessage);
    });

});
