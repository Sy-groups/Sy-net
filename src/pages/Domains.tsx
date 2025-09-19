import React from 'react';
import { Navbar } from '@/components/Navbar';
export default function Domains() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-3xl font-bold mb-4">Domains</h1>
        <p className="text-muted-foreground">This is a placeholder page for Domains.</p>
      </div>
    </div>
  );
}
