#!/bin/bash
# Product Hunt Demo Script for API Integration Boilerplate Tool
# This script demonstrates the CLI in action with realistic timing

# Colors for better output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to simulate typing
type_command() {
    echo -e "${BLUE}$ $1${NC}"
    sleep 1
}

# Function to show output
show_output() {
    echo -e "${GREEN}$1${NC}"
    sleep 0.5
}

clear

echo "╔════════════════════════════════════════════════════════════╗"
echo "║                                                            ║"
echo "║   API Integration Boilerplate Tool - Product Hunt Demo    ║"
echo "║                                                            ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
sleep 2

# Demo 1: List available integrations
echo -e "${YELLOW}📋 Step 1: Check available integrations${NC}"
echo ""
type_command "npx @api-integrations/cli list"
echo ""
show_output "Available Integrations:"
show_output "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
show_output "✓ stripe      - Payment processing with webhooks"
show_output "✓ clerk       - Authentication and user management"
show_output "✓ resend      - Email sending with React Email"
show_output "✓ liveblocks  - Real-time collaboration"
show_output "✓ supabase    - Database and backend services"
show_output "✓ openai      - AI chat and completions"
echo ""
sleep 3

# Demo 2: Add Stripe integration
echo -e "${YELLOW}💳 Step 2: Add Stripe integration${NC}"
echo ""
type_command "npx @api-integrations/cli add stripe"
echo ""
show_output "✓ Installing dependencies..."
show_output "  + stripe@^14.0.0"
show_output ""
show_output "✓ Copying integration files..."
show_output "  ✓ lib/stripe/client.ts"
show_output "  ✓ lib/stripe/config.ts"
show_output "  ✓ lib/stripe/webhooks.ts"
show_output "  ✓ app/api/stripe/checkout/route.ts"
show_output "  ✓ app/api/stripe/webhook/route.ts"
show_output ""
show_output "✓ Creating README..."
show_output "  ✓ STRIPE_INTEGRATION.md"
show_output ""
show_output "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
show_output "✨ Stripe integration installed successfully!"
show_output ""
show_output "Next steps:"
show_output "1. Add your Stripe keys to .env.local:"
show_output "   STRIPE_SECRET_KEY=sk_test_..."
show_output "   STRIPE_WEBHOOK_SECRET=whsec_..."
show_output ""
show_output "2. Start using Stripe in your app:"
show_output "   import { stripe } from '@/lib/stripe/client'"
echo ""
sleep 4

# Demo 3: Add Clerk integration
echo -e "${YELLOW}🔐 Step 3: Add authentication with Clerk${NC}"
echo ""
type_command "npx @api-integrations/cli add clerk"
echo ""
show_output "✓ Installing dependencies..."
show_output "  + @clerk/nextjs@^5.0.0"
show_output ""
show_output "✓ Copying integration files..."
show_output "  ✓ lib/clerk/helpers.ts"
show_output "  ✓ app/providers.tsx"
show_output "  ✓ middleware.ts"
show_output "  ✓ app/api/webhooks/clerk/route.ts"
show_output ""
show_output "✓ Integration complete!"
echo ""
sleep 3

# Demo 4: Quick init with multiple integrations
echo -e "${YELLOW}🚀 Step 4: Or initialize with multiple integrations at once${NC}"
echo ""
type_command "npx @api-integrations/cli init --with stripe,clerk,resend"
echo ""
show_output "✓ Installing all dependencies..."
show_output "  + stripe@^14.0.0"
show_output "  + @clerk/nextjs@^5.0.0"
show_output "  + resend@^3.0.0"
show_output "  + react-email@^2.0.0"
show_output ""
show_output "✓ Setting up 3 integrations..."
show_output "  ✓ Stripe"
show_output "  ✓ Clerk"
show_output "  ✓ Resend"
show_output ""
show_output "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
show_output "🎉 All integrations installed!"
show_output ""
show_output "Your project is ready with:"
show_output "  • Payment processing (Stripe)"
show_output "  • User authentication (Clerk)"
show_output "  • Email sending (Resend)"
show_output ""
show_output "Time saved: ~4 hours of setup ⏱️"
echo ""
sleep 3

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║                                                            ║"
echo "║   ✨ From idea to production in minutes, not hours ✨     ║"
echo "║                                                            ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

