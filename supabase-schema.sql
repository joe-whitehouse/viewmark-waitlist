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
