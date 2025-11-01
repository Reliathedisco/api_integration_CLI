#!/bin/bash

# API Integration Tool - Comprehensive Test Suite
# This script tests all major functionality

echo "🧪 API Integration Tool - Test Suite"
echo "===================================="
echo ""

BASE_URL="http://localhost:8080"
PASS=0
FAIL=0

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Test function
test_endpoint() {
    local name=$1
    local url=$2
    local expected_code=${3:-200}
    
    echo -n "Testing $name... "
    
    response=$(curl -s -o /dev/null -w "%{http_code}" "$url")
    
    if [ "$response" -eq "$expected_code" ]; then
        echo -e "${GREEN}✓ PASS${NC} (HTTP $response)"
        ((PASS++))
    else
        echo -e "${RED}✗ FAIL${NC} (Expected $expected_code, got $response)"
        ((FAIL++))
    fi
}

# Test API endpoint with JSON
test_api() {
    local name=$1
    local url=$2
    local method=${3:-GET}
    local data=$4
    
    echo -n "Testing $name... "
    
    if [ -n "$data" ]; then
        response=$(curl -s -X "$method" -H "Content-Type: application/json" -d "$data" "$url")
    else
        response=$(curl -s -X "$method" "$url")
    fi
    
    if echo "$response" | grep -q "error.*failed\|Error\|not found" -i; then
        echo -e "${RED}✗ FAIL${NC}"
        echo "  Response: $response"
        ((FAIL++))
    else
        echo -e "${GREEN}✓ PASS${NC}"
        ((PASS++))
    fi
}

echo "📄 Testing Marketing Pages"
echo "-------------------------"
test_endpoint "Homepage" "$BASE_URL/"
test_endpoint "Pricing Page" "$BASE_URL/pricing"
test_endpoint "Integrations Page" "$BASE_URL/integrations"
test_endpoint "Documentation Page" "$BASE_URL/docs"
test_endpoint "Dashboard Page" "$BASE_URL/dashboard"
echo ""

echo "🔌 Testing API Endpoints"
echo "----------------------"
test_api "Health Check" "$BASE_URL/api/health" "GET"
echo ""

echo "📁 Checking File Structure"
echo "-------------------------"

check_file() {
    local file=$1
    local name=$2
    
    echo -n "Checking $name... "
    if [ -f "$file" ]; then
        echo -e "${GREEN}✓ EXISTS${NC}"
        ((PASS++))
    else
        echo -e "${RED}✗ MISSING${NC}"
        ((FAIL++))
    fi
}

check_file ".env.local" ".env.local"
check_file "package.json" "package.json"
check_file "app/page.tsx" "Homepage"
check_file "app/pricing/page.tsx" "Pricing page"
check_file "app/api/stripe/checkout/route.ts" "Stripe checkout API"
check_file "app/api/stripe/webhook/route.ts" "Stripe webhook API"
check_file "components/checkout-button.tsx" "Checkout button"
check_file "lib/database/schema.sql" "Database schema"
echo ""

echo "🔧 Checking CLI Structure"
echo "------------------------"
check_file "packages/cli/src/index.ts" "CLI entry point"
check_file "packages/cli/src/commands/init.ts" "Init command"
check_file "packages/cli/src/commands/add.ts" "Add command"
check_file "packages/cli/src/commands/list.ts" "List command"
check_file "packages/cli/src/config/integrations.ts" "Integrations config"
echo ""

echo "📦 Checking Integration Templates"
echo "--------------------------------"
check_file "packages/cli/templates/stripe/lib/stripe/client.ts" "Stripe template"
check_file "packages/cli/templates/clerk/middleware.ts" "Clerk template"
check_file "packages/cli/templates/resend/lib/resend/client.ts" "Resend template"
check_file "packages/cli/templates/liveblocks/lib/liveblocks/client.ts" "Liveblocks template"
check_file "packages/cli/templates/supabase/lib/supabase/client.ts" "Supabase template"
check_file "packages/cli/templates/openai/lib/openai/client.ts" "OpenAI template"
echo ""

echo "🔐 Checking Environment Variables"
echo "--------------------------------"

check_env() {
    local var=$1
    echo -n "Checking $var... "
    if grep -q "^$var=" .env.local && ! grep -q "^$var=$" .env.local && ! grep -q "^$var=.*placeholder\|xxx\|your_" .env.local; then
        echo -e "${GREEN}✓ SET${NC}"
        ((PASS++))
    else
        echo -e "${RED}✗ NOT SET${NC}"
        ((FAIL++))
    fi
}

check_env "STRIPE_SECRET_KEY"
check_env "STRIPE_WEBHOOK_SECRET"
check_env "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
check_env "STRIPE_PRO_ONE_TIME_PRICE_ID"
check_env "STRIPE_PRO_MONTHLY_PRICE_ID"
check_env "NEXT_PUBLIC_SUPABASE_URL"
check_env "NEXT_PUBLIC_SUPABASE_ANON_KEY"
check_env "SUPABASE_SERVICE_ROLE_KEY"
echo ""

echo "===================================="
echo "📊 Test Results"
echo "===================================="
echo -e "✓ Passed: ${GREEN}$PASS${NC}"
echo -e "✗ Failed: ${RED}$FAIL${NC}"
echo ""

if [ $FAIL -eq 0 ]; then
    echo -e "${GREEN}🎉 ALL TESTS PASSED! Your platform is ready!${NC}"
    exit 0
else
    echo -e "${RED}⚠️  Some tests failed. Check the output above.${NC}"
    exit 1
fi

