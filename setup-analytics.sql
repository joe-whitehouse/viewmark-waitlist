-- Run this SQL in your Supabase SQL editor to create the analytics table

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
