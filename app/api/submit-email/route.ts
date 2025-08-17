import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseClient } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    // Insert email into Supabase
    const supabase = createSupabaseClient()
    const { error } = await supabase
      .from('waitlist_emails')
      .insert([
        { 
          email: email,
          created_at: new Date().toISOString()
        }
      ])

    if (error) {
      console.error('Supabase error:', error)
      
      // Handle duplicate email error specifically
      if (error.code === '23505' && error.message.includes('waitlist_emails_email_key')) {
        return NextResponse.json({ 
          error: 'This email is already on the waitlist!' 
        }, { status: 409 })
      }
      
      return NextResponse.json({ error: 'Failed to save email' }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Email submitted successfully' 
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
