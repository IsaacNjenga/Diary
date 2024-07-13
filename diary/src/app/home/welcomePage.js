import React from "react";
import Link from "next/link";
import styles from "../css/welcomePage.module.css";

function WelcomePage() {
  return (
    <div className={styles.container}>
      <div className={styles.welcomeContent}>
        <h1 className={styles.title}>Welcome to PenIt!</h1>
        <p className={styles.subtitle}>Journal your thoughts away...</p>
        <p className={styles.getStarted}>
          Click{" "}
          <Link href="/addEntry">
            <u>here</u>
          </Link>{" "}
          to get started
        </p>
      </div>
    </div>
  );
}

export default WelcomePage;
