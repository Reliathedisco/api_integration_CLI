-- Manual License Creation for Your Purchase

-- First, create a user record (if doesn't exist)
INSERT INTO public.users (clerk_id, email, first_name, last_name)
VALUES ('manual-user-1', 'your@email.com', 'Customer', 'Name')
ON CONFLICT (clerk_id) DO NOTHING
RETURNING id;

-- Create a purchase record
INSERT INTO public.purchases (
  user_id,
  stripe_customer_id,
  stripe_session_id,
  stripe_subscription_id,
  plan_type,
  amount,
  status
)
SELECT 
  id,
  'manual-stripe-customer',
  'manual-session-' || NOW()::text,
  NULL,
  'pro_lifetime',
  14900,
  'completed'
FROM public.users 
WHERE clerk_id = 'manual-user-1'
RETURNING id;

-- Create the license key (will auto-generate via trigger)
-- Check the license_keys table after running this
