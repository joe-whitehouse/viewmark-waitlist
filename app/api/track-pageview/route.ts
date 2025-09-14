import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseClient } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { pagePath, userAgent, referrer, sessionId } = await request.json()
    
    // Get client IP address
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0] : request.ip || 'unknown'
    
    // Create Supabase client
    const supabase = createSupabaseClient()
    
    // Insert page view into database
    const { error } = await supabase
      .from('page_views')
      .insert({
        page_path: pagePath,
        user_agent: userAgent,
        referrer: referrer,
        ip_address: ip,
        session_id: sessionId
      })
    
    if (error) {
      console.error('Error tracking page view:', error)
      return NextResponse.json({ error: 'Failed to track page view' }, { status: 500 })
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in track-pageview API:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
