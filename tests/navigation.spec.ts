import { test, expect } from '@playwright/test';

test.describe('Site Navigation', () => {
  test('should navigate through all main pages', async ({ page }) => {
    // Start at homepage
    await page.goto('/');
    await expect(page).toHaveTitle(/API Integrations/);
    
    // Navigate to Integrations
    await page.getByRole('link', { name: 'Integrations' }).click();
    await expect(page).toHaveURL(/.*integrations/);
    await expect(page.getByRole('heading', { name: /Available Integrations/i })).toBeVisible();
    
    // Navigate to Documentation
    await page.getByRole('link', { name: 'Documentation' }).click();
    await expect(page).toHaveURL(/.*docs/);
    await expect(page.getByRole('heading', { name: /Documentation/i })).toBeVisible();
    
    // Navigate to Pricing
    await page.getByRole('link', { name: 'Pricing' }).click();
    await expect(page).toHaveURL(/.*pricing/);
    await expect(page.getByRole('heading', { name: /Ship faster/i })).toBeVisible();
    
    // Navigate to Dashboard
    await page.getByRole('link', { name: 'Dashboard' }).click();
    await expect(page).toHaveURL(/.*dashboard/);
    await expect(page.getByRole('heading', { name: /Dashboard/i })).toBeVisible();
  });

  test('should have working footer links', async ({ page }) => {
    await page.goto('/');
    
    // Scroll to footer
    await page.getByRole('contentinfo').scrollIntoViewIfNeeded();
    
    // Check footer sections exist
    await expect(page.getByText('Product')).toBeVisible();
    await expect(page.getByText('Resources')).toBeVisible();
    await expect(page.getByText('Company')).toBeVisible();
    await expect(page.getByText('Legal')).toBeVisible();
  });

  test('should show copyright year', async ({ page }) => {
    await page.goto('/');
    
    const currentYear = new Date().getFullYear();
    await expect(page.getByText(new RegExp(`© ${currentYear}`))).toBeVisible();
  });
});

