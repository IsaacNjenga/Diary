"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { format, parseISO } from "date-fns";
import styles from "../css/viewEntry.module.css";

function ViewEntry() {
  const [entries, setEntries] = useState([]);

  const fetchedEntries = async () => {
    try {
      const response = await axios.get("/api/entries");

      const sortedEntries = response.data.sort((a, b) => {
        return new Date(b.timestamp) - new Date(a.timestamp);
      });
      setEntries(sortedEntries);
    } catch (error) {
      console.log("Failed to fetch", error);
      alert("Failed to fetch");
    }
  };

  useEffect(() => {
    fetchedEntries();
  }, []);

  const groupEntriesByDate = (entries, timeKey) => {
    return entries.reduce((acc, entry) => {
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
      <h1 className={styles.h1}>Entries</h1>
      <p className={styles.p}>Your recent entries</p>
      <br />
      <hr />
      <br />
      <ul className={styles.ul}>
        {sortedEntryDates.map((date) => (
          <li key={date} className={styles.li}>
            <h3>
              <u>{format(new Date(date), "EEEE, MMMM do, yyyy")}</u>
            </h3>
            {groupedEntries[date].map((entry, index) => (
              <div key={index}>
                <h4>
                  <u>{entry.title}</u>
                </h4>
                <p>{entry.entry}</p>
                <br />
                <p>
                  ********************************************************************************************
                </p>
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewEntry;
