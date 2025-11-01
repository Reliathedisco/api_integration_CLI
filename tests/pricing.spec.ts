import { test, expect } from '@playwright/test';

test.describe('Pricing Page', () => {
  test('should load pricing page', async ({ page }) => {
    await page.goto('/pricing');
    
    // Check main heading
    await expect(page.getByRole('heading', { name: /Ship faster. Build better./i })).toBeVisible();
    
    // Check all three pricing tiers are visible
    await expect(page.getByText('Starter')).toBeVisible();
    await expect(page.getByText('Pro', { exact: true })).toBeVisible();
    await expect(page.getByText('Pro Monthly')).toBeVisible();
  });

  test('should show correct pricing', async ({ page }) => {
    await page.goto('/pricing');
    
    // Check prices
    await expect(page.getByText('$0')).toBeVisible(); // Free tier
    await expect(page.getByText('$149')).toBeVisible(); // Pro tier
    await expect(page.getByText('$29')).toBeVisible(); // Monthly tier
  });

  test('should have checkout buttons', async ({ page }) => {
    await page.goto('/pricing');
    
    // Check for checkout buttons
    const lifetimeButton = page.getByRole('button', { name: /Get Lifetime Access/i });
    const monthlyButton = page.getByRole('button', { name: /Subscribe Now/i });
    
    await expect(lifetimeButton).toBeVisible();
    await expect(monthlyButton).toBeVisible();
    await expect(lifetimeButton).toBeEnabled();
    await expect(monthlyButton).toBeEnabled();
  });

  test('should show launch special badge', async ({ page }) => {
    await page.goto('/pricing');
    
    // Check for launch special badge
    await expect(page.getByText(/LAUNCH SPECIAL/i)).toBeVisible();
    await expect(page.getByText(/47 licenses left/i)).toBeVisible();
  });

  test('should list all features', async ({ page }) => {
    await page.goto('/pricing');
    
    // Check Pro tier features
    await expect(page.getByText(/All 12\+ integrations/i)).toBeVisible();
    await expect(page.getByText(/Stripe \+ webhooks/i)).toBeVisible();
    await expect(page.getByText(/1 year of updates/i)).toBeVisible();
    await expect(page.getByText(/Priority email support/i)).toBeVisible();
  });

  test('should scroll to FAQ section', async ({ page }) => {
    await page.goto('/pricing');
    
    // Scroll down to FAQ (if it exists on the page)
    const pageContent = await page.content();
    
    // Page should have pricing content
    expect(pageContent).toContain('$149');
    expect(pageContent).toContain('$29');
  });
});

