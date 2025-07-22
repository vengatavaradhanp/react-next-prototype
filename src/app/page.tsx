import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import styles from "./page.module.css";

// Dynamically import the Assessments component
const Assessments = dynamic(() => import('./assessment/page'), {
  loading: () => <p>Loading...</p>
});

export default function Home() {
  return (
    <div>
      <main className={styles.main}>
        <Suspense fallback={<p>Loading...</p>}>
          <Assessments />
        </Suspense>
      </main>
      {/* <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} Medical Assessment App</p>
      </footer> */}
    </div>
  );
}