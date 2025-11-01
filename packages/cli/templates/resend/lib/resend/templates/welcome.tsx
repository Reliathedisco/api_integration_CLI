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

interface WelcomeEmailProps {
  name: string;
}

export function WelcomeEmail({ name }: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to our platform!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Welcome, {name}! 🎉</Heading>
          
          <Text style={text}>
            Thank you for signing up! We're excited to have you on board.
          </Text>
          
          <Text style={text}>
            Here's what you can do next:
          </Text>
          
          <Section style={list}>
            <Text style={listItem}>✅ Complete your profile</Text>
            <Text style={listItem}>✅ Explore our features</Text>
            <Text style={listItem}>✅ Join our community</Text>
          </Section>
          
          <Section style={buttonContainer}>
            <Button style={button} href={process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}>
              Get Started
            </Button>
          </Section>
          
          <Text style={text}>
            If you have any questions, feel free to reply to this email.
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

const list = {
  margin: '20px 40px',
};

const listItem = {
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

