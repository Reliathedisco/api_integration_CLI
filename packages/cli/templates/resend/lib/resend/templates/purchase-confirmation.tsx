import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface PurchaseConfirmationEmailProps {
  name: string;
  product: string;
  amount: number;
}

export function PurchaseConfirmationEmail({
  name,
  product,
  amount,
}: PurchaseConfirmationEmailProps) {
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount / 100);

  return (
    <Html>
      <Head />
      <Preview>Thank you for your purchase!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Thank You, {name}! ✨</Heading>
          
          <Text style={text}>
            Your purchase was successful. Here are the details:
          </Text>
          
          <Section style={detailsBox}>
            <Text style={detailItem}>
              <strong>Product:</strong> {product}
            </Text>
            <Text style={detailItem}>
              <strong>Amount:</strong> {formattedAmount}
            </Text>
          </Section>
          
          <Text style={text}>
            You now have full access to all features. Get started by visiting your dashboard:
          </Text>
          
          <Section style={buttonContainer}>
            <Button 
              style={button} 
              href={`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/dashboard`}
            >
              Go to Dashboard
            </Button>
          </Section>
          
          <Text style={text}>
            If you have any questions or need assistance, please don't hesitate to reach out.
          </Text>
          
          <Text style={footer}>
            Best regards,<br />
            The Team
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
};

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0',
  textAlign: 'center' as const,
};

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
  textAlign: 'left' as const,
  margin: '20px 40px',
};

const detailsBox = {
  backgroundColor: '#f9f9f9',
  borderRadius: '8px',
  padding: '20px',
  margin: '20px 40px',
};

const detailItem = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '10px 0',
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '30px 0',
};

const button = {
  backgroundColor: '#000',
  borderRadius: '5px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 30px',
};

const footer = {
  color: '#666',
  fontSize: '14px',
  lineHeight: '24px',
  textAlign: 'left' as const,
  margin: '40px 40px 20px',
};

