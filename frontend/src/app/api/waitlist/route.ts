import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Helper function to get Supabase client (lazy initialization)
function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    return null
  }

  return createClient(supabaseUrl, supabaseAnonKey)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Get Supabase client (returns null if not configured)
    const supabase = getSupabaseClient()

    // If Supabase is not configured, still accept the email but log it
    if (!supabase) {
      console.log('Supabase not configured. Email received:', email)
      // Still return success to user, but log the email
      return NextResponse.json(
        { message: 'Email received (stored locally)', email },
        { status: 200 }
      )
    }

    // Insert email into waitlist table
    const { data, error } = await supabase
      .from('waitlist')
      .insert([
        {
          email: email.toLowerCase().trim(),
          created_at: new Date().toISOString(),
        },
      ])
      .select()

    if (error) {
      // If it's a duplicate email error, still return success
      if (error.code === '23505' || error.message.includes('duplicate')) {
        return NextResponse.json(
          { message: 'You are already on the waitlist!', email },
          { status: 200 }
        )
      }

      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to add email to waitlist' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Successfully added to waitlist', email: data[0]?.email },
      { status: 200 }
    )
  } catch (error) {
    console.error('Waitlist API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

