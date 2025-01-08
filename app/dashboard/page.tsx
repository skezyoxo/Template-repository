'use client';

import { useAuth } from '@/hooks/use-auth';

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold">Welcome, {user?.name}!</h1>
      <p className="mt-2 text-muted-foreground">This is your personal dashboard.</p>
    </div>
  );
}
