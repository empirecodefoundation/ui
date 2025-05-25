'use client';

import { MySmartTable } from '../components/SmartDataTable/MySmartTable';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto py-8 px-4">
        <MySmartTable />
      </div>
    </main>
  );
} 