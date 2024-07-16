import React, { useState, useEffect } from "react";
import styles from "../app/css/editModal.module.css";

function EditModal({ isOpen, onClose, entry, onSave }) {
  const [editedEntry, setEditedEntry] = useState({ title: entry.title, entry: entry.entry });

  useEffect(() => {
    setEditedEntry({ title: entry.title, entry: entry.entry });
  }, [entry]);

  const handleChange = (e) => {
    setEditedEntry({ ...editedEntry, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedEntry);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <span className={styles.close} onClick={onClose}>&times;</span>
        <h2 className={styles.h2}>Edit Entry</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label} htmlFor="title">Title:</label>
          <input
            className={styles.input}
            type="text"
            id="title"
            name="title"
            value={editedEntry.title}
            onChange={handleChange}
          />
          <label className={styles.label} htmlFor="entry">Entry:</label>
          <textarea
            className={styles.textarea}
            id="entry"
            name="entry"
            value={editedEntry.entry}
            onChange={handleChange}
          />
          <button className={styles.button} type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
}

export default EditModal;
