'use client';

import CustomerTable from './Table';
import Sidebar from './Sidebar';

export default function SpecialtyList() {
  return (
    <div className="flex min-h-screen bg-gray-300 p-6">
      <Sidebar />
      <div className="ml-6 flex-1">
        <CustomerTable />
      </div>
    </div>
  );
}
