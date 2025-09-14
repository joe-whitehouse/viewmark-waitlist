const { createClient } = require('@supabase/supabase-js');

exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Parse the request body
    const { email } = JSON.parse(event.body);

    if (!email) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Email is required' })
      };
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid email format' })
      };
    }

    // Create Supabase client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('Supabase environment variables are not configured');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Server configuration error' })
      };
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Insert email into both tables for unified tracking
    const trimmedEmail = email.trim();
    
    // Insert into original waitlist_emails table
    const { error } = await supabase
      .from('waitlist_emails')
      .insert([
        { 
          email: trimmedEmail,
          created_at: new Date().toISOString()
        }
      ]);
    
    // Also insert into unified user_interactions table
    if (!error) {
      const { error: interactionError } = await supabase
        .from('user_interactions')
        .insert({
          interaction_type: 'email_signup',
          email: trimmedEmail,
          created_at: new Date().toISOString()
        });
      
      if (interactionError) {
        console.error('Error tracking email signup in unified table:', interactionError);
      }
    }

    if (error) {
      console.error('Supabase error:', error);
      
      // Handle duplicate email error specifically
      if (error.code === '23505' && error.message.includes('waitlist_emails_email_key')) {
        return {
          statusCode: 409,
          body: JSON.stringify({ 
            error: 'This email is already on the waitlist!' 
          })
        };
      }
      
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to save email' })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true, 
        message: 'Email submitted successfully' 
      })
    };

  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};
