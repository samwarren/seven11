'use client';

import { useState, useEffect, useCallback } from 'react';
import { PixelIcon } from '@/components/y2k/PixelIcon';

const CONTENT_FILES = [
  { file: 'site.json', label: 'Site Settings', icon: 'home' },
  { file: 'events.json', label: 'Events', icon: 'calendar' },
  { file: 'story.json', label: 'Our Story', icon: 'heart' },
  { file: 'party.json', label: 'Wedding Party', icon: 'people' },
  { file: 'travel.json', label: 'Travel', icon: 'plane' },
  { file: 'faq.json', label: 'FAQ', icon: 'question' },
  { file: 'registry.json', label: 'Registry', icon: 'gift' },
  { file: 'gallery.json', label: 'Gallery', icon: 'camera' },
];

// ---- Login Screen ----
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Login failed');
        return;
      }
      onLogin();
    } catch {
      setError('Connection failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ocean-50">
      <div className="y2k-card w-full max-w-sm">
        <h1 className="mb-6 text-center font-display text-2xl text-ocean-700">
          Admin Login
        </h1>
        <form onSubmit={handleSubmit}>
          <label className="mb-1 block font-bold text-ocean-600">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bevel-sunken mb-4 w-full bg-white px-3 py-2 text-ocean-900 outline-none"
            autoFocus
          />
          {error && (
            <p className="mb-3 text-sm text-coral-500">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="btn-y2k w-full justify-center"
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
      </div>
    </div>
  );
}

// ---- Site Settings Form ----
function SiteSettingsForm({
  content,
  onChange,
}: {
  content: Record<string, unknown>;
  onChange: (updated: Record<string, unknown>) => void;
}) {
  const couple = content.couple as Record<string, string>;
  const venue = content.venue as Record<string, string>;
  const meta = content.meta as Record<string, string>;

  function set(path: string, value: string) {
    const parts = path.split('.');
    const updated = JSON.parse(JSON.stringify(content));
    let obj = updated;
    for (let i = 0; i < parts.length - 1; i++) {
      obj = obj[parts[i]];
    }
    obj[parts[parts.length - 1]] = value;
    onChange(updated);
  }

  return (
    <div className="space-y-4">
      <fieldset className="bevel-sunken bg-white p-4">
        <legend className="font-bold text-ocean-700">Couple</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Partner 1" value={couple.partner1} onChange={(v) => set('couple.partner1', v)} />
          <Field label="Partner 2" value={couple.partner2} onChange={(v) => set('couple.partner2', v)} />
        </div>
      </fieldset>

      <fieldset className="bevel-sunken bg-white p-4">
        <legend className="font-bold text-ocean-700">Wedding</legend>
        <Field label="Date (ISO)" value={content.weddingDate as string} onChange={(v) => set('weddingDate', v)} />
        <Field label="Tagline" value={content.tagline as string} onChange={(v) => set('tagline', v)} />
        <Field label="Welcome Message" value={content.welcomeMessage as string} onChange={(v) => set('welcomeMessage', v)} />
        <Field label="RSVP Form URL" value={content.rsvpFormUrl as string} onChange={(v) => set('rsvpFormUrl', v)} />
      </fieldset>

      <fieldset className="bevel-sunken bg-white p-4">
        <legend className="font-bold text-ocean-700">Venue</legend>
        <Field label="Name" value={venue.name} onChange={(v) => set('venue.name', v)} />
        <Field label="Address" value={venue.address} onChange={(v) => set('venue.address', v)} />
        <Field label="City" value={venue.city} onChange={(v) => set('venue.city', v)} />
        <Field label="Map URL" value={venue.mapUrl} onChange={(v) => set('venue.mapUrl', v)} />
      </fieldset>

      <fieldset className="bevel-sunken bg-white p-4">
        <legend className="font-bold text-ocean-700">SEO</legend>
        <Field label="Page Title" value={meta.title} onChange={(v) => set('meta.title', v)} />
        <Field label="Description" value={meta.description} onChange={(v) => set('meta.description', v)} />
      </fieldset>
    </div>
  );
}

// ---- FAQ Form ----
function FaqForm({
  content,
  onChange,
}: {
  content: Record<string, unknown>;
  onChange: (updated: Record<string, unknown>) => void;
}) {
  const entries = content.entries as { question: string; answer: string }[];

  function updateEntry(index: number, field: 'question' | 'answer', value: string) {
    const updated = JSON.parse(JSON.stringify(content));
    updated.entries[index][field] = value;
    onChange(updated);
  }

  function addEntry() {
    const updated = JSON.parse(JSON.stringify(content));
    updated.entries.push({ question: '', answer: '' });
    onChange(updated);
  }

  function removeEntry(index: number) {
    const updated = JSON.parse(JSON.stringify(content));
    updated.entries.splice(index, 1);
    onChange(updated);
  }

  return (
    <div className="space-y-4">
      {entries.map((entry, i) => (
        <fieldset key={i} className="bevel-sunken bg-white p-4">
          <legend className="font-bold text-ocean-700">Q&A #{i + 1}</legend>
          <Field label="Question" value={entry.question} onChange={(v) => updateEntry(i, 'question', v)} />
          <AreaField label="Answer" value={entry.answer} onChange={(v) => updateEntry(i, 'answer', v)} />
          <button onClick={() => removeEntry(i)} className="mt-2 text-sm text-coral-500 hover:text-coral-700">
            Remove
          </button>
        </fieldset>
      ))}
      <button onClick={addEntry} className="btn-y2k text-sm">
        + Add Question
      </button>
    </div>
  );
}

// ---- Story Form ----
function StoryForm({
  content,
  onChange,
}: {
  content: Record<string, unknown>;
  onChange: (updated: Record<string, unknown>) => void;
}) {
  const entries = content.entries as { year: string; title: string; description: string; image: string }[];

  function updateEntry(index: number, field: string, value: string) {
    const updated = JSON.parse(JSON.stringify(content));
    updated.entries[index][field] = value;
    onChange(updated);
  }

  function addEntry() {
    const updated = JSON.parse(JSON.stringify(content));
    updated.entries.push({ year: '', title: '', description: '', image: '' });
    onChange(updated);
  }

  function removeEntry(index: number) {
    const updated = JSON.parse(JSON.stringify(content));
    updated.entries.splice(index, 1);
    onChange(updated);
  }

  return (
    <div className="space-y-4">
      {entries.map((entry, i) => (
        <fieldset key={i} className="bevel-sunken bg-white p-4">
          <legend className="font-bold text-ocean-700">Chapter #{i + 1}</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Year" value={entry.year} onChange={(v) => updateEntry(i, 'year', v)} />
            <Field label="Title" value={entry.title} onChange={(v) => updateEntry(i, 'title', v)} />
          </div>
          <AreaField label="Description" value={entry.description} onChange={(v) => updateEntry(i, 'description', v)} />
          <Field label="Image path" value={entry.image} onChange={(v) => updateEntry(i, 'image', v)} />
          <button onClick={() => removeEntry(i)} className="mt-2 text-sm text-coral-500 hover:text-coral-700">
            Remove
          </button>
        </fieldset>
      ))}
      <button onClick={addEntry} className="btn-y2k text-sm">
        + Add Chapter
      </button>
    </div>
  );
}

// ---- Events Form ----
function EventsForm({
  content,
  onChange,
}: {
  content: Record<string, unknown>;
  onChange: (updated: Record<string, unknown>) => void;
}) {
  const events = (content.events as Record<string, unknown>[]) || [];

  function updateEvent(index: number, field: string, value: unknown) {
    const updated = JSON.parse(JSON.stringify(content));
    updated.events[index][field] = value;
    onChange(updated);
  }

  function addEvent() {
    const updated = JSON.parse(JSON.stringify(content));
    updated.events.push({
      id: 'new-event-' + Date.now(),
      name: '',
      date: '',
      endTime: '',
      venue: '',
      address: '',
      description: '',
      dressCode: '',
      mapUrl: '',
      mealOptions: [],
      allowPlusOnes: true,
    });
    onChange(updated);
  }

  function removeEvent(index: number) {
    const updated = JSON.parse(JSON.stringify(content));
    updated.events.splice(index, 1);
    onChange(updated);
  }

  return (
    <div className="space-y-4">
      {events.map((event, i) => (
        <fieldset key={i} className="bevel-sunken bg-white p-4">
          <legend className="font-bold text-ocean-700">{(event.name as string) || `Event #${i + 1}`}</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="ID (no spaces)" value={event.id as string} onChange={(v) => updateEvent(i, 'id', v)} />
            <Field label="Name" value={event.name as string} onChange={(v) => updateEvent(i, 'name', v)} />
            <Field label="Start (ISO)" value={event.date as string} onChange={(v) => updateEvent(i, 'date', v)} />
            <Field label="End (ISO)" value={event.endTime as string} onChange={(v) => updateEvent(i, 'endTime', v)} />
            <Field label="Venue" value={event.venue as string} onChange={(v) => updateEvent(i, 'venue', v)} />
            <Field label="Address" value={event.address as string} onChange={(v) => updateEvent(i, 'address', v)} />
            <Field label="Dress Code" value={event.dressCode as string} onChange={(v) => updateEvent(i, 'dressCode', v)} />
            <Field label="Map URL" value={event.mapUrl as string} onChange={(v) => updateEvent(i, 'mapUrl', v)} />
          </div>
          <AreaField label="Description" value={event.description as string} onChange={(v) => updateEvent(i, 'description', v)} />
          <Field
            label="Meal Options (comma-separated)"
            value={(event.mealOptions as string[]).join(', ')}
            onChange={(v) => updateEvent(i, 'mealOptions', v.split(',').map((s: string) => s.trim()).filter(Boolean))}
          />
          <button onClick={() => removeEvent(i)} className="mt-2 text-sm text-coral-500 hover:text-coral-700">
            Remove
          </button>
        </fieldset>
      ))}
      <button onClick={addEvent} className="btn-y2k text-sm">
        + Add Event
      </button>
    </div>
  );
}

// ---- Generic JSON Editor (fallback for other files) ----
function JsonEditor({
  content,
  onChange,
}: {
  content: Record<string, unknown>;
  onChange: (updated: Record<string, unknown>) => void;
}) {
  const [text, setText] = useState(JSON.stringify(content, null, 2));
  const [parseError, setParseError] = useState('');

  // Sync when content changes externally
  useEffect(() => {
    setText(JSON.stringify(content, null, 2));
  }, [content]);

  function handleChange(value: string) {
    setText(value);
    try {
      const parsed = JSON.parse(value);
      setParseError('');
      onChange(parsed);
    } catch {
      setParseError('Invalid JSON');
    }
  }

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => handleChange(e.target.value)}
        className="bevel-sunken w-full bg-white px-3 py-2 font-mono text-sm text-ocean-900 outline-none"
        rows={20}
        spellCheck={false}
      />
      {parseError && <p className="mt-1 text-sm text-coral-500">{parseError}</p>}
    </div>
  );
}

// ---- Shared field components ----
function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="mb-3">
      <label className="mb-1 block text-sm font-bold text-ocean-600">{label}</label>
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        className="bevel-sunken w-full bg-white px-3 py-1.5 text-sm text-ocean-900 outline-none"
      />
    </div>
  );
}

function AreaField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="mb-3">
      <label className="mb-1 block text-sm font-bold text-ocean-600">{label}</label>
      <textarea
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="bevel-sunken w-full bg-white px-3 py-1.5 text-sm text-ocean-900 outline-none"
      />
    </div>
  );
}

// ---- Main Admin Page ----
export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [activeFile, setActiveFile] = useState('site.json');
  const [content, setContent] = useState<Record<string, unknown> | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loadError, setLoadError] = useState('');

  // Check if already authed
  useEffect(() => {
    fetch('/api/admin/content?file=site.json')
      .then((res) => {
        if (res.ok) setAuthed(true);
      })
      .finally(() => setChecking(false));
  }, []);

  const loadContent = useCallback(async (file: string) => {
    setContent(null);
    setLoadError('');
    setSaved(false);
    try {
      const res = await fetch(`/api/admin/content?file=${file}`);
      if (!res.ok) throw new Error('Failed to load');
      const data = await res.json();
      setContent(data.content);
    } catch {
      setLoadError('Failed to load content');
    }
  }, []);

  useEffect(() => {
    if (authed) loadContent(activeFile);
  }, [authed, activeFile, loadContent]);

  async function handleSave() {
    if (!content) return;
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ file: activeFile, content }),
      });
      if (!res.ok) throw new Error('Save failed');
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      alert('Failed to save. Check the console for errors.');
    } finally {
      setSaving(false);
    }
  }

  async function handleLogout() {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    setAuthed(false);
  }

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ocean-50">
        <p className="font-pixel text-xs text-ocean-400">Loading...</p>
      </div>
    );
  }

  if (!authed) {
    return <LoginScreen onLogin={() => setAuthed(true)} />;
  }

  const activeLabel = CONTENT_FILES.find((f) => f.file === activeFile)?.label || activeFile;

  return (
    <div className="min-h-screen bg-ocean-50">
      {/* Header */}
      <div className="bevel-raised bg-gradient-to-r from-ocean-700 to-ocean-800 px-4 py-3">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <h1 className="font-display text-xl text-white">Admin Editor</h1>
          <div className="flex items-center gap-3">
            <a href="/" className="text-sm text-ocean-200 hover:text-white" target="_blank">
              View Site
            </a>
            <button onClick={handleLogout} className="text-sm text-ocean-300 hover:text-white">
              Log Out
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
          {/* Sidebar */}
          <div className="space-y-1">
            {CONTENT_FILES.map((cf) => (
              <button
                key={cf.file}
                onClick={() => setActiveFile(cf.file)}
                className={`flex w-full items-center gap-2 rounded px-3 py-2 text-left text-sm transition-colors ${
                  activeFile === cf.file
                    ? 'bg-ocean-200 font-bold text-ocean-800'
                    : 'text-ocean-600 hover:bg-ocean-100'
                }`}
              >
                <PixelIcon name={cf.icon} size={14} />
                {cf.label}
              </button>
            ))}
          </div>

          {/* Editor */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-2xl text-ocean-700">{activeLabel}</h2>
              <div className="flex items-center gap-3">
                {saved && <span className="text-sm text-seafoam-600">Saved!</span>}
                <button
                  onClick={handleSave}
                  disabled={saving || !content}
                  className="btn-y2k-coral btn-y2k px-4 py-1.5 text-sm"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>

            {loadError && (
              <div className="bevel-sunken bg-coral-50 p-3 text-sm text-coral-600">{loadError}</div>
            )}

            {content && (
              <div className="y2k-card">
                {activeFile === 'site.json' && (
                  <SiteSettingsForm content={content} onChange={setContent} />
                )}
                {activeFile === 'faq.json' && (
                  <FaqForm content={content} onChange={setContent} />
                )}
                {activeFile === 'story.json' && (
                  <StoryForm content={content} onChange={setContent} />
                )}
                {activeFile === 'events.json' && (
                  <EventsForm content={content} onChange={setContent} />
                )}
                {!['site.json', 'faq.json', 'story.json', 'events.json'].includes(activeFile) && (
                  <JsonEditor content={content} onChange={setContent} />
                )}
              </div>
            )}

            <p className="mt-4 text-xs text-ocean-400">
              Changes are saved to the content JSON files. Restart the dev server or rebuild to see updates on static pages.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
