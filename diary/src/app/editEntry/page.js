"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { format, parseISO } from "date-fns";
import styles from "../css/editEntry.module.css";
import EditModal from "../EditModal";

function EditEntry() {
  const [entries, setEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState(null);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const response = await axios.get("/api/entries");

      const sortedEntries = response.data.sort((a, b) => {
        return new Date(b.timestamp) - new Date(a.timestamp);
      });
      setEntries(sortedEntries);
    } catch (error) {
      console.error("Failed to fetch entries", error);
    }
  };

  const handleEdit = (entry) => {
    setSelectedEntry(entry);
  };

  const handleCloseModal = () => {
    setSelectedEntry(null);
  };

  const handleSave = async (editedEntry) => {
    try {
      await axios.put(`/api/entries`, { ...editedEntry, id: selectedEntry.id });
      fetchEntries(); // Refresh the list of entries
      setSelectedEntry(null);
    } catch (error) {
      console.error("Failed to update entry", error);
    }
  };

  const groupEntriesByDate = (entries, timeKey) => {
    return entries.reduce((acc, entry) => {
      if (!entry[timeKey]) {
        console.warn(`Missing ${timeKey} for entry with id: ${entry.id}`);
        return acc;
      }

      const date = format(parseISO(entry[timeKey]), "yyyy-MM-dd");
      acc[date] = acc[date] || [];
      acc[date].push(entry);
      return acc;
    }, {});
  };

  const groupedEntries = groupEntriesByDate(entries, "timestamp");

  const sortedEntryDates = Object.keys(groupedEntries).sort(
    (a, b) => new Date(b) - new Date(a)
  );

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Edit An Entry</h1>
      <hr />
      <br />
      {sortedEntryDates.length === 0 ? (
        <p className={styles.p}>No entries found.</p>
      ) : (
        <ul className={styles.ul}>
          {sortedEntryDates.map((date) => (
            <li key={date} className={styles.li}>
              <h3 className={styles.h3}>
                <u>{format(new Date(date), "EEEE, MMMM do, yyyy")}</u>
              </h3>
              {groupedEntries[date].map((entry) => (
                <div key={entry.id}>
                  <h4 className={styles.h4}>
                    <u>{entry.title}</u>
                  </h4>
                  <p className={styles.p}>{entry.entry}</p>

                  <button
                    onClick={() => handleEdit(entry)}
                    className={styles.button}
                  >
                    Edit
                  </button>
                  <br />
                  <p>
                    ********************************************************************************************
                  </p>
                </div>
              ))}
            </li>
          ))}
        </ul>
      )}

      {selectedEntry && (
        <EditModal
          isOpen={true}
          onClose={handleCloseModal}
          entry={selectedEntry}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

export default EditEntry;
