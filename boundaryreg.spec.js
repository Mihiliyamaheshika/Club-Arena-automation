const { test, expect } = require('@playwright/test');

// Boundary values
const validFirstName = "Dianne";
const shortFirstName = "A"; // 1 char (minimum boundary)
const longFirstName = "A".repeat(51); // very long name (boundary test)

const validLastName = "Keizel";
const shortLastName = "B"; // 1 char
const longLastName = "B".repeat(51); // very long name

const validEmail = "dianne@gmail.com";
const shortEmail = "a@b.c"; // shortest valid-like
const invalidEmail = "diannegmail.com"; // missing '@'
const longEmail = "a".repeat(64) + "@gmail.com"; // long boundary

const validPhone = "0785434233"; // 10 digits (valid in many regions)
const shortPhone = "123"; // too short
const longPhone = "12345678901234567890"; // too long

const validPassword = "Mm1234"; // 6 chars (valid min boundary)
const shortPassword = "1234"; // too short (invalid)
const longPassword = "A1".repeat(30); // very long (60 chars)

test.describe("Boundary Value Tests - Registration", () => {

  test("Valid registration (control test)", async ({ page }) => {
    await page.goto("https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/about");
    await page.locator("//a[@class='button button_orange']").click();

    await page.getByRole("textbox", { name: "First name" }).fill(validFirstName);
    await page.getByRole("textbox", { name: "Last name" }).fill(validLastName);
    await page.getByRole("textbox", { name: "Email" }).fill(validEmail);
    await page.getByRole("textbox", { name: "Phone number" }).fill(validPhone);
    await page.getByRole("textbox", { name: "Password" }).fill(validPassword);
    await page.locator("//button[@type='submit']").click();

    // Expect either successful registration or redirect to login/fields
    await expect(page).toHaveURL(/auth|login|fields/);
  });

  test("Boundary - Short first name (1 char)", async ({ page }) => {
    await page.goto("https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/about");
    await page.locator("//a[@class='button button_orange']").click();

    await page.getByRole("textbox", { name: "First name" }).fill(shortFirstName);
    await page.getByRole("textbox", { name: "Last name" }).fill(validLastName);
    await page.getByRole("textbox", { name: "Email" }).fill(validEmail);
    await page.getByRole("textbox", { name: "Phone number" }).fill(validPhone);
    await page.getByRole("textbox", { name: "Password" }).fill(validPassword);
    await page.locator("//button[@type='submit']").click();

    const firstNameError = await page.locator("text=First name is too short");
    await expect(firstNameError).toBeVisible();
  });

  test("Boundary - Invalid email format", async ({ page }) => {
    await page.goto("https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/about");
    await page.locator("//a[@class='button button_orange']").click();

    await page.getByRole("textbox", { name: "First name" }).fill(validFirstName);
    await page.getByRole("textbox", { name: "Last name" }).fill(validLastName);
    await page.getByRole("textbox", { name: "Email" }).fill(invalidEmail);
    await page.getByRole("textbox", { name: "Phone number" }).fill(validPhone);
    await page.getByRole("textbox", { name: "Password" }).fill(validPassword);
    await page.locator("//button[@type='submit']").click();

    const emailError = await page.locator("text=Not a valid email address");
    await expect(emailError).toBeVisible();
  });

  test("Boundary - Password too short", async ({ page }) => {
    await page.goto("https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/about");
    await page.locator("//a[@class='button button_orange']").click();

    await page.getByRole("textbox", { name: "First name" }).fill(validFirstName);
    await page.getByRole("textbox", { name: "Last name" }).fill(validLastName);
    await page.getByRole("textbox", { name: "Email" }).fill(validEmail);
    await page.getByRole("textbox", { name: "Phone number" }).fill(validPhone);
    await page.getByRole("textbox", { name: "Password" }).fill(shortPassword);
    await page.locator("//button[@type='submit']").click();

    const passwordError = await page.locator("text=Password must be at least 5 characters long");
    await expect(passwordError).toBeVisible();
  });

  test("Boundary - Very long password", async ({ page }) => {
    await page.goto("https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/about");
    await page.locator("//a[@class='button button_orange']").click();

    await page.getByRole("textbox", { name: "First name" }).fill(validFirstName);
    await page.getByRole("textbox", { name: "Last name" }).fill(validLastName);
    await page.getByRole("textbox", { name: "Email" }).fill(validEmail);
    await page.getByRole("textbox", { name: "Phone number" }).fill(validPhone);
    await page.getByRole("textbox", { name: "Password" }).fill(longPassword);
    await page.locator("//button[@type='submit']").click();

    const passwordError = await page.locator("text=Password too long");
    console.log(await passwordError.textContent());
  });

  test("Boundary - Very long email", async ({ page }) => {
    await page.goto("https://club-arena-test2-bhancvd6ghf9dwd7.westeurope-01.azurewebsites.net/about");
    await page.locator("//a[@class='button button_orange']").click();

    await page.getByRole("textbox", { name: "First name" }).fill(validFirstName);
    await page.getByRole("textbox", { name: "Last name" }).fill(validLastName);
    await page.getByRole("textbox", { name: "Email" }).fill(longEmail);
    await page.getByRole("textbox", { name: "Phone number" }).fill(validPhone);
    await page.getByRole("textbox", { name: "Password" }).fill(validPassword);
    await page.locator("//button[@type='submit']").click();

    const emailError = await page.locator("text=Email too long");
    console.log(await emailError.textContent());
  });

});
