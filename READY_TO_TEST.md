# 🚀 You're Almost Ready!

## ✅ What's Done

- ✅ Stripe API keys configured
- ✅ Stripe price IDs added ($149 one-time and $29/month)
- ✅ Supabase URL and anon key configured
- ✅ `.env.local` created with all Stripe values

## ⚠️ One More Step: Get Supabase Service Role Key

You need to add the Supabase service role key to `.env.local`:

### How to Get It:

1. Go to https://supabase.com/dashboard/project/jslifvophokyvmojcdgy
2. Click **Settings** in the left sidebar (gear icon)
3. Click **API**
4. Scroll down to **Project API keys**
5. Find the **service_role** key (marked as "secret")
6. Click the **eye icon** 👁️ to reveal it
7. Copy the entire key (it starts with `eyJhbGci...`)
8. Open `.env.local` in your editor
9. Paste it after `SUPABASE_SERVICE_ROLE_KEY=`

Your `.env.local` line should look like:
```env
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpzbGlmdm9waG9reXZtb2pjZGd5Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTY5OTE4MiwiZXhwIjoyMDc3Mjc1MTgyfQ...
```

## 🗄️ Set Up Database (5 minutes)

Once you have the service role key:

### Step 1: Run SQL Schema

1. Stay in Supabase dashboard
2. Click **SQL Editor** in the left sidebar
3. Click **New query**
4. Open `lib/database/schema.sql` in VS Code
5. Copy **ALL** the contents (it's about 200 lines)
6. Paste into Supabase SQL Editor
7. Click **Run** (or press Cmd+Enter)
8. You should see: "Success. No rows returned"

### Step 2: Verify Tables Created

1. Click **Table Editor** in Supabase sidebar
2. You should see 4 new tables:
   - ✅ users
   - ✅ purchases
   - ✅ license_keys
   - ✅ subscriptions

If you see all 4 tables, you're good! ✅

## 🧪 Test Checkout (2 minutes)

Now test the complete flow:

### Start the Server

```bash
pnpm install
pnpm dev
```

### Test Checkout

1. Visit http://localhost:3000
2. Click **Pricing** in navigation
3. Click **"Get Lifetime Access"** button
4. You should see Stripe Checkout page
5. Fill in the test card:
   - Card: `4242 4242 4242 4242`
   - Expiry: `12/25` (any future date)
   - CVC: `123` (any 3 digits)
   - Name: Your name
   - Email: Your email
6. Click **Pay**

### Verify Success

After payment, check 3 things:

1. **Browser** - Should redirect to success page
2. **Terminal** - Should see webhook logs:
   ```
   ✅ Checkout completed: cs_test_...
   ```
3. **Supabase** - Go to Table Editor > purchases
   - Should have 1 new row
4. **Supabase** - Go to Table Editor > license_keys
   - Should have 1 auto-generated license key

## ✅ If All 3 Work: YOU'RE READY TO LAUNCH! 🎉

## 🐛 Troubleshooting

### "Missing price ID" error
- Make sure both price IDs are in `.env.local`
- Restart dev server: Stop it (Ctrl+C) and run `pnpm dev` again

### Webhook not firing
- Check terminal for errors
- Webhook should work automatically in development

### Database errors
- Make sure service_role key is correct
- Verify SQL schema ran successfully
- Check all 4 tables exist in Supabase

### Button doesn't redirect to Stripe
- Open browser console (F12)
- Look for errors
- Make sure `.env.local` has all values

## 🚀 Next: Deploy to Production

Once local testing works perfectly:

1. Push code to GitHub
2. Deploy to Vercel
3. Add environment variables to Vercel
4. Set up production Stripe webhook
5. Test with real card
6. **GO LIVE!** 🎉

---

## 📞 Current Status

- ✅ Stripe configured
- ✅ Price IDs added
- ⏳ Waiting for Supabase service role key
- ⏳ Need to run database schema
- ⏳ Ready to test checkout

**You're literally 5 minutes away from a working platform!**

