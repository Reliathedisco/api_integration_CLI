import { test, expect } from '@playwright/test';

test.describe('Integrations Page', () => {
  test('should show all available integrations', async ({ page }) => {
    await page.goto('/integrations');
    
    await expect(page.getByRole('heading', { name: /Available Integrations/i })).toBeVisible();
    
    // Check all 5 main integrations are listed
    const integrations = ['Stripe', 'Clerk', 'Resend', 'Liveblocks', 'Supabase'];
    
    for (const integration of integrations) {
      await expect(page.getByText(integration, { exact: false })).toBeVisible();
    }
  });

  test('should display integration descriptions', async ({ page }) => {
    await page.goto('/integrations');
    
    // Check for key descriptions
    await expect(page.getByText(/Payment processing with webhooks/i)).toBeVisible();
    await expect(page.getByText(/Authentication and user management/i)).toBeVisible();
    await expect(page.getByText(/Email sending with React Email/i)).toBeVisible();
  });

  test('should show install commands', async ({ page }) => {
    await page.goto('/integrations');
    
    // Check for CLI install command examples
    const pageContent = await page.content();
    expect(pageContent).toContain('npx @api-integrations/cli');
  });

  test('should have links to documentation', async ({ page }) => {
    await page.goto('/integrations');
    
    // Should have "View Documentation" buttons or links
    const docLinks = page.getByRole('button', { name: /View Documentation/i });
    const count = await docLinks.count();
    
    expect(count).toBeGreaterThan(0);
  });

  test('should show coming soon integrations', async ({ page }) => {
    await page.goto('/integrations');
    
    // Scroll to see coming soon section
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    // Should show coming soon section
    await expect(page.getByText(/Coming Soon/i)).toBeVisible();
  });
});

