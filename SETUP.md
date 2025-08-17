# Viewmark Waitlist Setup Instructions

## 🚀 Quick Setup

### 1. Environment Variables
Create a `.env.local` file in your project root with the following variables:

```env
# Supabase Configuration (Required)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 2. Supabase Setup

1. **Create a Supabase Project:**
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Get your project URL and anon key from Settings > API

2. **Create the Database Table:**
   - Go to your Supabase dashboard
   - Navigate to SQL Editor
   - Run the SQL from `supabase-schema.sql` file

3. **Configure Row Level Security:**
   - The SQL script already includes RLS policies
   - This allows anonymous users to insert emails but only authenticated users to read them

### 3. Test the Integration

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Test email submission:**
   - Fill out the email form
   - Check your Supabase dashboard to see if the email was saved

## 📁 File Structure

```
├── app/
│   ├── api/submit-email/route.ts    # API endpoint for email submission
│   ├── page.tsx                     # Main landing page
│   └── completion/page.tsx          # Thank you page
├── lib/
│   └── supabase.ts                  # Supabase client configuration
├── supabase-schema.sql              # Database schema
└── env-template.txt                 # Environment variables template
```

## 🔧 Features

- ✅ **Email Validation**: Client and server-side validation
- ✅ **Supabase Integration**: Stores emails in PostgreSQL database
- ✅ **Error Handling**: Graceful error handling and user feedback
- ✅ **Success Animation**: Beautiful success state with auto-revert
- ✅ **Mobile Responsive**: Perfect on all device sizes

## 🚨 Troubleshooting

### Common Issues:

1. **"Service not configured" error:**
   - Check that your `.env.local` file exists and has the correct Supabase credentials

2. **"Failed to save email" error:**
   - Verify your Supabase table exists and RLS policies are configured
   - Check that the email isn't already in the database (unique constraint)

3. **Build errors:**
   - Make sure all environment variables are set before building
   - Run `npm run build` to check for any issues

## 🎯 Next Steps

1. **Deploy to Production:**
   - Set up environment variables on your hosting platform
   - Deploy the application

2. **Monitor Submissions:**
   - Check Supabase dashboard for email submissions
   - Set up notifications if needed

3. **Customize:**
   - Modify the success message or animation timing
   - Add additional fields to the form if needed
