-- Create the waitlist_emails table in Supabase
CREATE TABLE waitlist_emails (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on email for faster lookups
CREATE INDEX idx_waitlist_emails_email ON waitlist_emails(email);

-- Create an index on created_at for sorting
CREATE INDEX idx_waitlist_emails_created_at ON waitlist_emails(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE waitlist_emails ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows inserts from authenticated and anonymous users
CREATE POLICY "Allow inserts for all users" ON waitlist_emails
  FOR INSERT WITH CHECK (true);

-- Create a policy that allows reads only for authenticated users (optional)
CREATE POLICY "Allow reads for authenticated users" ON waitlist_emails
  FOR SELECT USING (auth.role() = 'authenticated');

-- Create the page_views table for analytics tracking
CREATE TABLE page_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_path TEXT NOT NULL,
  user_agent TEXT,
  referrer TEXT,
  ip_address INET,
  session_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for analytics queries
CREATE INDEX idx_page_views_created_at ON page_views(created_at);
CREATE INDEX idx_page_views_page_path ON page_views(page_path);
CREATE INDEX idx_page_views_session_id ON page_views(session_id);

-- Enable Row Level Security (RLS) for page_views
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;

-- Allow inserts from anyone (for tracking)
CREATE POLICY "Allow inserts for all users" ON page_views
  FOR INSERT WITH CHECK (true);

-- Allow reads only for authenticated users (optional)
CREATE POLICY "Allow reads for authenticated users" ON page_views
  FOR SELECT USING (auth.role() = 'authenticated');
