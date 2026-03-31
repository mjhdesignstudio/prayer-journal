import { useState, useEffect } from "react";

export function EntryForm({ entry, onSubmit, onCancel, isEditing }) {
  const [title, setTitle] = useState(entry?.title || "");
  const [content, setContent] = useState(entry?.content || "");
  const [createdDate, setCreatedDate] = useState(
    entry?.createdDate || new Date().toISOString().split("T")[0],
  );
  const [answeredDate, setAnsweredDate] = useState(entry?.answeredDate || "");
  const [isAnswered, setIsAnswered] = useState(entry?.isAnswered || false);
  const [answerText, setAnswerText] = useState(entry?.answerText || "");

  useEffect(() => {
    if (entry) {
      setTitle(entry.title);
      setContent(entry.content);
      setCreatedDate(entry.createdDate);
      setAnsweredDate(entry.answeredDate);
      setIsAnswered(entry.isAnswered);
      setAnswerText(entry.answerText || "");
    }
  }, [entry]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("Please fill in both title and content");
      return;
    }

    const entryData = {
      ...(isEditing && entry ? { id: entry.id } : {}),
      title: title.trim(),
      content: content.trim(),
      createdDate,
      answeredDate,
      isAnswered,
      answerText: answerText.trim(),
    };

    onSubmit(entryData);

    if (!isEditing) {
      setTitle("");
      setContent("");
      setCreatedDate(new Date().toISOString().split("T")[0]);
      setAnsweredDate("");
      setIsAnswered(false);
      setAnswerText("");
    }
  };

  return (
    <div className="entry-form-container">
      <h2>{isEditing ? "Edit Prayer Entry" : "New Prayer Entry"}</h2>
      <form onSubmit={handleSubmit} className="entry-form">
        <div className="form-group">
          <label htmlFor="title">Prayer Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter prayer title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Prayer Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Describe your prayer..."
            rows={4}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="createdDate">Date Created</label>
            <input
              id="createdDate"
              type="date"
              value={createdDate}
              onChange={(e) => setCreatedDate(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="isAnswered">
              <input
                id="isAnswered"
                type="checkbox"
                checked={isAnswered}
                onChange={(e) => setIsAnswered(e.target.checked)}
              />
              Prayer Answered
            </label>
          </div>
        </div>

        {isAnswered && (
          <>
            <div className="form-group">
              <label htmlFor="answeredDate">Date Answered</label>
              <input
                id="answeredDate"
                type="date"
                value={answeredDate}
                onChange={(e) => setAnsweredDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="answerText">How Was It Answered?</label>
              <textarea
                id="answerText"
                value={answerText}
                onChange={(e) => setAnswerText(e.target.value)}
                placeholder="Describe how your prayer was answered..."
                rows={3}
              />
            </div>
          </>
        )}

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {isEditing ? "Update Entry" : "Add Entry"}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
