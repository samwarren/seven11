interface GuestbookEntry {
  name: string;
  message: string;
  created_at: string;
}

export function GuestbookWidget({ entries }: { entries: GuestbookEntry[] }) {
  return (
    <div className="space-y-4">
      {entries.map((entry, i) => (
        <div key={i} className="y2k-card">
          <div className="mb-1 flex items-center gap-2">
            <span className="font-bold text-ocean-700">{entry.name}</span>
            <span className="text-xs text-ocean-400">
              {new Date(entry.created_at).toLocaleDateString()}
            </span>
          </div>
          <p className="text-ocean-900">{entry.message}</p>
        </div>
      ))}
    </div>
  );
}
