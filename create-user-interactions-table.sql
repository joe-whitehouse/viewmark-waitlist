-- Create unified user_interactions table for comprehensive analytics
-- This combines page views and email signups for better insights

CREATE TABLE user_interactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  interaction_type TEXT NOT NULL, -- 'page_view', 'email_signup'
  page_path TEXT,
  user_agent TEXT,
  referrer TEXT,
  ip_address INET,
  session_id TEXT,
  email TEXT, -- Only populated for email_signup interactions
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_user_interactions_type ON user_interactions(interaction_type);
CREATE INDEX idx_user_interactions_created_at ON user_interactions(created_at);
CREATE INDEX idx_user_interactions_session_id ON user_interactions(session_id);
CREATE INDEX idx_user_interactions_page_path ON user_interactions(page_path);
CREATE INDEX idx_user_interactions_email ON user_interactions(email) WHERE email IS NOT NULL;

-- Enable Row Level Security (RLS)
ALTER TABLE user_interactions ENABLE ROW LEVEL SECURITY;

-- Allow inserts from anyone (for tracking)
CREATE POLICY "Allow inserts for all users" ON user_interactions
  FOR INSERT WITH CHECK (true);

-- Allow reads only for authenticated users (optional)
CREATE POLICY "Allow reads for authenticated users" ON user_interactions
  FOR SELECT USING (auth.role() = 'authenticated');

-- Migrate existing data from page_views table
INSERT INTO user_interactions (
  interaction_type,
  page_path,
  user_agent,
  referrer,
  ip_address,
  session_id,
  created_at
)
SELECT 
  'page_view',
  page_path,
  user_agent,
  referrer,
  ip_address,
  session_id,
  created_at
FROM page_views;

-- Migrate existing data from waitlist_emails table
INSERT INTO user_interactions (
  interaction_type,
  email,
  created_at
)
SELECT 
  'email_signup',
  email,
  created_at
FROM waitlist_emails;
