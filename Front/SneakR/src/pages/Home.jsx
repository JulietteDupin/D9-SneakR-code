// pages/home.js
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('authenticated');
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, []);

  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome to the Home page!</p>
    </div>
  );
}
