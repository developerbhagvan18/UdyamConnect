'use client';

import React, { Suspense, useState } from 'react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Suspense fallback={<div className="w-64 bg-slate-900 flex-shrink-0" />}>
        <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </Suspense>
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Suspense fallback={<div className="h-16 bg-white border-b border-slate-200" />}>
          <AdminHeader onMenuClick={() => setSidebarOpen(true)} />
        </Suspense>
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

