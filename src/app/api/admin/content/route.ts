import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import fs from 'fs/promises';
import path from 'path';

const CONTENT_DIR = path.join(process.cwd(), 'content');

const ALLOWED_FILES = [
  'site.json',
  'events.json',
  'story.json',
  'party.json',
  'travel.json',
  'faq.json',
  'registry.json',
  'gallery.json',
];

async function isAuthed(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;
  return token === process.env.ADMIN_PASSWORD;
}

export async function GET(request: NextRequest) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const file = searchParams.get('file');

  if (!file || !ALLOWED_FILES.includes(file)) {
    return NextResponse.json(
      { error: 'Invalid file. Allowed: ' + ALLOWED_FILES.join(', ') },
      { status: 400 }
    );
  }

  try {
    const filePath = path.join(CONTENT_DIR, file);
    const raw = await fs.readFile(filePath, 'utf-8');
    return NextResponse.json({ file, content: JSON.parse(raw) });
  } catch {
    return NextResponse.json({ error: 'Failed to read file' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { file, content } = await request.json();

    if (!file || !ALLOWED_FILES.includes(file)) {
      return NextResponse.json(
        { error: 'Invalid file. Allowed: ' + ALLOWED_FILES.join(', ') },
        { status: 400 }
      );
    }

    // Validate it's valid JSON by round-tripping
    const formatted = JSON.stringify(content, null, 2) + '\n';

    const filePath = path.join(CONTENT_DIR, file);
    await fs.writeFile(filePath, formatted, 'utf-8');

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Content write error:', error);
    return NextResponse.json(
      { error: 'Failed to save content' },
      { status: 500 }
    );
  }
}
