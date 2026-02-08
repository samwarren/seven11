-- Guestbook entries
CREATE TABLE IF NOT EXISTS guestbook_entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  message text NOT NULL,
  is_approved boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_guestbook_approved ON guestbook_entries(is_approved, created_at DESC);

-- Enable RLS
ALTER TABLE guestbook_entries ENABLE ROW LEVEL SECURITY;

-- Anyone can write guestbook entries
CREATE POLICY "Anyone can write guestbook entries"
  ON guestbook_entries FOR INSERT
  WITH CHECK (true);

-- Approved guestbook entries are visible to everyone
CREATE POLICY "Approved guestbook entries are visible"
  ON guestbook_entries FOR SELECT
  USING (is_approved = true);
