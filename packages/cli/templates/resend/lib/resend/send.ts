import { resend } from './client';
import { WelcomeEmail } from './templates/welcome';
import { PurchaseConfirmationEmail } from './templates/purchase-confirmation';

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

/**
 * Send a welcome email to a new user
 */
export async function sendWelcomeEmail(to: string, name: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: 'Welcome! 🎉',
      react: WelcomeEmail({ name }),
    });

    if (error) {
      console.error('Failed to send welcome email:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error sending welcome email:', error);
    throw error;
  }
}

/**
 * Send a purchase confirmation email
 */
export async function sendPurchaseConfirmationEmail(
  to: string,
  name: string,
  product: string,
  amount: number
) {
  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: 'Purchase Confirmation',
      react: PurchaseConfirmationEmail({ name, product, amount }),
    });

    if (error) {
      console.error('Failed to send purchase confirmation:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error sending purchase confirmation:', error);
    throw error;
  }
}

