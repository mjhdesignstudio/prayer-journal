import { useState } from "react";
import { EntryForm } from "./entryform.jsx";
import { EntryList } from "./entrylist.jsx";

export function PrayerJournal() {
  const [entries, setEntries] = useState([]);
  const [editingEntry, setEditingEntry] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleAddEntry = (entry) => {
    const newEntry = {
      ...entry,
      id: Date.now().toString(),
    };
    setEntries([newEntry, ...entries]);
    setIsFormVisible(false);
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
    setIsFormVisible(false);
  };

  const handleCancelEdit = () => {
    setEditingEntry(null);
  };

  return (
    <div className="prayer-journal">
      <header className="journal-header">
        <h1>Prayer Journal</h1>
        <button
          className="btn btn-primary"
          onClick={() => {
            setIsFormVisible(!isFormVisible);
            setEditingEntry(null);
          }}
        >
          {isFormVisible ? "Cancel" : "+ New Prayer"}
        </button>
      </header>

      {isFormVisible && (
        <EntryForm
          onSubmit={handleAddEntry}
          onCancel={() => setIsFormVisible(false)}
        />
      )}

      {editingEntry && (
        <EntryForm
          entry={editingEntry}
          onSubmit={handleEditEntry}
          onCancel={handleCancelEdit}
          isEditing
        />
      )}

      <EntryList
        entries={entries}
        onEdit={handleStartEdit}
        onDelete={handleDeleteEntry}
      />
    </div>
  );
}
