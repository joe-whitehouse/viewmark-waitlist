const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  try {
    // Parse request body
    const { 
      interactionType, // 'page_view' or 'email_signup'
      pagePath, 
      userAgent, 
      referrer, 
      sessionId, 
      email 
    } = JSON.parse(event.body);
    
    // Validate required fields
    if (!interactionType) {
      return {
        statusCode: 400,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: 'interactionType is required' })
      };
    }
    
    // Get client IP address
    const forwarded = event.headers['x-forwarded-for'];
    const ip = forwarded ? forwarded.split(',')[0] : event.headers['client-ip'] || 'unknown';
    
    // Create Supabase client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Supabase environment variables not configured');
    }
    
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    
    // Prepare data for insertion
    const interactionData = {
      interaction_type: interactionType,
      page_path: pagePath,
      user_agent: userAgent,
      referrer: referrer,
      ip_address: ip,
      session_id: sessionId,
      email: email || null
    };
    
    // Insert interaction into unified table
    const { error } = await supabase
      .from('user_interactions')
      .insert(interactionData);
    
    if (error) {
      console.error('Error tracking interaction:', error);
      return {
        statusCode: 500,
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify({ error: 'Failed to track interaction' })
      };
    }
    
    // Also insert into original tables for backward compatibility
    if (interactionType === 'page_view') {
      const { error: pageViewError } = await supabase
        .from('page_views')
        .insert({
          page_path: pagePath,
          user_agent: userAgent,
          referrer: referrer,
          ip_address: ip,
          session_id: sessionId
        });
      
      if (pageViewError) {
        console.error('Error tracking page view in original table:', pageViewError);
      }
    } else if (interactionType === 'email_signup' && email) {
      const { error: emailError } = await supabase
        .from('waitlist_emails')
        .insert({ email: email });
      
      if (emailError) {
        console.error('Error tracking email signup in original table:', emailError);
      }
    }
    
    return {
      statusCode: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ success: true })
    };
    
  } catch (error) {
    console.error('Error in track-interaction function:', error);
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
