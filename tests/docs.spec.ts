import { test, expect } from '@playwright/test';

test.describe('Documentation', () => {
  test('should load documentation page', async ({ page }) => {
    await page.goto('/docs');
    
    await expect(page.getByRole('heading', { name: /Documentation/i })).toBeVisible();
  });

  test('should show getting started guide', async ({ page }) => {
    await page.goto('/docs');
    
    await expect(page.getByText(/Getting Started/i)).toBeVisible();
  });

  test('should show CLI reference', async ({ page }) => {
    await page.goto('/docs');
    
    await expect(page.getByText(/CLI Reference/i)).toBeVisible();
  });

  test('should list all integration guides', async ({ page }) => {
    await page.goto('/docs');
    
    // Check for integration documentation links
    await expect(page.getByText(/Integrations/i)).toBeVisible();
  });

  test('should have troubleshooting section', async ({ page }) => {
    await page.goto('/docs');
    
    await expect(page.getByText(/Troubleshooting/i)).toBeVisible();
  });
});

