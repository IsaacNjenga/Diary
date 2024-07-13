import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import styles from "../app/css/Nav.module.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MyDiary",
  description: "Group 5",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div>
          <nav className={styles.nav}>
            <ul className={styles.navList}>
              <li className={styles.navItem}>
                <Link href="/" className={styles.navLink}>Home</Link>
              </li>|
              <li className={styles.navItem}>
                <Link href="/addEntry" className={styles.navLink}>Add an Entry</Link>
              </li>|
              <li className={styles.navItem}>
                <Link href="/deleteEntry" className={styles.navLink}>Delete an Entry</Link>
              </li>|
              <li className={styles.navItem}>
                <Link href="/editEntry" className={styles.navLink}>Edit an Entry</Link>
              </li>|
              <li className={styles.navItem}>
                <Link href="/viewEntry" className={styles.navLink}>View your Entries</Link>
              </li>
            </ul>
          </nav>
        </div>
        {children}
        <footer className={styles.footer}>
          <p>
            &copy; {new Date().getFullYear()} Group 5's Website. All Rights
            Reserved
          </p>
        </footer>
      </body>
    </html>
  );
}
