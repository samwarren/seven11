import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function GET() {
  try {
    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from('guestbook_entries')
      .select('id, name, message, created_at')
      .eq('is_approved', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Guestbook fetch error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch guestbook entries' },
        { status: 500 }
      );
    }

    return NextResponse.json({ entries: data || [] });
  } catch (error) {
    console.error('Guestbook error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, message } = await request.json();

    if (!name?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: 'Name and message are required' },
        { status: 400 }
      );
    }

    if (message.length > 1000) {
      return NextResponse.json(
        { error: 'Message must be under 1000 characters' },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    const { error } = await supabase.from('guestbook_entries').insert({
      name: name.trim(),
      message: message.trim(),
    });

    if (error) {
      console.error('Guestbook insert error:', error);
      return NextResponse.json(
        { error: 'Failed to save entry' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Guestbook error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
