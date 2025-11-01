import { test, expect } from '@playwright/test';

test.describe('Dashboard', () => {
  test('should load dashboard page', async ({ page }) => {
    await page.goto('/dashboard');
    
    await expect(page.getByRole('heading', { name: /Dashboard/i })).toBeVisible();
    await expect(page.getByText(/Manage your API integrations/i)).toBeVisible();
  });

  test('should display license key section', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Check for license key card
    await expect(page.getByText(/Your License/i)).toBeVisible();
    await expect(page.getByText(/Use this license key/i)).toBeVisible();
    
    // Check for placeholder license key
    await expect(page.getByText(/api-lic-/i)).toBeVisible();
  });

  test('should show plan information', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Check plan details are shown
    await expect(page.getByText(/Plan/i)).toBeVisible();
    await expect(page.getByText(/Status/i)).toBeVisible();
    await expect(page.getByText(/Projects/i)).toBeVisible();
  });

  test('should display quick start guide', async ({ page }) => {
    await page.goto('/dashboard');
    
    await expect(page.getByText(/Quick Start/i)).toBeVisible();
    
    // Check for CLI commands
    const content = await page.content();
    expect(content).toContain('npx @api-integrations/cli');
  });

  test('should show available integrations list', async ({ page }) => {
    await page.goto('/dashboard');
    
    await expect(page.getByText(/Available Integrations/i)).toBeVisible();
    
    // Should list integrations
    await expect(page.getByText('Stripe')).toBeVisible();
    await expect(page.getByText('Clerk')).toBeVisible();
    await expect(page.getByText('Resend')).toBeVisible();
  });

  test('should have copy button for license key', async ({ page }) => {
    await page.goto('/dashboard');
    
    // Check for copy button
    const copyButton = page.getByRole('button', { name: /Copy/i });
    await expect(copyButton).toBeVisible();
  });
});

