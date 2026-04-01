import { EntryCard } from "./entrycard.jsx";

export function EntryList({ entries, onEdit, onDelete }) {
  if (entries.length === 0) {
    return (
      <div className="empty-state">
        <p>No prayer requests yet. Click "+ New Prayer" to get started.</p>
      </div>
    );
  }

  return (
    <div className="entry-list">
      {entries.map((entry) => (
        <EntryCard
          key={entry.id}
          entry={entry}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
