# Resend Email Integration

Production-ready email sending with Resend and React Email templates.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install resend react-email @react-email/components
```

### 2. Set Up Environment Variables

```env
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=hello@yourdomain.com
```

Get your API key from [Resend Dashboard](https://resend.com/api-keys).

### 3. Verify Your Domain

1. Go to [Resend Domains](https://resend.com/domains)
2. Add your domain
3. Add the DNS records to your domain provider
4. Wait for verification

## 📁 Files Included

- `lib/resend/client.ts` - Resend client setup
- `lib/resend/send.ts` - Email sending functions
- `lib/resend/templates/welcome.tsx` - Welcome email template
- `lib/resend/templates/purchase-confirmation.tsx` - Purchase confirmation template

## 🎯 Usage Examples

### Send Welcome Email

```typescript
import { sendWelcomeEmail } from '@/lib/resend/send';

await sendWelcomeEmail('user@example.com', 'John Doe');
```

### Send Purchase Confirmation

```typescript
import { sendPurchaseConfirmationEmail } from '@/lib/resend/send';

await sendPurchaseConfirmationEmail(
  'user@example.com',
  'John Doe',
  'Pro Plan',
  4900 // Amount in cents
);
```

### Create Custom Template

```typescript
// lib/resend/templates/custom.tsx
import { Html, Button, Text } from '@react-email/components';

export function CustomEmail({ name }: { name: string }) {
  return (
    <Html>
      <Text>Hello {name}!</Text>
      <Button href="https://example.com">Click me</Button>
    </Html>
  );
}
```

### Send Custom Email

```typescript
import { resend } from '@/lib/resend/client';
import { CustomEmail } from '@/lib/resend/templates/custom';

await resend.emails.send({
  from: 'hello@yourdomain.com',
  to: 'user@example.com',
  subject: 'Custom Subject',
  react: CustomEmail({ name: 'John' }),
});
```

## 🎨 Preview Emails Locally

```bash
# Install React Email CLI
npm install -D react-email

# Add script to package.json
"email": "email dev"

# Run preview server
npm run email
```

Visit `http://localhost:3000` to preview your email templates.

## 📚 Resources

- [Resend Documentation](https://resend.com/docs)
- [React Email Documentation](https://react.email/docs)
- [Email Templates](https://react.email/examples)

## 💡 Next Steps

1. Verify your sending domain
2. Create custom email templates
3. Add email sending to your workflows
4. Set up email analytics

