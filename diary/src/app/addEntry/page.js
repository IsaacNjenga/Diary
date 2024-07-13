"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../css/addEntry.module.css";
import { format } from "date-fns";

function AddEntry() {
  const [currentDateTime, setCurrentDateTime] = useState(null);
  const [values, setValues] = useState({ title: "", entry: "" });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setCurrentDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting with values:", values);
    try {
      await axios.post("/api/entries", {
        title: values.title,
        entry: values.entry,
        timestamp: new Date().toISOString(),
      });
      console.log(values);
      alert("Entry saved successfully!");
      setValues({ title: "", entry: "" });
    } catch (error) {
      console.log("Failed to save entry", error);
      alert("Failed to save entry");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Add Entry</h1>
      <p className={styles.p}>
        {mounted
          ? currentDateTime
            ? format(new Date(currentDateTime), "EEEE, MMMM do, yyyy")
            : "Loading..."
          : "Loading..."}
      </p>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label htmlFor="title" className={styles.label}>Title</label>
          <input
            type="text"
            placeholder="Give it a title?"
            name="title"
            value={values.title}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div>
          <label htmlFor="entry" className={styles.label}>Entry</label>
          <textarea
            type="text"
            placeholder="Write your entry here..."
            name="entry"
            value={values.entry}
            onChange={handleChange}
            required
            className={styles.textarea}
          />
        </div>
        <button type="submit" className={styles.button}>Save</button>
      </form>
    </div>
  );
}

export default AddEntry;
