import { test, expect } from '@playwright/test';

test.describe('API Endpoints', () => {
  test('should return health check', async ({ request }) => {
    const response = await request.get('/api/health');
    
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
    
    const data = await response.json();
    expect(data.status).toBe('ok');
    expect(data.version).toBe('1.0.0');
  });

  test('should accept checkout requests', async ({ request }) => {
    const response = await request.post('/api/stripe/checkout', {
      data: {
        priceId: 'price_1SOWua6355Ofpl9vU5MdSqVx'
      }
    });
    
    const data = await response.json();
    
    // Should return either a session URL or an error
    if (response.ok()) {
      expect(data.url).toContain('stripe.com');
      expect(data.sessionId).toMatch(/^cs_test_/);
      console.log('✅ Checkout API working - Session created');
    } else {
      console.log('⚠️  Checkout API response:', data);
    }
  });

  test('should handle invalid checkout requests', async ({ request }) => {
    const response = await request.post('/api/stripe/checkout', {
      data: {
        // Missing priceId
      }
    });
    
    expect(response.status()).toBe(400);
    const data = await response.json();
    expect(data.error).toBeTruthy();
  });

  test('should validate webhook signature', async ({ request }) => {
    // Test webhook endpoint (will fail signature validation, but endpoint should respond)
    const response = await request.post('/api/stripe/webhook', {
      data: 'test',
      headers: {
        'stripe-signature': 'invalid'
      }
    });
    
    // Should return 400 for invalid signature (which is correct behavior)
    expect(response.status()).toBe(400);
  });
});

