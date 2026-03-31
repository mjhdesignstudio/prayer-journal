export function EntryCard({ entry, onEdit, onDelete }) {
  const formatDate = (dateString) => {
    if (!dateString) return "Not set";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this prayer entry?")) {
      onDelete(entry.id);
    }
  };

  return (
    <div className={`entry-card ${entry.isAnswered ? "answered" : ""}`}>
      <div className="entry-header">
        <h3>{entry.title}</h3>
        {entry.isAnswered && <span className="badge">Answered</span>}
      </div>

      <p className="entry-content">{entry.content}</p>

      {entry.isAnswered && entry.answerText && (
        <div className="answer-section">
          <h4 className="answer-label">Answer:</h4>
          <p className="answer-content">{entry.answerText}</p>
        </div>
      )}

      <div className="entry-dates">
        <div className="date-item">
          <span className="date-label">Created:</span>
          <span className="date-value">{formatDate(entry.createdDate)}</span>
        </div>
        {entry.isAnswered && entry.answeredDate && (
          <div className="date-item answered-date">
            <span className="date-label">Answered:</span>
            <span className="date-value">{formatDate(entry.answeredDate)}</span>
          </div>
        )}
      </div>

      <div className="entry-actions">
        <button
          className="btn btn-small btn-edit"
          onClick={() => onEdit(entry)}
        >
          Edit
        </button>
        <button className="btn btn-small btn-delete" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}
