import { useState } from "react";
import { EntryForm } from "./entryform.jsx";
import { EntryList } from "./entrylist.jsx";

import "./prayerjournal.css";

export function PrayerJournal() {
  const [entries, setEntries] = useState([]);
  const [editingEntry, setEditingEntry] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddEntry = (entry) => {
    const newEntry = {
      ...entry,
      id: Date.now().toString(),
    };
    setEntries([newEntry, ...entries]);
    setIsAdding(false);
  };

  const handleEditEntry = (updatedEntry) => {
    setEntries(
      entries.map((entry) =>
        entry.id === updatedEntry.id ? updatedEntry : entry,
      ),
    );
    setEditingEntry(null);
  };

  const handleDeleteEntry = (id) => {
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  const handleStartEdit = (entry) => {
    setEditingEntry(entry);
    setIsAdding(false); // ensures add mode is off
  };

  const handleStartAdd = () => {
    setIsAdding(true);
    setEditingEntry(null); // ensures edit mode is off
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingEntry(null);
  };

  return (
    <div className="prayer-journal">
      <header className="journal-header">
        <h1>Prayer Journal</h1>

        {/* Show button ONLY when not adding or editing */}
        {!isAdding && !editingEntry && (
          <button className="new-prayer-button" onClick={handleStartAdd}>
            + New Prayer
          </button>
        )}
      </header>

      {/* Add mode */}
      {isAdding && (
        <EntryForm onSubmit={handleAddEntry} onCancel={handleCancel} />
      )}

      {/* Edit mode */}
      {editingEntry && (
        <EntryForm
          entry={editingEntry}
          onSubmit={handleEditEntry}
          onCancel={handleCancel}
          isEditing
        />
      )}

      {!isAdding && !editingEntry && (
        <EntryList
          entries={entries}
          onEdit={handleStartEdit}
          onDelete={handleDeleteEntry}
        />
      )}
    </div>
  );
}
