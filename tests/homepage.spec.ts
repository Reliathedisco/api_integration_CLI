import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load successfully', async ({ page }) => {
    await page.goto('/');
    
    // Check title
    await expect(page).toHaveTitle(/API Integrations/);
    
    // Check hero heading
    await expect(page.getByRole('heading', { name: /API Integrations in 5 Minutes/i })).toBeVisible();
    
    // Check CTA buttons
    await expect(page.getByRole('link', { name: /Get Started/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /View Documentation/i })).toBeVisible();
  });

  test('should have working navigation', async ({ page }) => {
    await page.goto('/');
    
    // Check all navigation links are present
    await expect(page.getByRole('link', { name: 'Integrations' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Documentation' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Pricing' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Dashboard' })).toBeVisible();
  });

  test('should navigate to pricing page', async ({ page }) => {
    await page.goto('/');
    
    // Click the "Get Started" button
    await page.getByRole('link', { name: /Get Started/i }).first().click();
    
    // Should be on pricing page
    await expect(page).toHaveURL(/.*pricing/);
    await expect(page.getByRole('heading', { name: /Ship faster/i })).toBeVisible();
  });

  test('should show all integration logos', async ({ page }) => {
    await page.goto('/');
    
    // Scroll to integrations section
    await page.getByRole('heading', { name: /Available Integrations/i }).scrollIntoViewIfNeeded();
    
    // Check integration cards are visible
    await expect(page.getByText('Stripe')).toBeVisible();
    await expect(page.getByText('Clerk')).toBeVisible();
    await expect(page.getByText('Resend')).toBeVisible();
    await expect(page.getByText('Liveblocks')).toBeVisible();
    await expect(page.getByText('Supabase')).toBeVisible();
  });

  test('should have responsive design', async ({ page, viewport }) => {
    await page.goto('/');
    
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.getByRole('heading', { name: /API Integrations in 5 Minutes/i })).toBeVisible();
    
    // Test desktop viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.getByRole('heading', { name: /API Integrations in 5 Minutes/i })).toBeVisible();
  });
});

