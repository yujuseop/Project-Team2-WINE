import { useRouter } from 'next/router';
import styles from '@/styles/index.module.css';

export default function Home() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Wine Explorer</h1>
        <button onClick={() => router.push('/wines')}>Browse Wines</button>
      </header>
      <main className={styles.main}>
        <h2>Welcome to Wine Explorer</h2>
        <p>Find and review your favorite wines.</p>
      </main>
    </div>
  );
}
