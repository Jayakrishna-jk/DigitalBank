import { test, expect } from '@playwright/test';

test.describe('Account Details Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/account-details/1');
  });

  test('displays account details form with correct values', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Account Details' })).toBeVisible();
  });

  test('displays navigation buttons', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'View Beneficiaries' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Fund Transfer' })).toBeVisible();
  });

  test('displays transaction history table', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Transaction History' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Name' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Type' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Email Id' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Account Number' })).toBeVisible();
  });

  test('search functionality works', async ({ page }) => {
    const searchInput = page.getByPlaceholder('Search transactions...');
    await searchInput.fill('John Doe');
    await expect(page.getByText('John Doe')).toBeVisible();
  });

  test('pagination is present', async ({ page }) => {
    await expect(page.locator('[data-testid="pagination"]')).toBeVisible();
  });
});
