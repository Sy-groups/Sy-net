import { Navbar } from '@/components/Navbar';
import React from 'react';

export default function Pricing() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-3xl font-bold mb-4">Pricing</h1>
        <p className="text-muted-foreground">This is a placeholder page for Pricing.</p>
      </div>
    </div>
  );
}
