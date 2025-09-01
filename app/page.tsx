"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to /waitlist
    router.push('/waitlist');
  }, [router]);

  return (
    <div className="min-h-screen bg-page-gradient flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold mb-4">Redirecting...</h1>
        <p className="text-gray-600">Taking you to the waitlist</p>
      </div>
    </div>
  );
}
